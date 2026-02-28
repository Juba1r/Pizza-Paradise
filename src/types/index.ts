export interface Pizza {
  id: string;
  name: string;
  description: string;
  price: number;
  category: PizzaCategory;
  imageUrl: string;
  available: boolean;
  featured: boolean;
  rating: number;
  reviewCount: number;
  toppings: string; // JSON string
  tags: string; // JSON string
  spiceLevel: number;
  prepTime: number;
  createdAt: string;
  updatedAt: string;
}

export type PizzaCategory =
  | "VEGETARIAN"
  | "NON_VEG"
  | "SPECIALTY"
  | "VEGAN"
  | "SIDES"
  | "DRINKS";

export type PizzaSize = "PERSONAL" | "SMALL" | "MEDIUM" | "LARGE" | "XL";

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PREPARING"
  | "READY"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELLED";

export type PaymentStatus =
  | "PENDING"
  | "PROCESSING"
  | "SUCCEEDED"
  | "FAILED"
  | "REFUNDED";

export interface OrderItem {
  id: string;
  orderId: string;
  pizzaId: string;
  quantity: number;
  size: PizzaSize;
  price: number;
  toppings?: string;
  pizza?: Pizza;
}

export interface Order {
  id: string;
  userId?: string;
  guestEmail?: string;
  guestName?: string;
  guestPhone?: string;
  addressId?: string;
  deliveryAddress?: string;
  status: OrderStatus;
  total: number;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  notes?: string;
  estimatedTime: number;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
  payment?: Payment;
  user?: { name: string; email: string };
}

export interface Payment {
  id: string;
  orderId: string;
  stripePaymentIntentId?: string;
  amount: number;
  status: PaymentStatus;
  method: string;
  createdAt: string;
}

export interface Address {
  id: string;
  userId: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  isDefault: boolean;
}

export interface User {
  id: string;
  name?: string;
  email: string;
  role: "USER" | "ADMIN";
  image?: string;
  phone?: string;
  createdAt: string;
}

export interface AdminStats {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  totalPizzas: number;
  todayOrders: number;
}

export interface CartItem {
  id: string;
  pizzaId: string;
  name: string;
  price: number;
  basePrice: number;
  imageUrl: string;
  quantity: number;
  size: string;
  toppings: string[];
}
