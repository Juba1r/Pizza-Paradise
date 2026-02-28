import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userId,
      guestEmail,
      guestName,
      guestPhone,
      items,
      deliveryAddress,
      notes,
    } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items in order" }, { status: 400 });
    }

    // Calculate totals
    const subtotal = items.reduce(
      (sum: number, item: { price: number; quantity: number }) =>
        sum + item.price * item.quantity,
      0,
    );
    const deliveryFee = 3.99;
    const tax = subtotal * 0.08;
    const total = subtotal + deliveryFee + tax;

    const order = await prisma.order.create({
      data: {
        userId: userId || null,
        guestEmail: guestEmail || null,
        guestName: guestName || null,
        guestPhone: guestPhone || null,
        deliveryAddress: deliveryAddress
          ? JSON.stringify(deliveryAddress)
          : null,
        notes: notes || null,
        subtotal,
        deliveryFee,
        tax,
        total,
        status: "PENDING",
        items: {
          create: items.map(
            (item: {
              pizzaId: string;
              quantity: number;
              price: number;
              size: string;
              toppings?: string[];
            }) => ({
              pizzaId: item.pizzaId,
              quantity: item.quantity,
              price: item.price,
              size: item.size || "MEDIUM",
              toppings: item.toppings ? JSON.stringify(item.toppings) : null,
            }),
          ),
        },
        payment: {
          create: {
            amount: total,
            status: "PENDING",
          },
        },
      },
      include: {
        items: { include: { pizza: true } },
        payment: true,
      },
    });

    return NextResponse.json({ order }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating order:", error);
    // Fallback for Vercel demo if DB is not connected
    const mockOrder = {
      id: "mock-order-" + Math.random().toString(36).substr(2, 9),
      status: "PENDING",
      total: 25.0,
      createdAt: new Date().toISOString(),
      items: [],
      warning: "Order simulated in offline mode (DB connection failed)",
      details: error.message,
    };
    return NextResponse.json({ order: mockOrder }, { status: 201 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");
    const status = searchParams.get("status");
    const limit = parseInt(searchParams.get("limit") || "20");
    const page = parseInt(searchParams.get("page") || "1");

    const where: Record<string, unknown> = {};
    if (userId) where.userId = userId;
    if (status) where.status = status;

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          items: { include: { pizza: true } },
          payment: true,
        },
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: (page - 1) * limit,
      }),
      prisma.order.count({ where }),
    ]);

    return NextResponse.json({
      orders,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error: any) {
    console.error("Error fetching orders:", error);
    // Return empty list instead of 500 for better Vercel demo stability
    return NextResponse.json(
      {
        orders: [],
        total: 0,
        page: 1,
        totalPages: 0,
        warning: "Running in offline mode (DB connection failed)",
        details: error.message,
      },
      { status: 200 },
    );
  }
}
