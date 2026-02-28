"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

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
};

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    if (
      form.email === "admin@pizzaparadise.com" &&
      form.password === "admin123"
    ) {
      toast.success("Welcome back, Admin!");
      router.push("/admin");
    } else if (form.email && form.password.length >= 6) {
      toast.success("Welcome back!");
      router.push("/menu");
    } else {
      toast.error("Invalid credentials");
    }
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "var(--bg-body)" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-10 right-20 w-96 h-96 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, var(--primary), transparent)",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div
          className="rounded-[28px] p-8"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
          }}
        >
          <div className="text-center mb-8">
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="block text-5xl mb-3"
            >
              🍕
            </motion.span>
            <h1 className="text-2xl font-black">
              Welcome to{" "}
              <span style={{ color: "var(--primary)" }}>Paradise</span>
            </h1>
            <p
              className="text-sm mt-1 font-medium"
              style={{ color: "var(--text-muted)" }}
            >
              Sign in to your account
            </p>
          </div>

          <div
            className="mb-6 p-3 rounded-2xl text-xs font-bold"
            style={{
              background: "rgba(0,141,68,0.08)",
              border: "1px solid rgba(0,141,68,0.2)",
              color: "var(--secondary)",
            }}
          >
            <strong>Demo:</strong> admin@pizzaparadise.com / admin123
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                className="text-[10px] font-extrabold uppercase tracking-widest mb-2 block"
                style={{ color: "var(--text-muted)" }}
              >
                Email
              </label>
              <input
                type="email"
                required
                style={inputStyle}
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div>
              <label
                className="text-[10px] font-extrabold uppercase tracking-widest mb-2 block"
                style={{ color: "var(--text-muted)" }}
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  required
                  style={{ ...inputStyle, paddingRight: "48px" }}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--text-muted)" }}
                >
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center gap-2 py-4 text-base mt-2"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Signing in...
                </>
              ) : (
                <>
                  Sign In <ArrowRight size={18} />
                </>
              )}
            </motion.button>
          </form>

          <div
            className="text-center mt-6 text-sm font-medium"
            style={{ color: "var(--text-muted)" }}
          >
            New customer?{" "}
            <Link
              href="/auth/register"
              className="font-bold transition-colors"
              style={{ color: "var(--primary)" }}
            >
              Create account
            </Link>
          </div>
          <div className="text-center mt-3">
            <Link
              href="/"
              className="text-xs font-medium transition-colors"
              style={{ color: "var(--text-muted)" }}
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
