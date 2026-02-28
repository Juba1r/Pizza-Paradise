import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [
      totalOrders,
      totalRevenue,
      pendingOrders,
      totalPizzas,
      todayOrders,
      recentOrders,
    ] = await Promise.all([
      prisma.order.count(),
      prisma.order.aggregate({
        _sum: { total: true },
        where: { status: { not: "CANCELLED" } },
      }),
      prisma.order.count({
        where: {
          status: { in: ["PENDING", "CONFIRMED", "PREPARING", "READY"] },
        },
      }),
      prisma.pizza.count({ where: { available: true } }),
      prisma.order.count({
        where: {
          createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) },
        },
      }),
      prisma.order.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
        include: {
          items: { include: { pizza: true } },
          user: { select: { name: true, email: true } },
        },
      }),
    ]);

    // Revenue by day (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const revenueByDay = await prisma.order.findMany({
      where: {
        createdAt: { gte: sevenDaysAgo },
        status: { not: "CANCELLED" },
      },
      select: { createdAt: true, total: true },
    });

    return NextResponse.json({
      stats: {
        totalOrders,
        totalRevenue: totalRevenue._sum.total || 0,
        pendingOrders,
        totalPizzas,
        todayOrders,
      },
      recentOrders,
      revenueByDay,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 },
    );
  }
}
