import { PrismaClient, Category } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const pizzas = [
  {
    name: "Margherita Supreme",
    description:
      "Classic tomato base with fresh mozzarella, basil leaves, and a drizzle of extra virgin olive oil. A timeless Italian masterpiece.",
    price: 12.99,
    category: Category.VEGETARIAN,
    imageUrl: "/images/pizzas/margherita.jpg",
    featured: true,
    rating: 4.8,
    reviewCount: 234,
    toppings: JSON.stringify([
      "Fresh Mozzarella",
      "Tomato Sauce",
      "Fresh Basil",
      "Olive Oil",
      "Cherry Tomatoes",
    ]),
    tags: JSON.stringify(["classic", "vegetarian", "popular"]),
    spiceLevel: 1,
    prepTime: 12,
  },
  {
    name: "BBQ Inferno",
    description:
      "Smoky BBQ sauce base loaded with pulled chicken, caramelized onions, jalapeños, and smoked cheddar. Pure fire on every bite.",
    price: 16.99,
    category: Category.NON_VEG,
    imageUrl: "/images/pizzas/bbq-inferno.jpg",
    featured: true,
    rating: 4.9,
    reviewCount: 412,
    toppings: JSON.stringify([
      "Pulled Chicken",
      "BBQ Sauce",
      "Caramelized Onions",
      "Jalapeños",
      "Smoked Cheddar",
      "Cilantro",
    ]),
    tags: JSON.stringify(["spicy", "bestseller", "chicken"]),
    spiceLevel: 4,
    prepTime: 18,
  },
  {
    name: "Truffle Mushroom",
    description:
      "Black truffle oil base with wild mushroom medley, fontina cheese, fresh thyme, and toasted pine nuts. Luxury in every slice.",
    price: 19.99,
    category: Category.SPECIALTY,
    imageUrl: "/images/pizzas/truffle-mushroom.jpg",
    featured: true,
    rating: 4.7,
    reviewCount: 189,
    toppings: JSON.stringify([
      "Wild Mushrooms",
      "Truffle Oil",
      "Fontina Cheese",
      "Fresh Thyme",
      "Pine Nuts",
      "Shaved Parmesan",
    ]),
    tags: JSON.stringify(["premium", "specialty", "vegetarian"]),
    spiceLevel: 1,
    prepTime: 20,
  },
  {
    name: "Pepperoni Blaze",
    description:
      "Double-stacked premium pepperoni with rich tomato sauce, mozzarella, and a secret herb blend baked to crispy perfection.",
    price: 15.99,
    category: Category.NON_VEG,
    imageUrl: "/images/pizzas/pepperoni.jpg",
    featured: true,
    rating: 4.9,
    reviewCount: 567,
    toppings: JSON.stringify([
      "Double Pepperoni",
      "Tomato Sauce",
      "Mozzarella",
      "Herb Blend",
      "Chili Flakes",
    ]),
    tags: JSON.stringify(["classic", "bestseller", "meat"]),
    spiceLevel: 2,
    prepTime: 14,
  },
  {
    name: "Garden Veggie Fiesta",
    description:
      "Colorful medley of roasted bell peppers, zucchini, sun-dried tomatoes, olives, and feta cheese on herb-infused tomato base.",
    price: 13.99,
    category: Category.VEGETARIAN,
    imageUrl: "/images/pizzas/veggie-fiesta.jpg",
    featured: false,
    rating: 4.6,
    reviewCount: 145,
    toppings: JSON.stringify([
      "Bell Peppers",
      "Zucchini",
      "Sun-dried Tomatoes",
      "Olives",
      "Feta Cheese",
      "Artichokes",
    ]),
    tags: JSON.stringify(["vegetarian", "healthy", "colorful"]),
    spiceLevel: 1,
    prepTime: 15,
  },
  {
    name: "Meat Lovers Feast",
    description:
      "The ultimate carnivore pizza loaded with pepperoni, Italian sausage, grilled chicken, crispy bacon, and ground beef.",
    price: 18.99,
    category: Category.NON_VEG,
    imageUrl: "/images/pizzas/meat-lovers.jpg",
    featured: false,
    rating: 4.8,
    reviewCount: 378,
    toppings: JSON.stringify([
      "Pepperoni",
      "Italian Sausage",
      "Grilled Chicken",
      "Crispy Bacon",
      "Ground Beef",
      "Mozzarella",
    ]),
    tags: JSON.stringify(["meat", "hearty", "bestseller"]),
    spiceLevel: 2,
    prepTime: 22,
  },
  {
    name: "Spicy Thai Chicken",
    description:
      "Thai peanut sauce base with grilled chicken, crunchy bean sprouts, scallions, carrots, and cilantro with a spicy kick.",
    price: 17.99,
    category: Category.SPECIALTY,
    imageUrl: "/images/pizzas/thai-chicken.jpg",
    featured: false,
    rating: 4.7,
    reviewCount: 201,
    toppings: JSON.stringify([
      "Thai Peanut Sauce",
      "Grilled Chicken",
      "Bean Sprouts",
      "Scallions",
      "Carrots",
      "Cilantro",
      "Chili",
    ]),
    tags: JSON.stringify(["fusion", "spicy", "chicken"]),
    spiceLevel: 3,
    prepTime: 16,
  },
  {
    name: "Vegan Paradise",
    description:
      "Cashew cream base with roasted chickpeas, kale, roasted tomatoes, hemp seeds, and nutritional yeast. 100% plant-based bliss.",
    price: 14.99,
    category: Category.VEGAN,
    imageUrl: "/images/pizzas/vegan-paradise.jpg",
    featured: false,
    rating: 4.5,
    reviewCount: 98,
    toppings: JSON.stringify([
      "Cashew Cream",
      "Roasted Chickpeas",
      "Kale",
      "Roasted Tomatoes",
      "Hemp Seeds",
      "Nutritional Yeast",
    ]),
    tags: JSON.stringify(["vegan", "healthy", "plant-based"]),
    spiceLevel: 1,
    prepTime: 17,
  },
  {
    name: "Buffalo Ranch Chicken",
    description:
      "Tangy buffalo sauce with grilled chicken, cool ranch drizzle, celery, blue cheese crumbles, and mozzarella.",
    price: 16.49,
    category: Category.NON_VEG,
    imageUrl: "/images/pizzas/buffalo-ranch.jpg",
    featured: false,
    rating: 4.8,
    reviewCount: 289,
    toppings: JSON.stringify([
      "Buffalo Sauce",
      "Grilled Chicken",
      "Ranch Drizzle",
      "Celery",
      "Blue Cheese",
      "Mozzarella",
    ]),
    tags: JSON.stringify(["spicy", "chicken", "popular"]),
    spiceLevel: 3,
    prepTime: 15,
  },
  {
    name: "Mediterranean Dream",
    description:
      "Hummus base with grilled lamb, kalamata olives, roasted red peppers, tzatziki drizzle, and crumbled feta cheese.",
    price: 17.49,
    category: Category.SPECIALTY,
    imageUrl: "/images/pizzas/mediterranean.jpg",
    featured: false,
    rating: 4.6,
    reviewCount: 156,
    toppings: JSON.stringify([
      "Hummus Base",
      "Grilled Lamb",
      "Kalamata Olives",
      "Roasted Peppers",
      "Tzatziki",
      "Feta",
    ]),
    tags: JSON.stringify(["fusion", "specialty", "lamb"]),
    spiceLevel: 2,
    prepTime: 19,
  },
  {
    name: "Hawaiian Sunset",
    description:
      "Sweet pineapple chunks with premium ham, mozzarella, and a honey-glazed crust that delivers tropical vibes in every bite.",
    price: 14.49,
    category: Category.NON_VEG,
    imageUrl: "/images/pizzas/hawaiian.jpg",
    featured: false,
    rating: 4.4,
    reviewCount: 203,
    toppings: JSON.stringify([
      "Pineapple",
      "Premium Ham",
      "Mozzarella",
      "Honey Glaze",
      "Tomato Sauce",
    ]),
    tags: JSON.stringify(["sweet", "classic", "popular"]),
    spiceLevel: 1,
    prepTime: 13,
  },
  {
    name: "Quattro Formaggi",
    description:
      "Four-cheese symphony — mozzarella, gorgonzola, parmesan, and ricotta — melted to golden perfection on a thin crispy crust.",
    price: 15.49,
    category: Category.VEGETARIAN,
    imageUrl: "/images/pizzas/quattro-formaggi.jpg",
    featured: true,
    rating: 4.9,
    reviewCount: 334,
    toppings: JSON.stringify([
      "Mozzarella",
      "Gorgonzola",
      "Parmesan",
      "Ricotta",
      "Fresh Herbs",
    ]),
    tags: JSON.stringify(["cheese", "vegetarian", "premium"]),
    spiceLevel: 1,
    prepTime: 14,
  },
];

async function main() {
  console.log("🍕 Seeding Pizza Paradise database...");

  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@pizzaparadise.com" },
    update: {},
    create: {
      name: "Pizza Admin",
      email: "admin@pizzaparadise.com",
      passwordHash: adminPassword,
      role: "ADMIN",
    },
  });

  // Create demo user
  const userPassword = await bcrypt.hash("user123", 12);
  const user = await prisma.user.upsert({
    where: { email: "user@pizzaparadise.com" },
    update: {},
    create: {
      name: "John Doe",
      email: "user@pizzaparadise.com",
      passwordHash: userPassword,
      role: "USER",
    },
  });

  // Seed pizzas
  for (const pizza of pizzas) {
    await prisma.pizza.upsert({
      where: { id: pizza.name.toLowerCase().replace(/\s+/g, "-") },
      update: pizza,
      create: { id: pizza.name.toLowerCase().replace(/\s+/g, "-"), ...pizza },
    });
  }

  console.log("✅ Database seeded successfully!");
  console.log(`👤 Admin: admin@pizzaparadise.com / admin123`);
  console.log(`👤 User: user@pizzaparadise.com / user123`);
  console.log(`🍕 Created ${pizzas.length} pizzas`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
