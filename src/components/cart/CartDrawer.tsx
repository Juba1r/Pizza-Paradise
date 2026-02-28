"use client";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  selectCartItems,
  selectCartTotal,
  removeItem,
  updateQuantity,
  closeCart,
} from "@/store/slices/cartSlice";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";

export default function CartDrawer() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((s) => s.cart.isOpen);
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const deliveryFee = 3.99;
  const tax = total * 0.08;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(closeCart())}
            className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 h-full z-[201] flex flex-col"
            style={{
              width: "100%",
              maxWidth: "480px",
              background: "var(--bg-body)",
              borderLeft: "1px solid var(--border)",
              boxShadow: "-20px 0 60px rgba(0,0,0,0.08)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between p-12 pb-10"
              style={{
                borderBottom: "1px solid var(--border)",
                paddingTop: "120px",
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg"
                  style={{ background: "var(--primary)" }}
                >
                  🍕
                </div>
                <div>
                  <h2
                    className="text-xl font-black leading-none mb-1"
                    style={{ color: "var(--text-heading)" }}
                  >
                    YOUR ORDER
                  </h2>
                  <p
                    className="text-[10px] font-extrabold uppercase tracking-[0.2em]"
                    style={{ color: "var(--text-faint)" }}
                  >
                    {items.length} items
                  </p>
                </div>
              </div>
              <button
                onClick={() => dispatch(closeCart())}
                className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all"
                style={{
                  background: "var(--bg-elevated)",
                  color: "var(--text-muted)",
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-8 space-y-5">
              <AnimatePresence mode="popLayout">
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-full gap-6 text-center"
                  >
                    <div
                      className="w-28 h-28 rounded-full flex items-center justify-center"
                      style={{ background: "var(--bg-elevated)" }}
                    >
                      <ShoppingBag
                        size={52}
                        style={{ color: "var(--text-faint)" }}
                      />
                    </div>
                    <div>
                      <h3
                        className="text-xl font-black mb-2"
                        style={{ color: "var(--text-heading)" }}
                      >
                        CART IS EMPTY
                      </h3>
                      <p
                        className="font-medium text-sm"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Add something delicious!
                      </p>
                    </div>
                    <Link
                      href="/menu"
                      onClick={() => dispatch(closeCart())}
                      className="w-full max-w-[240px]"
                    >
                      <button className="btn-primary w-full">
                        START ORDERING
                      </button>
                    </Link>
                  </motion.div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="group flex gap-8 p-6 rounded-3xl transition-all"
                      style={{
                        background: "var(--bg-card)",
                        border: "1px solid var(--border)",
                        marginBottom: "1.5rem",
                      }}
                    >
                      <div
                        className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 relative"
                        style={{ border: "1px solid var(--border)" }}
                      >
                        <Image
                          src={item.imageUrl || "/images/pizzas/default.jpg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                        <div>
                          <div className="flex justify-between items-start mb-1">
                            <h4
                              className="font-black text-lg mb-2 pr-2 uppercase tracking-tight"
                              style={{ color: "var(--text-heading)" }}
                            >
                              {item.name}
                            </h4>
                            <button
                              onClick={() => dispatch(removeItem(item.id))}
                              className="p-1.5 rounded-lg transition-colors"
                              style={{ color: "var(--primary)" }}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                          <p
                            className="text-[10px] font-extrabold tracking-widest uppercase"
                            style={{ color: "var(--text-faint)" }}
                          >
                            Size: {item.size}
                          </p>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div
                            className="flex items-center gap-4 px-3 py-1.5 rounded-xl"
                            style={{
                              background: "var(--bg-elevated)",
                              border: "1px solid var(--border)",
                            }}
                          >
                            <button
                              onClick={() =>
                                dispatch(
                                  updateQuantity({
                                    id: item.id,
                                    quantity: item.quantity - 1,
                                  }),
                                )
                              }
                              style={{ color: "var(--text-muted)" }}
                            >
                              <Minus size={14} />
                            </button>
                            <span
                              className="font-black text-sm w-4 text-center"
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
                              style={{ color: "var(--text-muted)" }}
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <span
                            className="font-black text-lg"
                            style={{ color: "var(--text-heading)" }}
                          >
                            {formatCurrency(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div
                className="p-12 pt-16 pb-32 space-y-16"
                style={{
                  borderTop: "1px solid var(--border)",
                  background: "var(--bg-elevated)",
                }}
              >
                <div className="space-y-3">
                  <div
                    className="flex justify-between text-[10px] font-extrabold uppercase tracking-widest"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <span>Subtotal</span>
                    <span style={{ color: "var(--text-heading)" }}>
                      {formatCurrency(total)}
                    </span>
                  </div>
                  <div
                    className="flex justify-between text-[10px] font-extrabold uppercase tracking-widest"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <span>Delivery</span>
                    <span style={{ color: "var(--text-heading)" }}>
                      {formatCurrency(deliveryFee)}
                    </span>
                  </div>
                  <div
                    className="flex justify-between text-[10px] font-extrabold uppercase tracking-widest"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <span>Tax</span>
                    <span style={{ color: "var(--text-heading)" }}>
                      {formatCurrency(tax)}
                    </span>
                  </div>
                  <div
                    className="h-px my-3"
                    style={{ background: "var(--border)" }}
                  />
                  <div className="flex justify-between items-end">
                    <span
                      className="text-xs font-extrabold uppercase tracking-[0.15em]"
                      style={{ color: "var(--text-heading)" }}
                    >
                      Total
                    </span>
                    <span
                      className="text-3xl font-black"
                      style={{ color: "var(--primary)" }}
                    >
                      {formatCurrency(total + deliveryFee + tax)}
                    </span>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  onClick={() => dispatch(closeCart())}
                  className="block mt-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full btn-primary py-5 text-base"
                  >
                    CHECKOUT <ArrowRight size={18} strokeWidth={3} />
                  </motion.button>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
