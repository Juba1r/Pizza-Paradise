import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export function getOrderStatusColor(status: string): string {
  const colors: Record<string, string> = {
    PENDING: "#FFD700",
    CONFIRMED: "#4169E1",
    PREPARING: "#FF8C00",
    READY: "#00C853",
    OUT_FOR_DELIVERY: "#7C3AED",
    DELIVERED: "#00E676",
    CANCELLED: "#FF1744",
  };
  return colors[status] || "#9E9E9E";
}

export function getOrderStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    PENDING: "Pending",
    CONFIRMED: "Confirmed",
    PREPARING: "Preparing",
    READY: "Ready for Pickup",
    OUT_FOR_DELIVERY: "Out for Delivery",
    DELIVERED: "Delivered",
    CANCELLED: "Cancelled",
  };
  return labels[status] || status;
}

export const SIZE_MULTIPLIERS: Record<string, number> = {
  PERSONAL: 0.7,
  SMALL: 0.85,
  MEDIUM: 1.0,
  LARGE: 1.3,
  XL: 1.6,
};

export const SIZE_LABELS: Record<string, string> = {
  PERSONAL: '6" Personal',
  SMALL: '8" Small',
  MEDIUM: '10" Medium',
  LARGE: '12" Large',
  XL: '14" XL',
};

export function calculatePizzaPrice(basePrice: number, size: string): number {
  return basePrice * (SIZE_MULTIPLIERS[size] || 1.0);
}
