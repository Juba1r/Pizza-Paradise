import type { Metadata } from "next";
import "./globals.css";
import { ReduxProvider } from "@/providers/ReduxProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import { Toaster } from "react-hot-toast";
import { ThemeScript } from "@/components/ThemeScript";

export const metadata: Metadata = {
  title: "Pizza Paradise — Legendary Pizzas Delivered Fresh",
  description:
    "Order the most legendary pizzas crafted with finest ingredients. Hot, fresh and delivered to your door in 30 minutes. Pizza Paradise — Where Every Slice Tells a Story.",
  keywords: "pizza, delivery, order online, fresh pizza, best pizza",
  openGraph: {
    title: "Pizza Paradise",
    description: "Legendary pizzas delivered fresh to your door",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Rammetto+One&family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <ReduxProvider>
          <Navbar />
          <CartDrawer />
          <main className="relative z-[1]">{children}</main>
          <Footer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "var(--bg-card)",
                color: "var(--text-heading)",
                border: "1px solid var(--border)",
                borderRadius: "16px",
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
              },
              success: {
                iconTheme: { primary: "#e31e24", secondary: "#fff" },
              },
            }}
          />
        </ReduxProvider>
      </body>
    </html>
  );
}
