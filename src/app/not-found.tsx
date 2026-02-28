"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center text-center px-4"
      style={{ background: "var(--bg-body)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <motion.span
          animate={{ rotate: [0, 20, -20, 10, -10, 0], y: [0, -20, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
          className="block text-[100px] mb-6"
        >
          🍕
        </motion.span>
        <h1
          className="text-8xl font-black mb-4"
          style={{ color: "var(--primary)" }}
        >
          404
        </h1>
        <h2
          className="text-3xl font-black mb-3"
          style={{ color: "var(--text-heading)" }}
        >
          Slice Not Found
        </h2>
        <p
          className="text-lg mb-8 max-w-md font-medium"
          style={{ color: "var(--text-muted)" }}
        >
          Looks like this page ran away — probably to get more pizza. Let&apos;s
          get you back on track.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary px-8 py-4 text-lg"
            >
              Go Home
            </motion.button>
          </Link>
          <Link href="/menu">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 text-lg rounded-2xl font-black transition-all"
              style={{
                background: "var(--bg-elevated)",
                color: "var(--text-heading)",
                border: "1px solid var(--border)",
              }}
            >
              Order Pizza
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
