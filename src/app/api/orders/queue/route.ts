import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const activeStatuses: (
      | "PENDING"
      | "CONFIRMED"
      | "PREPARING"
      | "READY"
      | "OUT_FOR_DELIVERY"
    )[] = ["PENDING", "CONFIRMED", "PREPARING", "READY", "OUT_FOR_DELIVERY"];

    const orders = await prisma.order.findMany({
      where: { status: { in: activeStatuses } },
      include: {
        items: { include: { pizza: true } },
        user: { select: { name: true, email: true, phone: true } },
      },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json({ orders, count: orders.length });
  } catch (error) {
    console.error("Error fetching order queue:", error);
    return NextResponse.json(
      { error: "Failed to fetch queue" },
      { status: 500 },
    );
  }
}
