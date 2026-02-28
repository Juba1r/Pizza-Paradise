"use client";
import { motion } from "framer-motion";
import { Star, Plus, ArrowRight } from "lucide-react";
import { useMouseTracking } from "@/hooks/useMouseTracking";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import { useAppSelector } from "@/store/hooks";
import { AnimatePresence } from "framer-motion";

interface PizzaCardProps {
  pizza: any;
  i: number;
  onClick: () => void;
  onQuickAdd: (pizza: any, e: React.MouseEvent) => void;
}

export function PizzaCard({ pizza, i, onClick, onQuickAdd }: PizzaCardProps) {
  const { ref: cardRef, handleMouseMove } = useMouseTracking();
  const cartItems = useAppSelector((state) => state.cart.items);

  const pizzaInCartCount = cartItems
    .filter((item) => item.pizzaId === pizza.id)
    .reduce((sum, item) => sum + item.quantity, 0);

  const toppings = (() => {
    try {
      if (!pizza.toppings) return [];
      const parsed =
        typeof pizza.toppings === "string"
          ? JSON.parse(pizza.toppings)
          : pizza.toppings;
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.error("Toppings parse error", e);
      return [];
    }
  })();

  const tags = (() => {
    try {
      if (!pizza.tags) return [];
      const parsed =
        typeof pizza.tags === "string" ? JSON.parse(pizza.tags) : pizza.tags;
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  })();

  const isVegetarian =
    pizza.category?.toUpperCase() === "VEGETARIAN" ||
    pizza.category?.toUpperCase() === "VEGAN" ||
    tags.some((t: any) =>
      ["vegetarian", "vegan", "meat-free", "plant-based"].includes(
        String(t).toLowerCase(),
      ),
    ) ||
    toppings.some((t: any) => String(t).toLowerCase().includes("vegetarian")) ||
    pizza.name?.toLowerCase().includes("veggie") ||
    pizza.name?.toLowerCase().includes("quattro") ||
    pizza.name?.toLowerCase().includes("margherita") ||
    pizza.description?.toLowerCase().includes("vegetarian") ||
    pizza.description?.toLowerCase().includes("four-cheese");

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="pizza-card cursor-pointer group"
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative h-72 w-full overflow-hidden">
        <Image
          src={pizza.imageUrl || "/images/pizzas/default.jpg"}
          alt={pizza.name}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 400px"
        />

        {/* Badges */}
        <div className="absolute top-6 left-6 flex flex-col gap-3 z-20">
          {pizza.featured && (
            <span className="badge badge-red shadow-lg">HOT SELLER</span>
          )}
          <span className="badge badge-green shadow-lg">ARTISAN</span>
        </div>

        {/* Cart Count Indicator */}
        <AnimatePresence>
          {pizzaInCartCount > 0 && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute top-5 right-5 z-20 min-w-[36px] h-9 px-2 rounded-full flex items-center justify-center font-black text-[13px] shadow-2xl pointer-events-none"
              style={{
                backgroundColor: "var(--primary)",
                color: "#ffffff",
                border: "3px solid var(--bg-card)",
              }}
            >
              {pizzaInCartCount}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Add Button */}
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "var(--secondary)" }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => onQuickAdd(pizza, e)}
          className="absolute right-6 bottom-6 w-14 h-14 rounded-2xl flex items-center justify-center z-30 shadow-2xl transition-all translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
          style={{ background: "var(--primary)" }}
        >
          <Plus size={28} className="text-white" />
        </motion.button>
      </div>

      {/* Content Area */}
      <div className="pizza-card-content" style={{ paddingTop: "50px" }}>
        <div className="flex justify-between items-start gap-4">
          <h3 className="text-2xl font-black transition-all group-hover:text-primary leading-tight">
            {pizza.name}
          </h3>
          <div className="flex items-center justify-center gap-2 py-2 px-5 sm:px-6 rounded-full bg-elevated border-2 border-border shrink-0 mt-1 shadow-sm min-w-[70px]">
            <Star size={16} className="text-yellow-400 fill-yellow-400" />
            <span className="text-[14px] font-black leading-none mt-[2px]">
              {pizza.rating}
            </span>
          </div>
        </div>

        <p
          className="text-[15px] font-medium leading-relaxed opacity-80"
          style={{ color: "var(--text-body)" }}
        >
          {pizza.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {toppings.slice(0, 4).map((t: string, idx: number) => {
            const colors = [
              { bg: "rgba(227,30,36,0.1)", text: "var(--primary)" },
              { bg: "rgba(0,141,68,0.1)", text: "var(--secondary)" },
              { bg: "rgba(255,165,0,0.1)", text: "#ff8c00" },
              { bg: "rgba(0,122,255,0.1)", text: "#007aff" },
            ];
            const color = colors[idx % colors.length];
            return (
              <span
                key={idx}
                className="badge text-[10px] font-black tracking-widest px-3 py-1.5 rounded-lg"
                style={{
                  background: color.bg,
                  color: color.text,
                  border: `1px solid ${color.text}20`,
                }}
              >
                {t}
              </span>
            );
          })}
          {isVegetarian && (
            <span
              className="badge text-[10px] font-black tracking-widest px-4 py-2 rounded-lg uppercase"
              style={{
                background: "rgba(0,141,68,0.15)",
                color: "var(--secondary)",
                border: "1px solid var(--secondary)",
              }}
            >
              VEGETARiAN
            </span>
          )}
        </div>

        {/* Bottom Price/Action */}
        <div
          className="mt-4 pt-8 flex items-end justify-between"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <div>
            <span
              className="text-[10px] font-extrabold uppercase tracking-[0.2em] mb-2 block"
              style={{ color: "var(--text-faint)" }}
            >
              PRiCE STARTiNG AT
            </span>
            <span
              className="text-3xl font-black"
              style={{
                color: "var(--primary)",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {formatCurrency(pizza.price)}
            </span>
          </div>

          <div
            className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest translate-x-0 lg:translate-x-2 opacity-100 lg:opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500"
            style={{ color: "var(--text-heading)" }}
          >
            CUSTOMIZE <ArrowRight size={14} className="text-primary" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
