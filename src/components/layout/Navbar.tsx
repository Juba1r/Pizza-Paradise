"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Menu as MenuIcon,
  X,
  User,
  Moon,
  Sun,
  MapPin,
  Info,
  Phone,
  ArrowRight,
  Instagram,
  Facebook,
} from "lucide-react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  toggleMobileMenu,
  toggleTheme,
  selectTheme,
  selectMobileMenuOpen,
} from "@/store/slices/uiSlice";
import { toggleCart, selectCartCount } from "@/store/slices/cartSlice";

const NAV_LINKS = [
  { name: "HOME", path: "/" },
  { name: "MENU", path: "/menu" },
  { name: "ABOUT", path: "/about" },
  { name: "LOCATIONS", path: "/locations" },
  { name: "CONTACT", path: "/contact" },
  { name: "ORDERS", path: "/orders" },
];

export default function Navbar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const cartCount = useAppSelector(selectCartCount);
  const isMobileMenuOpen = useAppSelector(selectMobileMenuOpen);
  const theme = useAppSelector(selectTheme);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled ? "py-3 md:py-4 shadow-xl" : "py-5 md:py-10"
      }`}
    >
      <div
        className="absolute inset-0 -z-10 transition-all duration-500"
        style={{
          background: scrolled ? "var(--bg-nav)" : "transparent",
          backdropFilter: scrolled ? "blur(30px)" : "none",
          borderBottom: scrolled
            ? "1px solid var(--border)"
            : "1px solid transparent",
        }}
      />

      <div className="page-container flex items-center justify-between relative z-[120]">
        {/* Logo */}
        <Link
          href="/"
          className="flex flex-row items-center gap-2 sm:gap-3 md:gap-4 group shrink-0"
        >
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-[12px] sm:rounded-[14px] md:rounded-[18px] overflow-hidden rotate-2 transition-transform group-hover:rotate-0 group-hover:scale-110 shadow-lg border border-border/10 shrink-0 flex items-center justify-center">
            <Image
              src="/logo-premium.png"
              alt="Pizza Paradise Logo"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center translate-y-0.5">
            <h1 className="text-[13px] sm:text-[16px] md:text-[18px] lg:text-xl font-black tracking-tighter leading-none uppercase text-primary italic whitespace-nowrap">
              PIZZA PARADISE
            </h1>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div
          className="hidden lg:flex items-center gap-14 px-12 py-5 rounded-[24px]"
          style={{
            background: scrolled ? "transparent" : "rgba(255,255,255,0.03)",
            border: scrolled ? "none" : "1px solid rgba(0,0,0,0.05)",
          }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className="relative text-[11px] font-black tracking-[0.25em] transition-all hover:text-primary"
              style={{
                color:
                  pathname === link.path
                    ? "var(--primary)"
                    : "var(--text-heading)",
              }}
            >
              {link.name}
              {pathname === link.path && (
                <motion.div
                  layoutId="navline"
                  className="absolute -bottom-3 left-0 right-0 h-1 bg-primary rounded-full shadow-[0_0_10px_rgba(227,30,36,0.4)]"
                />
              )}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-4 lg:gap-5 shrink-0">
          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => dispatch(toggleTheme())}
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center transition-all bg-elevated border border-border shadow-sm shrink-0"
            style={{ color: "var(--text-heading)" }}
          >
            {theme === "dark" ? (
              <Sun size={20} className="text-yellow-400 md:w-[22px]" />
            ) : (
              <Moon size={20} className="md:w-[22px]" />
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => dispatch(toggleCart())}
            className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-[16px] lg:rounded-[20px] flex items-center justify-center group shadow-sm bg-elevated border border-border shrink-0"
            style={{ color: "var(--text-heading)" }}
          >
            <ShoppingBag
              size={18}
              className="group-hover:scale-110 transition-transform sm:w-[20px] md:w-[24px]"
            />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-3 -right-3 min-w-[32px] h-8 px-2 rounded-full flex items-center justify-center text-[12px] font-black shadow-2xl z-50 pointer-events-none"
                  style={{
                    backgroundColor: "#e31e24",
                    color: "#ffffff",
                    border: "3px solid var(--bg-elevated)",
                  }}
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* User Profile */}
          <Link href="/auth/login" className="hidden xl:flex">
            <motion.div
              whileHover={{ scale: 1.15 }}
              className="w-14 h-14 rounded-2xl bg-elevated border border-border flex items-center justify-center shadow-sm"
              style={{ color: "var(--text-heading)" }}
            >
              <User size={22} />
            </motion.div>
          </Link>

          {/* Mobile Menu Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => dispatch(toggleMobileMenu())}
            className="lg:hidden w-10 h-10 sm:w-12 sm:h-12 rounded-[16px] sm:rounded-full flex flex-col justify-center items-center gap-1.5 z-[120] relative transition-all shadow-sm shrink-0"
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border)",
              color: "var(--text-heading)",
            }}
          >
            <motion.div
              animate={{
                rotate: isMobileMenuOpen ? 45 : 0,
                y: isMobileMenuOpen ? 8 : 0,
              }}
              className="w-5 h-0.5 rounded-full transition-all duration-300"
              style={{ background: "currentColor" }}
            />
            <motion.div
              animate={{
                opacity: isMobileMenuOpen ? 0 : 1,
                x: isMobileMenuOpen ? 10 : 0,
              }}
              className="w-5 h-0.5 rounded-full transition-all duration-300"
              style={{ background: "currentColor" }}
            />
            <motion.div
              animate={{
                rotate: isMobileMenuOpen ? -45 : 0,
                y: isMobileMenuOpen ? -8 : 0,
              }}
              className="w-5 h-0.5 rounded-full transition-all duration-300"
              style={{ background: "currentColor" }}
            />
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
            }}
            animate={{
              opacity: 1,
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            }}
            exit={{ opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            transition={{
              type: "tween",
              duration: 0.5,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="fixed inset-0 z-[110] lg:hidden flex flex-col p-8 sm:p-12 pt-32 sm:pt-40 overflow-y-auto backdrop-blur-3xl"
            style={{
              background: "var(--bg-elevated)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            {/* Background Blur Accents */}
            <div className="fixed top-0 right-0 w-[80%] h-[50%] bg-primary/5 blur-[100px] rounded-full pointer-events-none -z-10" />
            <div className="fixed bottom-0 left-0 w-[80%] h-[50%] bg-primary/10 blur-[100px] rounded-full pointer-events-none -z-10" />

            <div className="flex flex-col gap-2 z-10 w-full mb-10 mt-4 sm:mt-8">
              {NAV_LINKS.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.1 + index * 0.1,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href={link.path}
                    onClick={() => dispatch(toggleMobileMenu())}
                    className="group flex flex-col w-full border-b border-border/50 pb-6 sm:pb-8 pt-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6 sm:gap-8">
                        <span className="text-sm font-black text-primary/50 font-mono tracking-widest">
                          0{index + 1}
                        </span>
                        <span
                          className="text-4xl sm:text-6xl font-[950] uppercase tracking-tighter transition-all duration-500 group-hover:translate-x-4"
                          style={{
                            color:
                              pathname === link.path
                                ? "var(--primary)"
                                : "var(--text-heading)",
                          }}
                        >
                          {link.name}
                        </span>
                      </div>
                      <ArrowRight
                        className={`transition-all duration-500 mr-2 sm:mr-4 ${pathname === link.path ? "text-primary opacity-100 translate-x-0" : "opacity-0 -translate-x-8 group-hover:opacity-50 group-hover:translate-x-0"}`}
                        size={32}
                        style={{
                          color:
                            pathname === link.path
                              ? "var(--primary)"
                              : "var(--text-heading)",
                        }}
                      />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-auto z-10 w-full"
            >
              <Link
                href="/auth/login"
                onClick={() => dispatch(toggleMobileMenu())}
                className="group flex items-center gap-6 text-xl sm:text-2xl font-black p-6 sm:p-8 rounded-[30px] border border-border shadow-sm hover:border-primary/50 transition-all overflow-hidden relative mb-10"
                style={{
                  background: "var(--bg-card)",
                  color: "var(--text-heading)",
                }}
              >
                <div className="absolute inset-0 bg-primary/5 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
                <User size={28} className="text-primary relative z-10" />
                <span className="relative z-10 tracking-wide">My Account</span>
                <ArrowRight className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all ml-auto relative z-10 text-primary" />
              </Link>

              <div className="flex items-center justify-between opacity-70 pb-10">
                <div
                  className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em]"
                  style={{ color: "var(--text-body)" }}
                >
                  Follow The Paradise
                </div>
                <div className="flex gap-6">
                  <span
                    className="hover:text-primary transition-colors cursor-pointer"
                    style={{ color: "var(--text-heading)" }}
                  >
                    <Instagram size={20} />
                  </span>
                  <span
                    className="hover:text-primary transition-colors cursor-pointer"
                    style={{ color: "var(--text-heading)" }}
                  >
                    <Facebook size={20} />
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
