
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { subDays, startOfDay, format, eachDayOfInterval } from 'date-fns';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user's tenant
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { tenant: true },
    });

    if (!user?.tenantId || user.role !== 'TENANT_ADMIN') {
      return NextResponse.json({ error: 'Not a tenant admin' }, { status: 403 });
    }

    const tenantId = user.tenantId;

    // Get time range from query params
    const searchParams = req.nextUrl.searchParams;
    const timeRangeParam = searchParams.get('timeRange') || '30d';
    const days = timeRangeParam === '7d' ? 7 : timeRangeParam === '90d' ? 90 : 30;
    const startDate = startOfDay(subDays(new Date(), days));

    // Get all-time totals for this tenant
    const totalProducts = await prisma.product.count({
      where: { tenantId },
    });

    const totalOrders = await prisma.order.count({
      where: { tenantId },
    });

    const totalCustomers = await prisma.user.count({
      where: { tenantId, role: 'PATIENT' },
    });

    // Get total revenue
    const totalRevenueResult = await prisma.order.aggregate({
      where: { tenantId },
      _sum: { total: true },
    });
    const totalRevenue = totalRevenueResult._sum.total || 0;

    // Get recent stats
    const recentOrders = await prisma.order.count({
      where: {
        tenantId,
        createdAt: { gte: startDate },
      },
    });

    const recentCustomers = await prisma.user.count({
      where: {
        tenantId,
        role: 'PATIENT',
        createdAt: { gte: startDate },
      },
    });

    // Get recent revenue
    const recentRevenueResult = await prisma.order.aggregate({
      where: {
        tenantId,
        createdAt: { gte: startDate },
      },
      _sum: { total: true },
    });
    const recentRevenue = recentRevenueResult._sum.total || 0;

    // Get average order value
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // Get revenue by day
    const dateRange = eachDayOfInterval({ start: startDate, end: new Date() });
    const revenueByDayData = await Promise.all(
      dateRange.map(async (date) => {
        const dayStart = startOfDay(date);
        const dayEnd = startOfDay(subDays(date, -1));

        const result = await prisma.order.aggregate({
          where: {
            tenantId,
            createdAt: {
              gte: dayStart,
              lt: dayEnd,
            },
          },
          _sum: { total: true },
        });

        return {
          date: format(date, 'MMM dd'),
          revenue: result._sum.total || 0,
        };
      })
    );

    // Get orders by day
    const ordersByDayData = await Promise.all(
      dateRange.map(async (date) => {
        const dayStart = startOfDay(date);
        const dayEnd = startOfDay(subDays(date, -1));

        const count = await prisma.order.count({
          where: {
            tenantId,
            createdAt: {
              gte: dayStart,
              lt: dayEnd,
            },
          },
        });

        return {
          date: format(date, 'MMM dd'),
          orders: count,
        };
      })
    );

    // Get top selling products
    const topProducts = await prisma.orderItem.groupBy({
      by: ['productId'],
      where: {
        order: {
          tenantId,
          createdAt: { gte: startDate },
        },
      },
      _sum: {
        quantity: true,
        price: true,
      },
      _count: {
        id: true,
      },
      orderBy: {
        _sum: {
          quantity: 'desc',
        },
      },
      take: 5,
    });

    // Get product details for top products
    const topProductsWithDetails = await Promise.all(
      topProducts.map(async (item) => {
        const product = await prisma.product.findUnique({
          where: { id: item.productId },
        });
        return {
          id: product?.id,
          name: product?.name || 'Unknown Product',
          quantity: item._sum.quantity || 0,
          revenue: item._sum.price || 0,
          orders: item._count.id,
        };
      })
    );

    // Get customer growth by day
    const customerGrowthData = await Promise.all(
      dateRange.map(async (date) => {
        const dayStart = startOfDay(date);
        const dayEnd = startOfDay(subDays(date, -1));

        const count = await prisma.user.count({
          where: {
            tenantId,
            role: 'PATIENT',
            createdAt: {
              gte: dayStart,
              lt: dayEnd,
            },
          },
        });

        return {
          date: format(date, 'MMM dd'),
          customers: count,
        };
      })
    );

    // Get order status distribution
    const orderStatusData = await prisma.order.groupBy({
      by: ['status'],
      where: {
        tenantId,
        createdAt: { gte: startDate },
      },
      _count: {
        id: true,
      },
    });

    const ordersByStatus = orderStatusData.map((item) => ({
      name: item.status,
      value: item._count.id,
    }));

    return NextResponse.json({
      totalProducts,
      totalOrders,
      totalCustomers,
      totalRevenue,
      recentOrders,
      recentCustomers,
      recentRevenue,
      avgOrderValue,
      revenueByDay: revenueByDayData,
      ordersByDay: ordersByDayData,
      topProducts: topProductsWithDetails,
      customerGrowth: customerGrowthData,
      ordersByStatus,
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
