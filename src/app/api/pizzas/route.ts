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
  } catch (error: any) {
    console.error("Error fetching pizzas:", error);
    // Fallback for Vercel demo if DB is not connected
    const mockPizzas = [
      {
        id: "margherita-supreme",
        name: "Margherita Supreme",
        description:
          "Classic tomato base with fresh mozzarella, basil leaves, and a drizzle of extra virgin olive oil. A timeless Italian masterpiece.",
        price: 12.99,
        category: "VEGETARIAN",
        imageUrl: "/images/pizzas/margherita.jpg",
        featured: true,
        rating: 4.8,
        toppings: JSON.stringify(["Mozzarella", "Tomato", "Basil"]),
        tags: JSON.stringify(["classic", "vegetarian"]),
      },
      {
        id: "pepperoni-blaze",
        name: "Pepperoni Blaze",
        description:
          "Double-stacked premium pepperoni with rich tomato sauce, mozzarella, and a secret herb blend baked to crispy perfection.",
        price: 15.99,
        category: "NON_VEG",
        imageUrl: "/images/pizzas/pepperoni.jpg",
        featured: true,
        rating: 4.9,
        toppings: JSON.stringify(["Double Pepperoni", "Mozzarella"]),
        tags: JSON.stringify(["classic", "popular"]),
      },
    ];
    return NextResponse.json(
      {
        pizzas: mockPizzas,
        total: mockPizzas.length,
        warning: "Running on mock data (DB connection failed)",
        details: error.message,
      },
      { status: 200 }, // Return 200 so the UI doesn't break
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
  } catch (error: any) {
    console.error("Error creating pizza:", error);
    return NextResponse.json(
      { error: "Failed to create pizza", details: error.message },
      { status: 500 },
    );
  }
}
