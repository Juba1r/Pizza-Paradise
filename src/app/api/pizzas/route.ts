import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const search = searchParams.get("search");
    const available = searchParams.get("available");

    const where: Record<string, unknown> = {};

    if (category && category !== "ALL") {
      where.category = category;
    }
    if (featured === "true") {
      where.featured = true;
    }
    if (available !== "false") {
      where.available = true;
    }
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
      ];
    }

    const pizzas = await prisma.pizza.findMany({
      where,
      orderBy: [{ featured: "desc" }, { rating: "desc" }],
    });

    return NextResponse.json({ pizzas, total: pizzas.length });
  } catch (error) {
    console.error("Error fetching pizzas:", error);
    return NextResponse.json(
      { error: "Failed to fetch pizzas" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      description,
      price,
      category,
      imageUrl,
      available,
      featured,
      toppings,
      tags,
      spiceLevel,
      prepTime,
    } = body;

    const pizza = await prisma.pizza.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        category,
        imageUrl: imageUrl || "/images/pizzas/default.jpg",
        available: available ?? true,
        featured: featured ?? false,
        toppings: JSON.stringify(toppings || []),
        tags: JSON.stringify(tags || []),
        spiceLevel: spiceLevel || 1,
        prepTime: prepTime || 15,
      },
    });

    return NextResponse.json({ pizza }, { status: 201 });
  } catch (error) {
    console.error("Error creating pizza:", error);
    return NextResponse.json(
      { error: "Failed to create pizza" },
      { status: 500 },
    );
  }
}
