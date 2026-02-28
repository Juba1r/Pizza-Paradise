"use client";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  selectCartItems,
  selectCartTotal,
  removeItem,
  updateQuantity,
  clearCart,
} from "@/store/slices/cartSlice";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, X } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";

const cardStyle: React.CSSProperties = {
  background: "var(--bg-card)",
  borderRadius: "var(--radius-xl)",
  border: "1px solid var(--border)",
};

export default function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const subtotal = useAppSelector(selectCartTotal);
  const deliveryFee = 3.99;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  if (items.length === 0) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "var(--bg-body)", paddingTop: "140px" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div
            className="w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: "var(--bg-elevated)" }}
          >
            <ShoppingBag size={52} style={{ color: "var(--text-faint)" }} />
          </div>
          <h2
            className="text-3xl font-black mb-3"
            style={{ color: "var(--text-heading)" }}
          >
            Your cart is empty
          </h2>
          <p
            className="mb-8 text-lg font-medium"
            style={{ color: "var(--text-muted)" }}
          >
            Looks like you haven&apos;t added any pizzas yet!
          </p>
          <Link href="/menu">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary text-lg px-10 py-4"
            >
              Browse Menu
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen pb-16"
      style={{ background: "var(--bg-body)", paddingTop: "140px" }}
    >
      <div className="page-container max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="section-tag">Your Cart</span>
              <h1 className="text-4xl font-black mt-2">
                {items.length} {items.length === 1 ? "Item" : "Items"}
              </h1>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => dispatch(clearCart())}
              className="flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-extrabold transition-all"
              style={{
                background: "rgba(227,30,36,0.08)",
                border: "1px solid rgba(227,30,36,0.2)",
                color: "var(--primary)",
              }}
            >
              <X size={14} /> Clear All
            </motion.button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20, height: 0 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="p-5 flex gap-4 items-center"
                    style={cardStyle}
                  >
                    <div
                      className="w-20 h-20 rounded-2xl flex-shrink-0 overflow-hidden relative"
                      style={{ border: "1px solid var(--border)" }}
                    >
                      <Image
                        src={item.imageUrl || "/images/pizzas/default.jpg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3
                        className="font-black text-lg uppercase"
                        style={{ color: "var(--text-heading)" }}
                      >
                        {item.name}
                      </h3>
                      <p
                        className="text-sm mt-0.5 font-medium"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Size: {item.size} &nbsp;·&nbsp;{" "}
                        {formatCurrency(item.price)} each
                      </p>
                      <div className="flex items-center gap-3 mt-3">
                        <button
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: item.id,
                                quantity: item.quantity - 1,
                              }),
                            )
                          }
                          className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
                          style={{
                            background: "var(--bg-elevated)",
                            color: "var(--primary)",
                            border: "1px solid var(--border)",
                          }}
                        >
                          <Minus size={12} />
                        </button>
                        <span
                          className="font-black text-lg w-6 text-center"
                          style={{ color: "var(--text-heading)" }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: item.id,
                                quantity: item.quantity + 1,
                              }),
                            )
                          }
                          className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
                          style={{
                            background: "var(--bg-elevated)",
                            color: "var(--primary)",
                            border: "1px solid var(--border)",
                          }}
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <span
                        className="font-black text-xl"
                        style={{ color: "var(--secondary)" }}
                      >
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.85 }}
                        onClick={() => dispatch(removeItem(item.id))}
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{
                          background: "rgba(227,30,36,0.08)",
                          color: "var(--primary)",
                        }}
                      >
                        <Trash2 size={14} />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <Link href="/menu">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 mt-2 py-4 rounded-2xl font-black text-sm transition-all"
                  style={{
                    background: "var(--bg-elevated)",
                    color: "var(--text-heading)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <ShoppingBag size={16} /> Add More Pizzas
                </motion.button>
              </Link>
            </div>

            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-6 sticky top-28"
                style={cardStyle}
              >
                <h3 className="text-xl font-black mb-5">Order Summary</h3>
                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span style={{ color: "var(--text-muted)" }}>
                        {item.name} <span>×{item.quantity}</span>
                      </span>
                      <span
                        className="font-bold"
                        style={{ color: "var(--text-heading)" }}
                      >
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="h-px" style={{ background: "var(--border)" }} />
                <div className="space-y-2 text-sm my-4">
                  {[
                    ["Subtotal", subtotal],
                    ["Delivery", deliveryFee],
                    ["Tax (8%)", tax],
                  ].map(([label, val]) => (
                    <div
                      key={label as string}
                      className="flex justify-between"
                      style={{ color: "var(--text-muted)" }}
                    >
                      <span>{label as string}</span>
                      <span style={{ color: "var(--text-heading)" }}>
                        {formatCurrency(val as number)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="h-px" style={{ background: "var(--border)" }} />
                <div className="flex justify-between font-black text-xl my-4">
                  <span>Total</span>
                  <span style={{ color: "var(--primary)" }}>
                    {formatCurrency(total)}
                  </span>
                </div>
                <Link href="/checkout">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full btn-primary flex items-center justify-center gap-2 text-lg py-4"
                  >
                    Checkout <ArrowRight size={20} />
                  </motion.button>
                </Link>

                <div className="mt-5">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code"
                      className="flex-1 text-sm px-4 py-3 rounded-2xl outline-none"
                      style={{
                        background: "var(--bg-input)",
                        border: "1px solid var(--border)",
                        color: "var(--text-heading)",
                      }}
                    />
                    <button
                      className="px-4 py-2 rounded-2xl text-sm font-bold transition-all"
                      style={{
                        background: "var(--bg-elevated)",
                        border: "1px solid var(--border)",
                        color: "var(--primary)",
                      }}
                    >
                      Apply
                    </button>
                  </div>
                  <p
                    className="text-xs mt-2 text-center"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Try:{" "}
                    <span style={{ color: "var(--secondary)" }}>
                      PARADISE20
                    </span>
                  </p>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  {["🔒 Secure", "⚡ Fast", "🍕 Fresh", "✅ Guaranteed"].map(
                    (t) => (
                      <div
                        key={t}
                        className="text-center p-2 rounded-xl text-xs font-bold"
                        style={{
                          background: "var(--bg-elevated)",
                          color: "var(--text-muted)",
                          border: "1px solid var(--border)",
                        }}
                      >
                        {t}
                      </div>
                    ),
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
