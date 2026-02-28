"use client";
import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  formatCurrency,
  getOrderStatusLabel,
  getOrderStatusColor,
} from "@/lib/utils";
import { Clock, MapPin, RefreshCw } from "lucide-react";

const STATUS_STEPS = [
  { key: "PENDING", label: "Order Placed", emoji: "📋" },
  { key: "CONFIRMED", label: "Confirmed", emoji: "✅" },
  { key: "PREPARING", label: "Preparing", emoji: "👨‍🍳" },
  { key: "READY", label: "Ready", emoji: "🔥" },
  { key: "OUT_FOR_DELIVERY", label: "On the Way", emoji: "🛵" },
  { key: "DELIVERED", label: "Delivered", emoji: "🎉" },
];

const cardStyle: React.CSSProperties = {
  background: "var(--bg-card)",
  borderRadius: "var(--radius-xl)",
  border: "1px solid var(--border)",
};

export default function OrderTrackingPage() {
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchOrder = useCallback(async () => {
    try {
      const res = await fetch(`/api/orders/${id}`);
      const data = await res.json();
      setOrder(data.order);
    } catch {
      // silent
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [id]);

  useEffect(() => {
    fetchOrder();
    const interval = setInterval(fetchOrder, 15000);
    return () => clearInterval(interval);
  }, [fetchOrder]);

  const currentStepIndex = STATUS_STEPS.findIndex(
    (s) => s.key === order?.status,
  );

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "var(--bg-body)", paddingTop: "140px" }}
      >
        <div className="text-center">
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="block text-6xl mb-4"
          >
            🍕
          </motion.span>
          <p style={{ color: "var(--text-muted)" }}>Loading your order...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "var(--bg-body)", paddingTop: "140px" }}
      >
        <div className="text-center">
          <span className="text-6xl block mb-4">😕</span>
          <h2
            className="text-2xl font-black"
            style={{ color: "var(--text-heading)" }}
          >
            Order not found
          </h2>
          <button
            onClick={() => router.push("/orders")}
            className="btn-primary mt-4"
          >
            View All Orders
          </button>
        </div>
      </div>
    );
  }

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
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1
                className="text-3xl font-black"
                style={{ color: "var(--text-heading)" }}
              >
                Track Order
              </h1>
              <p
                className="text-sm mt-1 font-mono"
                style={{ color: "var(--text-muted)" }}
              >
                #{order.id}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="text-sm px-4 py-2 rounded-full font-bold"
                style={{
                  background: `${getOrderStatusColor(order.status)}20`,
                  color: getOrderStatusColor(order.status),
                  border: `1px solid ${getOrderStatusColor(order.status)}40`,
                }}
              >
                {getOrderStatusLabel(order.status)}
              </div>
              <button
                onClick={() => {
                  setRefreshing(true);
                  fetchOrder();
                }}
                className="p-2 rounded-full transition-all"
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border)",
                  color: "var(--primary)",
                }}
              >
                <RefreshCw
                  size={16}
                  className={refreshing ? "animate-spin" : ""}
                />
              </button>
            </div>
          </div>

          {/* Status Stepper */}
          <div className="p-6 mb-6" style={cardStyle}>
            <div className="flex items-start justify-between">
              {STATUS_STEPS.map((step, i) => (
                <div
                  key={step.key}
                  className="flex flex-col items-center flex-1 relative"
                >
                  {i < STATUS_STEPS.length - 1 && (
                    <div
                      className="absolute top-5 left-1/2 w-full h-0.5 transition-all duration-700"
                      style={{
                        background:
                          i < currentStepIndex
                            ? "var(--primary)"
                            : "var(--border)",
                        zIndex: 0,
                      }}
                    />
                  )}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1, type: "spring" }}
                    className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-base transition-all duration-500"
                    style={
                      i < currentStepIndex
                        ? {
                            background: "var(--secondary)",
                            boxShadow: "0 0 15px rgba(0,141,68,0.4)",
                          }
                        : i === currentStepIndex
                          ? {
                              background: "var(--primary)",
                              boxShadow: "var(--shadow-btn)",
                            }
                          : {
                              background: "var(--bg-elevated)",
                              border: "2px solid var(--border)",
                            }
                    }
                  >
                    {i <= currentStepIndex ? step.emoji : ""}
                  </motion.div>
                  <p
                    className="text-xs mt-2 text-center font-bold hidden sm:block"
                    style={{
                      color:
                        i <= currentStepIndex
                          ? "var(--text-heading)"
                          : "var(--text-muted)",
                    }}
                  >
                    {step.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ETA */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div
              className="p-5"
              style={{ ...cardStyle, borderColor: "rgba(227,30,36,0.2)" }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Clock size={16} style={{ color: "var(--primary)" }} />
                <span
                  className="text-xs font-bold"
                  style={{ color: "var(--text-muted)" }}
                >
                  Estimated Time
                </span>
              </div>
              <p
                className="text-2xl font-black"
                style={{ color: "var(--text-heading)" }}
              >
                {order.estimatedTime} min
              </p>
            </div>
            <div className="p-5" style={cardStyle}>
              <div className="flex items-center gap-2 mb-1">
                <MapPin size={16} style={{ color: "var(--primary)" }} />
                <span
                  className="text-xs font-bold"
                  style={{ color: "var(--text-muted)" }}
                >
                  Deliver To
                </span>
              </div>
              <p
                className="text-sm font-bold truncate"
                style={{ color: "var(--text-heading)" }}
              >
                {order.guestName || order.user?.name || "You"}
              </p>
            </div>
          </div>

          {/* Items */}
          <div className="p-6 mb-6" style={cardStyle}>
            <h3 className="text-lg font-black mb-4">Your Order</h3>
            <div className="space-y-3">
              {order.items?.map((item: any) => (
                <div key={item.id} className="flex items-center gap-3">
                  <span className="text-3xl">🍕</span>
                  <div className="flex-1">
                    <p
                      className="font-bold"
                      style={{ color: "var(--text-heading)" }}
                    >
                      {item.pizza?.name}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {item.size} × {item.quantity}
                    </p>
                  </div>
                  <span
                    className="font-black"
                    style={{ color: "var(--secondary)" }}
                  >
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div
              className="h-px my-4"
              style={{ background: "var(--border)" }}
            />
            <div className="flex justify-between font-black text-lg">
              <span>Total</span>
              <span style={{ color: "var(--primary)" }}>
                {formatCurrency(order.total)}
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => router.push("/orders")}
              className="flex-1 py-4 rounded-2xl font-black text-sm transition-all"
              style={{
                background: "var(--bg-elevated)",
                color: "var(--text-heading)",
                border: "1px solid var(--border)",
              }}
            >
              All Orders
            </button>
            <button
              onClick={() => router.push("/menu")}
              className="btn-primary flex-1"
            >
              Order Again 🍕
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
