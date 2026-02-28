import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const pizza = await prisma.pizza.findUnique({ where: { id } });
    if (!pizza) {
      return NextResponse.json({ error: "Pizza not found" }, { status: 404 });
    }
    return NextResponse.json({ pizza });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch pizza" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const pizza = await prisma.pizza.update({
      where: { id },
      data: {
        ...body,
        toppings: body.toppings ? JSON.stringify(body.toppings) : undefined,
        tags: body.tags ? JSON.stringify(body.tags) : undefined,
        price: body.price ? parseFloat(body.price) : undefined,
      },
    });
    return NextResponse.json({ pizza });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update pizza" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await prisma.pizza.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete pizza" },
      { status: 500 },
    );
  }
}
