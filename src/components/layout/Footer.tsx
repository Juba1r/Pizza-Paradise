"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Instagram,
  Facebook,
  Twitter,
  MapPin,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden pt-0 pb-16 border-t"
      style={{
        background: "var(--bg-body)",
        borderColor: "var(--border)",
      }}
    >
      {/* 1. ULTRA CTA SECTION */}
      <section
        className="relative w-full border-b pt-24 pb-24 md:pt-40 md:pb-40"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="absolute inset-0 opacity-10">
          {/* Subtle grid pattern for industrial feel */}
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "radial-gradient(currentColor 0.5px, transparent 0.5px)",
              backgroundSize: "30px 30px",
              color: "var(--text-heading)",
            }}
          />
        </div>

        <div className="page-container relative z-10 flex flex-col lg:flex-row items-center justify-between gap-20">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-10"
            >
              <span className="w-12 h-px bg-primary" />
              <span
                className="text-[10px] font-black tracking-[0.5em] uppercase opacity-70"
                style={{ color: "var(--text-heading)" }}
              >
                Fitzrovia&apos;s Finest
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-7xl font-[950] leading-none tracking-tighter uppercase italic"
              style={{ color: "var(--text-heading)" }}
            >
              THE LEGEND
              <br />
              <span className="text-primary NOT-italic">AWAiTS.</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Link href="/menu">
              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.85 }}
                className="btn-primary w-full sm:w-auto text-lg md:text-xl lg:text-2xl py-6 md:py-8 lg:py-10 px-12 md:px-20 lg:px-24 rounded-full shadow-[0_20px_50px_rgba(227,30,36,0.5)] border-4 border-primary group"
              >
                <span className="tracking-widest">ORDER NOW</span>
                <div className="bg-white/20 p-2 md:p-3 rounded-full group-hover:bg-white group-hover:text-primary transition-all">
                  <ArrowRight size={24} className="lg:w-8 lg:h-8" />
                </div>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. MAIN FOOTER CONTENT - "Industrial Grid" */}
      <div className="page-container pt-20 md:pt-40 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 lg:gap-32">
          {/* Brand & Narrative (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col">
            <Link href="/" className="inline-flex flex-col gap-6 group mb-16">
              <div className="flex flex-row items-center gap-3 md:gap-4 group shrink-0">
                <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-[14px] md:rounded-[18px] overflow-hidden rotate-2 transition-transform group-hover:rotate-0 group-hover:scale-110 shadow-lg border border-border/10 shrink-0 flex items-center justify-center">
                  <Image
                    src="/logo-premium.png"
                    alt="Pizza Paradise Logo"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center translate-y-0.5">
                  <h1 className="text-[18px] md:text-xl font-black tracking-tighter leading-none uppercase text-primary italic whitespace-nowrap">
                    PIZZA PARADISE
                  </h1>
                </div>
              </div>
              <p
                className="text-xl font-medium leading-relaxed max-w-sm border-l-4 border-primary/20 pl-8 opacity-70"
                style={{ color: "var(--text-body)" }}
              >
                London&apos;s original stone-baked spot. Crafted with soul in
                Fitzrovia since 1999.
              </p>
            </Link>

            <div className="flex items-center gap-8 mb-20 lg:mb-0">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -5, color: "#e31e24" }}
                  className="transition-all p-2 opacity-60 hover:opacity-100"
                  style={{ color: "var(--text-heading)" }}
                >
                  <Icon size={24} />
                </motion.a>
              ))}
              <div
                className="flex-1 h-px opacity-50"
                style={{ background: "var(--border)" }}
              />
            </div>
          </div>

          {/* Infographic Links Grid (7 Columns) */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-24">
              {/* Column: Realm */}
              <div className="space-y-10">
                <h4 className="text-[10px] font-black tracking-[0.6em] text-primary uppercase">
                  Realm
                </h4>
                <ul className="space-y-8">
                  {["MENU", "STORY", "LOCATIONS", "CATERING"].map((link) => (
                    <li key={link}>
                      <Link
                        href={`/${link.toLowerCase()}`}
                        className="text-xl font-[950] transition-all tracking-tighter uppercase italic block opacity-60 hover:opacity-100 hover:text-primary"
                        style={{ color: "var(--text-heading)" }}
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column: Timings */}
              <div className="space-y-10">
                <h4 className="text-[10px] font-black tracking-[0.6em] text-secondary uppercase">
                  Timings
                </h4>
                <div className="space-y-6">
                  {[
                    { d: "M-W", t: "23:00" },
                    { d: "T-S", t: "LATE" },
                    { d: "SUN", t: "23:00" },
                  ].map((slot) => (
                    <div key={slot.d} className="flex flex-col gap-1">
                      <span
                        className="text-[10px] font-black uppercase tracking-widest opacity-60"
                        style={{ color: "var(--text-body)" }}
                      >
                        {slot.d}
                      </span>
                      <span
                        className="text-lg font-bold uppercase tracking-tighter"
                        style={{ color: "var(--text-heading)" }}
                      >
                        {slot.t}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column: Connect */}
              <div className="space-y-10">
                <h4
                  className="text-[10px] font-black tracking-[0.6em] uppercase opacity-60"
                  style={{ color: "var(--text-heading)" }}
                >
                  Connect
                </h4>
                <div className="space-y-8">
                  <a
                    href="tel:02075809562"
                    className="flex flex-col gap-1 group"
                  >
                    <span
                      className="text-[10px] font-black uppercase tracking-widest opacity-60"
                      style={{ color: "var(--text-body)" }}
                    >
                      Phone
                    </span>
                    <span
                      className="text-base font-bold group-hover:text-primary transition-colors"
                      style={{ color: "var(--text-heading)" }}
                    >
                      020 7580 9562
                    </span>
                  </a>
                  <a href="#" className="flex flex-col gap-1 group">
                    <span
                      className="text-[10px] font-black uppercase tracking-widest opacity-60"
                      style={{ color: "var(--text-body)" }}
                    >
                      Office
                    </span>
                    <span
                      className="text-base font-bold group-hover:text-primary transition-colors flex items-center gap-2"
                      style={{ color: "var(--text-heading)" }}
                    >
                      GOODGE ST <ExternalLink size={14} />
                    </span>
                  </a>
                  <div className="pt-2">
                    <Link href="/contact">
                      <button className="text-[10px] font-black tracking-[0.3em] text-primary uppercase border-b border-primary/30 pb-1 hover:border-primary transition-all">
                        GET iN TOUCH
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. LEGAL & SYSTEM - Full Width Bottom */}
        <div
          className="mt-20 md:mt-40 pt-16 border-t"
          style={{ borderColor: "var(--border)" }}
        >
          <div
            className="flex flex-col md:flex-row items-center justify-between gap-12 text-[9px] font-black uppercase tracking-[0.6em] opacity-50"
            style={{ color: "var(--text-body)" }}
          >
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
              <p>
                © {currentYear} PIZZA PARADISE SYSTEM. ALL RIGHTS RESERVED BY
                JUBAIR IBN KHALED
              </p>
              <div
                className="hidden md:block w-px h-4"
                style={{ background: "var(--border)" }}
              />
              <p className="text-primary opacity-80">Industrial v4.1</p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 font-bold tracking-widest mt-6 md:mt-0">
              <Link
                href="#"
                className="hover:text-primary transition-colors"
                style={{ color: "var(--text-heading)" }}
              >
                Safety
              </Link>
              <Link
                href="#"
                className="hover:text-primary transition-colors"
                style={{ color: "var(--text-heading)" }}
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="hover:text-primary transition-colors"
                style={{ color: "var(--text-heading)" }}
              >
                Allergens
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span style={{ color: "var(--text-heading)" }}>
                London Status: Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
