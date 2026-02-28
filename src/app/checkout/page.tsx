"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  selectCartItems,
  selectCartTotal,
  clearCart,
} from "@/store/slices/cartSlice";
import { setCurrentOrder } from "@/store/slices/orderSlice";
import { formatCurrency } from "@/lib/utils";
import toast from "react-hot-toast";
import {
  CreditCard,
  MapPin,
  Package,
  CheckCircle,
  ArrowRight,
  Loader2,
} from "lucide-react";
import Image from "next/image";

const stepLabels = ["Cart Review", "Delivery", "Payment", "Confirmed"];

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: "16px",
  background: "var(--bg-input)",
  border: "1px solid var(--border)",
  color: "var(--text-heading)",
  fontWeight: 600,
  fontSize: "0.9rem",
  outline: "none",
  transition: "border 0.3s",
};

const cardStyle: React.CSSProperties = {
  background: "var(--bg-card)",
  borderRadius: "var(--radius-xl)",
  border: "1px solid var(--border)",
};

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const subtotal = useAppSelector(selectCartTotal);
  const deliveryFee = 3.99;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState("");

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    notes: "",
  });
  const [payment, setPayment] = useState({
    cardNumber: "4242 4242 4242 4242",
    expiry: "12/28",
    cvv: "123",
    nameOnCard: "",
  });

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.name || !address.street || !address.city) {
      toast.error("Please fill all required fields");
      return;
    }
    setStep(2);
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guestName: address.name,
          guestEmail: address.email,
          guestPhone: address.phone,
          deliveryAddress: address,
          notes: address.notes,
          items: items.map((i) => ({
            pizzaId: i.pizzaId,
            quantity: i.quantity,
            price: i.price,
            size: i.size,
          })),
        }),
      });
      const data = await res.json();
      if (data.order) {
        dispatch(setCurrentOrder(data.order));
        dispatch(clearCart());
        setOrderId(data.order.id);
        setStep(3);
        toast.success("Order placed successfully!");
      } else {
        throw new Error("Order failed");
      }
    } catch {
      toast.error("Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0 && step < 3) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "var(--bg-body)", paddingTop: "140px" }}
      >
        <div className="text-center">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: "var(--bg-elevated)" }}
          >
            <Package size={48} style={{ color: "var(--text-faint)" }} />
          </div>
          <h2
            className="text-2xl font-black mb-3"
            style={{ color: "var(--text-heading)" }}
          >
            Your cart is empty
          </h2>
          <p
            className="mb-6 font-medium"
            style={{ color: "var(--text-muted)" }}
          >
            Add some delicious pizzas first!
          </p>
          <button onClick={() => router.push("/menu")} className="btn-primary">
            Browse Menu
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
      <div className="page-container max-w-5xl mx-auto">
        {/* Stepper */}
        <div className="flex items-center justify-center mb-12 gap-0">
          {stepLabels.map((s, i) => (
            <div key={i} className="flex items-center">
              <div className="flex flex-col items-center gap-1">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black transition-all"
                  style={
                    i < step
                      ? { background: "var(--secondary)", color: "white" }
                      : i === step
                        ? {
                            background: "var(--primary)",
                            color: "white",
                            boxShadow: "var(--shadow-btn)",
                          }
                        : {
                            background: "var(--bg-elevated)",
                            border: "2px solid var(--border)",
                            color: "var(--text-muted)",
                          }
                  }
                >
                  {i < step ? "✓" : i + 1}
                </div>
                <span
                  className="text-[10px] font-extrabold hidden sm:block"
                  style={{
                    color:
                      i === step ? "var(--text-heading)" : "var(--text-muted)",
                  }}
                >
                  {s}
                </span>
              </div>
              {i < stepLabels.length - 1 && (
                <div
                  className="w-14 sm:w-20 h-0.5 mx-2"
                  style={{
                    background: i < step ? "var(--primary)" : "var(--border)",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Step 0 */}
            {step === 0 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="p-8" style={cardStyle}>
                  <h2 className="text-xl font-black mb-6 flex items-center gap-2">
                    <Package size={20} style={{ color: "var(--primary)" }} />{" "}
                    Order Review
                  </h2>
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 p-4 rounded-2xl"
                        style={{
                          background: "var(--bg-elevated)",
                          border: "1px solid var(--border)",
                        }}
                      >
                        <div
                          className="w-14 h-14 rounded-xl overflow-hidden relative flex-shrink-0"
                          style={{ border: "1px solid var(--border)" }}
                        >
                          <Image
                            src={item.imageUrl || "/images/pizzas/default.jpg"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p
                            className="font-black text-sm uppercase"
                            style={{ color: "var(--text-heading)" }}
                          >
                            {item.name}
                          </p>
                          <p
                            className="text-xs font-medium"
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
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStep(1)}
                    className="w-full btn-primary mt-8 flex items-center justify-center gap-2"
                  >
                    Continue to Delivery <ArrowRight size={18} />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 1 */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <form
                  onSubmit={handleAddressSubmit}
                  className="p-8"
                  style={cardStyle}
                >
                  <h2 className="text-xl font-black mb-6 flex items-center gap-2">
                    <MapPin size={20} style={{ color: "var(--primary)" }} />{" "}
                    Delivery Details
                  </h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          className="text-[10px] font-extrabold uppercase tracking-widest block mb-2"
                          style={{ color: "var(--text-muted)" }}
                        >
                          Full Name *
                        </label>
                        <input
                          style={inputStyle}
                          placeholder="John Doe"
                          required
                          value={address.name}
                          onChange={(e) =>
                            setAddress({ ...address, name: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label
                          className="text-[10px] font-extrabold uppercase tracking-widest block mb-2"
                          style={{ color: "var(--text-muted)" }}
                        >
                          Phone *
                        </label>
                        <input
                          style={inputStyle}
                          placeholder="+44 20 7123 4567"
                          required
                          value={address.phone}
                          onChange={(e) =>
                            setAddress({ ...address, phone: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        className="text-[10px] font-extrabold uppercase tracking-widest block mb-2"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Email
                      </label>
                      <input
                        style={inputStyle}
                        type="email"
                        placeholder="john@example.com"
                        value={address.email}
                        onChange={(e) =>
                          setAddress({ ...address, email: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label
                        className="text-[10px] font-extrabold uppercase tracking-widest block mb-2"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Street Address *
                      </label>
                      <input
                        style={inputStyle}
                        placeholder="123 Main Street, Apt 4B"
                        required
                        value={address.street}
                        onChange={(e) =>
                          setAddress({ ...address, street: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label
                          className="text-[10px] font-extrabold uppercase tracking-widest block mb-2"
                          style={{ color: "var(--text-muted)" }}
                        >
                          City *
                        </label>
                        <input
                          style={inputStyle}
                          placeholder="London"
                          required
                          value={address.city}
                          onChange={(e) =>
                            setAddress({ ...address, city: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label
                          className="text-[10px] font-extrabold uppercase tracking-widest block mb-2"
                          style={{ color: "var(--text-muted)" }}
                        >
                          State
                        </label>
                        <input
                          style={inputStyle}
                          placeholder="Greater London"
                          value={address.state}
                          onChange={(e) =>
                            setAddress({ ...address, state: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label
                          className="text-[10px] font-extrabold uppercase tracking-widest block mb-2"
                          style={{ color: "var(--text-muted)" }}
                        >
                          Postcode
                        </label>
                        <input
                          style={inputStyle}
                          placeholder="EC1A 1BB"
                          value={address.zip}
                          onChange={(e) =>
                            setAddress({ ...address, zip: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        className="text-[10px] font-extrabold uppercase tracking-widest block mb-2"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Delivery Notes
                      </label>
                      <input
                        style={inputStyle}
                        placeholder="Leave at door, ring bell..."
                        value={address.notes}
                        onChange={(e) =>
                          setAddress({ ...address, notes: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 mt-8">
                    <button
                      type="button"
                      onClick={() => setStep(0)}
                      className="flex-1 py-4 rounded-2xl font-black text-sm transition-all"
                      style={{
                        background: "var(--bg-elevated)",
                        color: "var(--text-heading)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      Back
                    </button>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-primary flex-1 flex items-center justify-center gap-2"
                    >
                      Continue <ArrowRight size={18} />
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <form
                  onSubmit={handlePlaceOrder}
                  className="p-8"
                  style={cardStyle}
                >
                  <h2 className="text-xl font-black mb-6 flex items-center gap-2">
                    <CreditCard size={20} style={{ color: "var(--primary)" }} />{" "}
                    Payment
                  </h2>
                  <div
                    className="rounded-2xl p-4 mb-6 text-xs flex items-center gap-2"
                    style={{
                      background: "rgba(65,105,225,0.08)",
                      border: "1px solid rgba(65,105,225,0.2)",
                      color: "#6B8DF7",
                    }}
                  >
                    🔒 Test Mode — Use card:{" "}
                    <strong>4242 4242 4242 4242</strong>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label
                        className="text-[10px] font-extrabold uppercase tracking-widest block mb-2"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Name on Card *
                      </label>
                      <input
                        style={inputStyle}
                        placeholder="John Doe"
                        required
                        value={payment.nameOnCard}
                        onChange={(e) =>
                          setPayment({ ...payment, nameOnCard: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label
                        className="text-[10px] font-extrabold uppercase tracking-widest block mb-2"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Card Number *
                      </label>
                      <input
                        style={{ ...inputStyle, fontFamily: "monospace" }}
                        placeholder="4242 4242 4242 4242"
                        required
                        value={payment.cardNumber}
                        onChange={(e) =>
                          setPayment({ ...payment, cardNumber: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          className="text-[10px] font-extrabold uppercase tracking-widest block mb-2"
                          style={{ color: "var(--text-muted)" }}
                        >
                          Expiry *
                        </label>
                        <input
                          style={{ ...inputStyle, fontFamily: "monospace" }}
                          placeholder="MM/YY"
                          required
                          value={payment.expiry}
                          onChange={(e) =>
                            setPayment({ ...payment, expiry: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label
                          className="text-[10px] font-extrabold uppercase tracking-widest block mb-2"
                          style={{ color: "var(--text-muted)" }}
                        >
                          CVV *
                        </label>
                        <input
                          style={{ ...inputStyle, fontFamily: "monospace" }}
                          placeholder="123"
                          required
                          value={payment.cvv}
                          onChange={(e) =>
                            setPayment({ ...payment, cvv: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-8">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 py-4 rounded-2xl font-black text-sm transition-all"
                      style={{
                        background: "var(--bg-elevated)",
                        color: "var(--text-heading)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      Back
                    </button>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: loading ? 1 : 1.02 }}
                      whileTap={{ scale: loading ? 1 : 0.98 }}
                      disabled={loading}
                      className="btn-primary flex-1 flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />{" "}
                          Processing...
                        </>
                      ) : (
                        <>Place Order — {formatCurrency(total)}</>
                      )}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-12 text-center"
                style={cardStyle}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                >
                  <CheckCircle
                    size={72}
                    className="mx-auto mb-4"
                    style={{ color: "var(--secondary)" }}
                  />
                </motion.div>
                <h2 className="text-3xl font-black mb-3">Order Confirmed!</h2>
                <p
                  className="mb-2 font-medium"
                  style={{ color: "var(--text-muted)" }}
                >
                  Your order ID:{" "}
                  <strong
                    style={{
                      color: "var(--text-heading)",
                      fontFamily: "monospace",
                    }}
                  >
                    {orderId}
                  </strong>
                </p>
                <p
                  className="mb-8 font-medium"
                  style={{ color: "var(--text-muted)" }}
                >
                  Estimated delivery:{" "}
                  <strong style={{ color: "var(--text-heading)" }}>
                    30-45 minutes
                  </strong>
                </p>
                <div className="flex gap-3 justify-center flex-wrap">
                  <button
                    onClick={() => router.push(`/orders/${orderId}`)}
                    className="btn-primary"
                  >
                    Track Order
                  </button>
                  <button
                    onClick={() => router.push("/menu")}
                    className="px-8 py-4 rounded-2xl font-black text-sm"
                    style={{
                      background: "var(--bg-elevated)",
                      color: "var(--text-heading)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    Order More
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          {step < 3 && (
            <div className="lg:col-span-1">
              <div className="p-6 sticky top-28" style={cardStyle}>
                <h3 className="text-base font-black mb-5">Order Summary</h3>
                <div className="space-y-2 mb-5">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span style={{ color: "var(--text-muted)" }}>
                        {item.name} ×{item.quantity}
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
                <div
                  className="h-px my-4"
                  style={{ background: "var(--border)" }}
                />
                <div className="space-y-2 text-sm">
                  {[
                    ["Subtotal", subtotal],
                    ["Delivery", deliveryFee],
                    ["Tax", tax],
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
                <div
                  className="h-px my-4"
                  style={{ background: "var(--border)" }}
                />
                <div className="flex justify-between font-black text-lg">
                  <span>Total</span>
                  <span style={{ color: "var(--primary)" }}>
                    {formatCurrency(total)}
                  </span>
                </div>
                <div
                  className="mt-5 p-3 rounded-2xl text-xs text-center font-bold"
                  style={{
                    background: "rgba(0,141,68,0.08)",
                    border: "1px solid rgba(0,141,68,0.2)",
                    color: "var(--secondary)",
                  }}
                >
                  🚀 Estimated delivery: 30-45 min
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
