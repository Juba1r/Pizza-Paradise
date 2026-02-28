import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get("category");
  const featured = searchParams.get("featured");
  const search = searchParams.get("search");
  const available = searchParams.get("available");

  try {
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
        id: "bbq-inferno",
        name: "BBQ Inferno",
        description:
          "Smoky BBQ sauce base loaded with pulled chicken, caramelized onions, jalapeños, and smoked cheddar. Pure fire on every bite.",
        price: 16.99,
        category: "NON_VEG",
        imageUrl: "/images/pizzas/bbq-inferno.jpg",
        featured: true,
        rating: 4.9,
        toppings: JSON.stringify(["Pulled Chicken", "BBQ Sauce", "Jalapeños"]),
        tags: JSON.stringify(["spicy", "bestseller"]),
      },
      {
        id: "truffle-mushroom",
        name: "Truffle Mushroom",
        description:
          "Black truffle oil base with wild mushroom medley, fontina cheese, fresh thyme, and toasted pine nuts. Luxury in every slice.",
        price: 19.99,
        category: "SPECIALTY",
        imageUrl: "/images/pizzas/truffle-mushroom.jpg",
        featured: true,
        rating: 4.7,
        toppings: JSON.stringify(["Wild Mushrooms", "Truffle Oil", "Fontina"]),
        tags: JSON.stringify(["premium", "specialty"]),
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
        tags: JSON.stringify(["classic", "bestseller"]),
      },
      {
        id: "garden-veggie-fiesta",
        name: "Garden Veggie Fiesta",
        description:
          "Colorful medley of roasted bell peppers, zucchini, sun-dried tomatoes, olives, and feta cheese on herb-infused tomato base.",
        price: 13.99,
        category: "VEGETARIAN",
        imageUrl: "/images/pizzas/veggie-fiesta.jpg",
        featured: false,
        rating: 4.6,
        toppings: JSON.stringify(["Bell Peppers", "Zucchini", "Feta"]),
        tags: JSON.stringify(["vegetarian", "healthy"]),
      },
      {
        id: "meat-lovers-feast",
        name: "Meat Lovers Feast",
        description:
          "The ultimate carnivore pizza loaded with pepperoni, Italian sausage, grilled chicken, crispy bacon, and ground beef.",
        price: 18.99,
        category: "NON_VEG",
        imageUrl: "/images/pizzas/meat-lovers.jpg",
        featured: false,
        rating: 4.8,
        toppings: JSON.stringify(["Pepperoni", "Sausage", "Bacon"]),
        tags: JSON.stringify(["meat", "hearty"]),
      },
      {
        id: "spicy-thai-chicken",
        name: "Spicy Thai Chicken",
        description:
          "Thai peanut sauce base with grilled chicken, crunchy bean sprouts, scallions, carrots, and cilantro with a spicy kick.",
        price: 17.99,
        category: "SPECIALTY",
        imageUrl: "/images/pizzas/thai-chicken.jpg",
        featured: false,
        rating: 4.7,
        toppings: JSON.stringify(["Peanut Sauce", "Chicken", "Cilantro"]),
        tags: JSON.stringify(["fusion", "spicy"]),
      },
      {
        id: "vegan-paradise",
        name: "Vegan Paradise",
        description:
          "Cashew cream base with roasted chickpeas, kale, roasted tomatoes, hemp seeds, and nutritional yeast. 100% plant-based bliss.",
        price: 14.99,
        category: "VEGAN",
        imageUrl: "/images/pizzas/vegan-paradise.jpg",
        featured: false,
        rating: 4.5,
        toppings: JSON.stringify(["Cashew Cream", "Kale", "Chickpeas"]),
        tags: JSON.stringify(["vegan", "healthy"]),
      },
      {
        id: "buffalo-ranch-chicken",
        name: "Buffalo Ranch Chicken",
        description:
          "Tangy buffalo sauce with grilled chicken, cool ranch drizzle, celery, blue cheese crumbles, and mozzarella.",
        price: 16.49,
        category: "NON_VEG",
        imageUrl: "/images/pizzas/buffalo-ranch.jpg",
        featured: false,
        rating: 4.8,
        toppings: JSON.stringify(["Buffalo Sauce", "Chicken", "Ranch"]),
        tags: JSON.stringify(["spicy", "chicken"]),
      },
      {
        id: "mediterranean-dream",
        name: "Mediterranean Dream",
        description:
          "Hummus base with grilled lamb, kalamata olives, roasted red peppers, tzatziki drizzle, and crumbled feta cheese.",
        price: 17.49,
        category: "SPECIALTY",
        imageUrl: "/images/pizzas/mediterranean.jpg",
        featured: false,
        rating: 4.6,
        toppings: JSON.stringify(["Hummus", "Lamb", "Olives"]),
        tags: JSON.stringify(["fusion", "specialty"]),
      },
      {
        id: "hawaiian-sunset",
        name: "Hawaiian Sunset",
        description:
          "Sweet pineapple chunks with premium ham, mozzarella, and a honey-glazed crust that delivers tropical vibes in every bite.",
        price: 14.49,
        category: "NON_VEG",
        imageUrl: "/images/pizzas/hawaiian.jpg",
        featured: false,
        rating: 4.4,
        toppings: JSON.stringify(["Pineapple", "Ham", "Honey Glaze"]),
        tags: JSON.stringify(["sweet", "classic"]),
      },
      {
        id: "quattro-formaggi",
        name: "Quattro Formaggi",
        description:
          "Four-cheese symphony — mozzarella, gorgonzola, parmesan, and ricotta — melted to golden perfection on a thin crispy crust.",
        price: 15.49,
        category: "VEGETARIAN",
        imageUrl: "/images/pizzas/quattro-formaggi.jpg",
        featured: true,
        rating: 4.9,
        toppings: JSON.stringify(["Mozzarella", "Gorgonzola", "Parmesan"]),
        tags: JSON.stringify(["cheese", "vegetarian"]),
      },
    ];

    // Apply filtering to mock data for a realistic experience
    let filteredPizzas = [...mockPizzas];

    if (category && category !== "ALL") {
      filteredPizzas = filteredPizzas.filter((p) => p.category === category);
    }
    if (featured === "true") {
      filteredPizzas = filteredPizzas.filter((p) => p.featured === true);
    }
    if (search) {
      const s = search.toLowerCase();
      filteredPizzas = filteredPizzas.filter(
        (p) =>
          p.name.toLowerCase().includes(s) ||
          p.description.toLowerCase().includes(s),
      );
    }

    // Default sort: featured first, then rating
    filteredPizzas.sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return b.rating - a.rating;
    });

    return NextResponse.json(
      {
        pizzas: filteredPizzas,
        total: filteredPizzas.length,
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
