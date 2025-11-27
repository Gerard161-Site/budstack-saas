
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/db';
import { authOptions } from '@/lib/auth';
import { getTenantFromRequest } from '@/lib/tenant';
import { sendEmail, emailTemplates } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const tenant = await getTenantFromRequest(req);

    if (!tenant) {
      return NextResponse.json(
        { error: 'Tenant not found' },
        { status: 404 }
      );
    }

    const body = await req.json();
    const { items, shippingInfo, total } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      );
    }

    // Calculate subtotal and shipping
    const subtotal = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
    const shippingCost = 5.00;
    const calculatedTotal = subtotal + shippingCost;

    // Create order with items
    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        tenantId: tenant.id,
        subtotal,
        shippingCost,
        total: calculatedTotal,
        status: 'PENDING',
        shippingInfo,
        notes: shippingInfo.notes,
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            productName: item.name || `Product ${item.productId}`,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    // Send order confirmation email
    sendEmail({
      to: session.user.email || '',
      subject: `Order Confirmation - #${order.orderNumber}`,
      html: emailTemplates.orderConfirmation(
        session.user.name || 'Customer',
        order.orderNumber,
        calculatedTotal.toFixed(2),
        items.map((item: any) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price.toFixed(2),
        })),
        tenant.businessName
      ),
    }).catch((error) => {
      console.error('Failed to send order confirmation email:', error);
    });

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        total: order.total,
        status: order.status,
      },
    });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const tenant = await getTenantFromRequest(req);

    if (!tenant) {
      return NextResponse.json(
        { error: 'Tenant not found' },
        { status: 404 }
      );
    }

    // Get orders for the current user
    const orders = await prisma.order.findMany({
      where: {
        userId: session.user.id,
        tenantId: tenant.id,
      },
      include: {
        items: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ orders });
  } catch (error) {
    console.error('Orders fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
