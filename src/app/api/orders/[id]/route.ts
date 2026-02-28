import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        items: { include: { pizza: true } },
        payment: true,
        user: { select: { name: true, email: true } },
        address: true,
      },
    });
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    return NextResponse.json({ order });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch order" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, estimatedTime } = body;

    const order = await prisma.order.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(estimatedTime && { estimatedTime }),
      },
      include: {
        items: { include: { pizza: true } },
        payment: true,
      },
    });
    return NextResponse.json({ order });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 },
    );
  }
}
