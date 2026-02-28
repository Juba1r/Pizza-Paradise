"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  formatCurrency,
  formatDate,
  getOrderStatusColor,
  getOrderStatusLabel,
} from "@/lib/utils";
import { Package, ExternalLink } from "lucide-react";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/orders?limit=20")
      .then((r) => r.json())
      .then((d) => setOrders(d.orders || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div
      className="min-h-screen pb-16"
      style={{ background: "var(--bg-body)", paddingTop: "140px" }}
    >
      <div className="page-container max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-8">
            <span className="section-tag">📦 Order History</span>
            <h1
              className="text-4xl font-black mt-3"
              style={{ color: "var(--text-heading)" }}
            >
              Your Orders
            </h1>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-2xl h-32"
                  style={{ background: "var(--bg-card)" }}
                />
              ))}
            </div>
          ) : orders.length === 0 ? (
            <div
              className="p-16 text-center"
              style={{
                background: "var(--bg-card)",
                borderRadius: "var(--radius-xl)",
                border: "1px solid var(--border)",
              }}
            >
              <span className="text-6xl block mb-4">🍕</span>
              <h3
                className="text-2xl font-black mb-2"
                style={{ color: "var(--text-heading)" }}
              >
                No orders yet
              </h3>
              <p className="mb-6" style={{ color: "var(--text-muted)" }}>
                Start your pizza journey today!
              </p>
              <Link href="/menu">
                <button className="btn-primary">Order Now</button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order, i) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -2 }}
                  className="p-5"
                  style={{
                    background: "var(--bg-card)",
                    borderRadius: "var(--radius-xl)",
                    border: "1px solid var(--border)",
                    transition: "var(--transition)",
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{
                          background: "rgba(255,69,0,0.12)",
                          border: "1px solid rgba(255,69,0,0.2)",
                        }}
                      >
                        <Package
                          size={18}
                          style={{ color: "var(--primary)" }}
                        />
                      </div>
                      <div>
                        <p
                          className="font-bold text-sm"
                          style={{ color: "var(--text-heading)" }}
                        >
                          Order #{order.id.slice(-8).toUpperCase()}
                        </p>
                        <p
                          className="text-xs"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {formatDate(order.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className="badge text-xs"
                        style={{
                          background: `${getOrderStatusColor(order.status)}15`,
                          color: getOrderStatusColor(order.status),
                          border: `1px solid ${getOrderStatusColor(order.status)}40`,
                        }}
                      >
                        {getOrderStatusLabel(order.status)}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {order.items?.slice(0, 3).map((item: any) => (
                      <span
                        key={item.id}
                        className="text-xs px-2 py-1 rounded-lg"
                        style={{
                          background: "var(--bg-elevated)",
                          color: "var(--text-muted)",
                          border: "1px solid var(--border)",
                        }}
                      >
                        🍕 {item.pizza?.name} ×{item.quantity}
                      </span>
                    ))}
                    {order.items?.length > 3 && (
                      <span
                        className="text-xs px-2 py-1 rounded-lg"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          color: "var(--text-muted)",
                          border: "1px solid var(--border)",
                        }}
                      >
                        +{order.items.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span
                      className="font-black text-lg"
                      style={{ color: "var(--primary)" }}
                    >
                      {formatCurrency(order.total)}
                    </span>
                    <Link href={`/orders/${order.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-1 text-sm font-semibold px-3 py-1.5 rounded-lg"
                        style={{
                          background: "rgba(255,69,0,0.12)",
                          color: "var(--primary)",
                          border: "1px solid rgba(255,69,0,0.3)",
                        }}
                      >
                        Track <ExternalLink size={12} />
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
