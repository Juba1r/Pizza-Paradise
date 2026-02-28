"use client";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  formatCurrency,
  formatDate,
  getOrderStatusColor,
  getOrderStatusLabel,
} from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  ShoppingBag,
  DollarSign,
  Clock,
  Pizza,
  RefreshCw,
  CheckCircle,
  ChevronDown,
  TrendingUp,
  Users,
} from "lucide-react";
import toast from "react-hot-toast";

const STATUS_FLOW = [
  "PENDING",
  "CONFIRMED",
  "PREPARING",
  "READY",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [queue, setQueue] = useState<any[]>([]);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "queue" | "orders" | "menu"
  >("dashboard");
  const [pizzas, setPizzas] = useState<any[]>([]);
  const [updatingOrder, setUpdatingOrder] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const [statsRes, queueRes] = await Promise.all([
        fetch("/api/admin/stats"),
        fetch("/api/orders/queue"),
      ]);
      const statsData = await statsRes.json();
      const queueData = await queueRes.json();
      setStats(statsData.stats);
      setRecentOrders(statsData.recentOrders || []);
      setQueue(queueData.orders || []);

      // Build chart data from revenueByDay
      const byDay: Record<string, number> = {};
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      statsData.revenueByDay?.forEach((o: any) => {
        const d = days[new Date(o.createdAt).getDay()];
        byDay[d] = (byDay[d] || 0) + o.total;
      });
      setChartData(
        days.map((d) => ({ day: d, revenue: +(byDay[d] || 0).toFixed(2) })),
      );
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPizzas = useCallback(async () => {
    const res = await fetch("/api/pizzas?available=all");
    const data = await res.json();
    setPizzas(data.pizzas || []);
  }, []);

  useEffect(() => {
    fetchData();
    fetchPizzas();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [fetchData, fetchPizzas]);

  const updateOrderStatus = async (orderId: string, status: string) => {
    setUpdatingOrder(orderId);
    try {
      await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      toast.success(`Order updated to ${getOrderStatusLabel(status)}`);
      fetchData();
    } catch {
      toast.error("Failed to update order");
    } finally {
      setUpdatingOrder(null);
    }
  };

  const togglePizzaAvailability = async (id: string, available: boolean) => {
    await fetch(`/api/pizzas/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ available: !available }),
    });
    toast.success("Pizza availability updated");
    fetchPizzas();
  };

  const statCards = [
    {
      label: "Total Revenue",
      value: formatCurrency(stats?.totalRevenue || 0),
      icon: DollarSign,
      color: "#00C853",
      sub: "All time",
    },
    {
      label: "Today's Orders",
      value: stats?.todayOrders || 0,
      icon: ShoppingBag,
      color: "#FF4500",
      sub: "New orders",
    },
    {
      label: "Pending Queue",
      value: stats?.pendingOrders || 0,
      icon: Clock,
      color: "#FFD700",
      sub: "Active orders",
    },
    {
      label: "Menu Items",
      value: stats?.totalPizzas || 0,
      icon: Pizza,
      color: "#7C3AED",
      sub: "Available",
    },
  ];

  const tabs = [
    { id: "dashboard", label: "📊 Dashboard" },
    { id: "queue", label: `🔥 Queue (${queue.length})` },
    { id: "orders", label: "📦 Orders" },
    { id: "menu", label: "🍕 Menu" },
  ];

  return (
    <div className="min-h-screen pt-20" style={{ background: "#080200" }}>
      {/* Admin Header */}
      <div
        className="py-6 mb-0"
        style={{
          background: "rgba(255,69,0,0.06)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="page-container flex items-center justify-between">
          <div>
            <h1
              className="text-3xl font-black"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              <span className="text-gradient">Admin</span>{" "}
              <span className="text-white">Dashboard</span>
            </h1>
            <p
              className="text-sm mt-1 uppercase font-bold tracking-wider"
              style={{ color: "var(--text-muted)" }}
            >
              PIZZA PARADISE Control Center
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setLoading(true);
              fetchData();
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
            style={{
              background: "rgba(255,69,0,0.12)",
              border: "1px solid rgba(255,69,0,0.3)",
              color: "var(--primary)",
            }}
          >
            <RefreshCw size={14} /> Refresh
          </motion.button>
        </div>
      </div>

      {/* Tabs */}
      <div className="page-container py-4">
        <div className="flex gap-2 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className="px-5 py-2 rounded-xl text-sm font-bold transition-all"
              style={
                activeTab === tab.id
                  ? {
                      background: "var(--gradient-primary)",
                      color: "white",
                      boxShadow: "var(--glow-primary)",
                    }
                  : {
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid var(--border)",
                      color: "rgba(255,255,255,0.6)",
                    }
              }
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="page-container pb-16">
        {/* DASHBOARD TAB */}
        {activeTab === "dashboard" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {statCards.map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="card p-5"
                  style={{ borderColor: `${card.color}30` }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        background: `${card.color}15`,
                        border: `1px solid ${card.color}30`,
                      }}
                    >
                      <card.icon size={18} style={{ color: card.color }} />
                    </div>
                    <TrendingUp size={14} style={{ color: card.color }} />
                  </div>
                  <p className="text-2xl font-black text-white">{card.value}</p>
                  <p
                    className="text-xs mt-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {card.label}
                  </p>
                  <p className="text-xs" style={{ color: card.color }}>
                    {card.sub}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Revenue Chart */}
            <div className="card p-6 mb-6">
              <h3 className="text-lg font-black text-white mb-4">
                Revenue (Last 7 Days)
              </h3>
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={chartData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255,255,255,0.04)"
                    />
                    <XAxis
                      dataKey="day"
                      tick={{ fill: "#8B6B5A", fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: "#8B6B5A", fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(v) => `$${v}`}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "#1A0A00",
                        border: "1px solid #3D1F0A",
                        borderRadius: 12,
                        color: "white",
                      }}
                      formatter={(value: any) => {
                        const numericValue =
                          typeof value === "number" ? value : 0;
                        const val = [`$${numericValue}`, "Revenue"] as [
                          string,
                          string,
                        ];
                        return val;
                      }}
                    />
                    <Bar
                      dataKey="revenue"
                      fill="url(#barGrad)"
                      radius={[8, 8, 0, 0]}
                    />
                    <defs>
                      <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FF4500" />
                        <stop offset="100%" stopColor="#FF8C00" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div
                  className="h-56 flex items-center justify-center"
                  style={{ color: "var(--text-muted)" }}
                >
                  No revenue data yet
                </div>
              )}
            </div>

            {/* Recent Orders */}
            <div className="card p-6">
              <h3 className="text-lg font-black text-white mb-4">
                Recent Orders
              </h3>
              {recentOrders.length === 0 ? (
                <p style={{ color: "var(--text-muted)" }}>No recent orders</p>
              ) : (
                <div className="space-y-3">
                  {recentOrders.slice(0, 5).map((order: any) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between py-2 border-b"
                      style={{ borderColor: "var(--border)" }}
                    >
                      <div>
                        <p className="font-bold text-white text-sm">
                          #{order.id.slice(-8).toUpperCase()}
                        </p>
                        <p
                          className="text-xs"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {order.user?.name || order.guestName || "Guest"} —{" "}
                          {formatDate(order.createdAt)}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className="font-black text-sm"
                          style={{ color: "var(--secondary)" }}
                        >
                          {formatCurrency(order.total)}
                        </span>
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
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* QUEUE TAB */}
        {activeTab === "queue" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-white">
                Live Order Queue
              </h2>
              <div
                className="flex items-center gap-2 text-xs"
                style={{ color: "#00C853" }}
              >
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Auto-refreshes every 10s
              </div>
            </div>
            {queue.length === 0 ? (
              <div className="card p-16 text-center">
                <CheckCircle
                  size={60}
                  className="mx-auto mb-4"
                  style={{ color: "#00C853" }}
                />
                <h3 className="text-2xl font-black text-white">All Clear!</h3>
                <p style={{ color: "var(--text-muted)" }}>
                  No active orders in queue
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {queue.map((order, i) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="card p-5"
                    style={{
                      borderLeft: `4px solid ${getOrderStatusColor(order.status)}`,
                    }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-black text-white">
                          #{order.id.slice(-8).toUpperCase()}
                        </p>
                        <p
                          className="text-xs mt-0.5"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {order.user?.name || order.guestName || "Guest"} ·{" "}
                          {formatDate(order.createdAt)}
                        </p>
                      </div>
                      <span
                        className="badge"
                        style={{
                          background: `${getOrderStatusColor(order.status)}15`,
                          color: getOrderStatusColor(order.status),
                          border: `1px solid ${getOrderStatusColor(order.status)}40`,
                        }}
                      >
                        {getOrderStatusLabel(order.status)}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {order.items?.map((item: any) => (
                        <span
                          key={item.id}
                          className="text-xs px-2 py-1 rounded-lg"
                          style={{
                            background: "rgba(255,255,255,0.04)",
                            color: "rgba(255,255,255,0.7)",
                            border: "1px solid var(--border)",
                          }}
                        >
                          🍕 {item.pizza?.name} ×{item.quantity}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span
                        className="font-black"
                        style={{ color: "var(--secondary)" }}
                      >
                        {formatCurrency(order.total)}
                      </span>
                      <div className="flex gap-2 flex-wrap">
                        {STATUS_FLOW.map((s) => {
                          const si = STATUS_FLOW.indexOf(s);
                          const ci = STATUS_FLOW.indexOf(order.status);
                          if (si !== ci + 1) return null;
                          return (
                            <motion.button
                              key={s}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => updateOrderStatus(order.id, s)}
                              disabled={updatingOrder === order.id}
                              className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
                              style={{
                                background: "var(--gradient-primary)",
                                color: "white",
                              }}
                            >
                              → {getOrderStatusLabel(s)}
                            </motion.button>
                          );
                        })}
                        <button
                          onClick={() =>
                            updateOrderStatus(order.id, "CANCELLED")
                          }
                          className="px-3 py-1.5 rounded-xl text-xs font-bold"
                          style={{
                            background: "rgba(255,23,68,0.12)",
                            color: "#FF1744",
                            border: "1px solid rgba(255,23,68,0.3)",
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* ALL ORDERS TAB */}
        {activeTab === "orders" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-2xl font-black text-white mb-6">All Orders</h2>
            <div className="space-y-3">
              {recentOrders.map((order: any, i: number) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="card p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-white text-sm">
                        #{order.id.slice(-8).toUpperCase()}
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {order.user?.name || order.guestName || "Guest"} ·{" "}
                        {order.items?.length} items ·{" "}
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className="font-black text-sm"
                        style={{ color: "var(--secondary)" }}
                      >
                        {formatCurrency(order.total)}
                      </span>
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
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* MENU TAB */}
        {activeTab === "menu" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-white">
                Menu Management
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pizzas.map((pizza: any, i: number) => (
                <motion.div
                  key={pizza.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="card p-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-3xl">🍕</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={pizza.available}
                        onChange={() =>
                          togglePizzaAvailability(pizza.id, pizza.available)
                        }
                        className="sr-only peer"
                      />
                      <div
                        className="w-10 h-5 rounded-full peer transition-all"
                        style={{
                          background: pizza.available
                            ? "var(--primary)"
                            : "var(--border)",
                        }}
                      >
                        <div
                          className="w-3.5 h-3.5 rounded-full bg-white absolute top-0.5 transition-all"
                          style={{
                            left: pizza.available ? "24px" : "2px",
                            position: "relative",
                            display: "inline-block",
                          }}
                        />
                      </div>
                    </label>
                  </div>
                  <h3 className="font-black text-white text-sm">
                    {pizza.name}
                  </h3>
                  <p
                    className="text-xs mb-2"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {pizza.category}
                  </p>
                  <div className="flex items-center justify-between">
                    <span
                      className="font-black"
                      style={{ color: "var(--secondary)" }}
                    >
                      ${pizza.price}
                    </span>
                    <span
                      className={`badge text-xs ${pizza.available ? "badge-success" : "badge-error"}`}
                    >
                      {pizza.available ? "Available" : "Unavailable"}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
