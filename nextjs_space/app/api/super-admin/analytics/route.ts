
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { subDays, startOfDay, format, eachDayOfInterval } from 'date-fns';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id || session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get time range from query params
    const searchParams = req.nextUrl.searchParams;
    const timeRangeParam = searchParams.get('timeRange') || '30d';
    const days = timeRangeParam === '7d' ? 7 : timeRangeParam === '90d' ? 90 : 30;
    const startDate = startOfDay(subDays(new Date(), days));

    // Get all-time totals
    const totalTenants = await prisma.tenant.count();
    const activeTenants = await prisma.tenant.count({ where: { isActive: true } });
    const totalUsers = await prisma.user.count();
    const totalProducts = await prisma.product.count();
    const totalOrders = await prisma.order.count();

    // Get total revenue
    const totalRevenueResult = await prisma.order.aggregate({
      _sum: { total: true },
    });
    const totalRevenue = totalRevenueResult._sum.total || 0;

    // Get recent stats
    const recentTenants = await prisma.tenant.count({
      where: { createdAt: { gte: startDate } },
    });
    const recentUsers = await prisma.user.count({
      where: { createdAt: { gte: startDate } },
    });
    const recentOrders = await prisma.order.count({
      where: { createdAt: { gte: startDate } },
    });

    // Get recent revenue
    const recentRevenueResult = await prisma.order.aggregate({
      where: { createdAt: { gte: startDate } },
      _sum: { total: true },
    });
    const recentRevenue = recentRevenueResult._sum.total || 0;

    // Get top tenants by revenue and orders
    const topTenants = await prisma.tenant.findMany({
      take: 5,
      include: {
        _count: {
          select: { orders: true },
        },
        orders: {
          select: {
            total: true,
          },
        },
      },
    });

    // Calculate total revenue per tenant and sort
    const topTenantsWithRevenue = topTenants
      .map(tenant => ({
        ...tenant,
        _sum: {
          total: tenant.orders.reduce((sum, order) => sum + order.total, 0),
        },
      }))
      .sort((a, b) => (b._sum?.total || 0) - (a._sum?.total || 0));

    // Get revenue by day
    const dateRange = eachDayOfInterval({ start: startDate, end: new Date() });
    const revenueByDayData = await Promise.all(
      dateRange.map(async (date) => {
        const dayStart = startOfDay(date);
        const dayEnd = startOfDay(subDays(date, -1));
        
        const result = await prisma.order.aggregate({
          where: {
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

    // Get revenue by tenant for pie chart
    const tenantsWithRevenue = await prisma.tenant.findMany({
      include: {
        orders: {
          select: {
            total: true,
          },
        },
      },
    });

    const revenueByTenant = tenantsWithRevenue
      .map(tenant => ({
        name: tenant.businessName,
        value: tenant.orders.reduce((sum, order) => sum + order.total, 0),
      }))
      .filter(item => item.value > 0)
      .sort((a, b) => b.value - a.value)
      .slice(0, 6); // Top 6 for better visualization

    // Get customer growth by day
    const customerGrowthData = await Promise.all(
      dateRange.map(async (date) => {
        const dayStart = startOfDay(date);
        const dayEnd = startOfDay(subDays(date, -1));
        
        const count = await prisma.user.count({
          where: {
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

    return NextResponse.json({
      totalTenants,
      activeTenants,
      totalUsers,
      totalProducts,
      totalOrders,
      recentTenants,
      recentUsers,
      recentOrders,
      totalRevenue,
      recentRevenue,
      topTenants: topTenantsWithRevenue,
      revenueByDay: revenueByDayData,
      ordersByDay: ordersByDayData,
      revenueByTenant,
      customerGrowth: customerGrowthData,
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
