"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Star,
  Clock,
  MapPin,
  Instagram,
  Facebook,
} from "lucide-react";
import Image from "next/image";
import ScrollSequence from "@/components/animations/ScrollSequence";

const cardStyle: React.CSSProperties = {
  background: "var(--bg-card)",
  borderRadius: "var(--radius-xl)",
  border: "1px solid var(--border)",
  height: "100%",
  display: "flex",
  flexDirection: "column",
};

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-body)" }}>
      {/* Apple-Style Sticky Hero Section */}
      <section className="relative h-[200vh]">
        {/* Absolute premium background gradient tailored for the 3D pizza frame */}
        <div className="absolute inset-0 pointer-events-none -z-20 bg-[radial-gradient(circle_at_70%_50%,_rgba(20,10,5,1)_0%,_rgba(0,0,0,0)_60%)] opacity-80" />
        {/* Sticky wrapper pinning the hero to the viewport while scroll logic runs */}
        <div className="sticky top-0 w-full h-[100dvh] lg:h-screen flex flex-col overflow-hidden pt-24 sm:pt-32 lg:pt-40 pb-6 lg:pb-10">
          {/* Dedicated Navbar Spacer to ensure content starts AFTER navbar */}
          <div className="h-24 md:h-32 lg:h-48 w-full flex-shrink-0" />

          <div className="page-container flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6 lg:gap-20 w-full flex-1">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 text-center lg:text-left z-10"
            >
              <h1 className="text-[40px] sm:text-6xl md:text-8xl lg:text-[110px] font-[950] leading-[0.9] mb-4 sm:mb-6 lg:mb-8 tracking-tight md:tracking-tighter shrink-0">
                CRAFTED
                <br />
                <span className="text-primary italic">BY HEART.</span>
              </h1>

              <div
                className="inline-flex items-center justify-center gap-3 px-6 py-2.5 rounded-full mb-6 sm:mb-10 lg:mb-14 shadow-md w-fit lg:mx-0"
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border)",
                }}
              >
                <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-primary animate-pulse flex-shrink-0" />
                <span className="text-[9px] md:text-[12px] font-black tracking-[0.2em] md:tracking-[0.3em] uppercase opacity-80 pt-0.5">
                  Fitzrovia&apos;s Legendary Pizzeria
                </span>
              </div>

              <div className="max-w-xl mx-auto lg:mx-0 space-y-4 sm:space-y-12 mb-8 sm:mb-20">
                <p className="text-base sm:text-lg md:text-2xl lg:text-3xl font-medium leading-[1.4] opacity-70 italic font-serif">
                  "The People's Pizzeria. Serving fresh, handmade pizza to
                  Londoners since 1999."
                </p>

                <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-6 justify-center lg:justify-start">
                  <Link href="/menu" className="w-full sm:w-auto">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-primary w-full sm:w-auto text-base sm:text-lg md:text-xl py-4 sm:py-6 md:px-12 md:py-8"
                    >
                      ORDER NOW{" "}
                      <ArrowRight
                        size={20}
                        className="ml-2 sm:ml-3 inline md:w-[24px] md:h-[24px]"
                      />
                    </motion.button>
                  </Link>
                  <Link href="/about" className="w-full sm:w-auto">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-primary w-full sm:w-auto text-base sm:text-lg md:text-xl py-4 sm:py-6 md:px-12 md:py-8"
                      style={{
                        background: "transparent",
                        color: "var(--text-heading)",
                        borderColor: "var(--border)",
                      }}
                    >
                      OUR STORY{" "}
                      <ArrowRight
                        size={20}
                        className="ml-2 sm:ml-3 inline opacity-100 md:w-[24px] md:h-[24px]"
                      />
                    </motion.button>
                  </Link>
                </div>
              </div>

              <div
                className="hidden lg:grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-12 pt-10 lg:pt-20"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                {[
                  ["30 Min", "DELIVERY"],
                  ["4.9★", "RATING"],
                  ["Stone", "BAKED"],
                  ["Premium", "QUALITY"],
                ].map(([val, label]) => (
                  <div key={label} className="group">
                    <p className="text-4xl font-black mb-2 group-hover:text-primary transition-colors underline decoration-border underline-offset-8 decoration-4">
                      {val}
                    </p>
                    <p className="text-[12px] font-extrabold tracking-[0.4em] uppercase opacity-40">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 relative w-full flex justify-center mt-8 sm:mt-2 lg:mt-0 min-h-[300px] sm:min-h-[400px] lg:min-h-0"
            >
              {/* 3D Interpolated Component (Apple Style Scroll) */}
              <div className="relative w-full h-[40vh] sm:h-[45vh] lg:h-auto aspect-square scale-[1.4] sm:scale-125 lg:scale-125 transform lg:translate-x-12 translate-y-4 sm:translate-y-0">
                <ScrollSequence
                  frameCount={240}
                  imagePrefix="/images/pizza-transition/ezgif-frame-"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section - ICCO Style */}
      <section
        className="section-padding overflow-hidden"
        style={{ background: "var(--bg-elevated)" }}
      >
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-5 relative shadow-[0_40px_80px_rgba(0,0,0,0.5)] overflow-hidden rounded-[30px] md:rounded-[50px] lg:rounded-[70px]"
              style={{
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(30px)",
                border: "1px solid rgba(255,255,255,0.1)",
                padding: "clamp(24px, 5vw, 60px) clamp(20px, 4vw, 40px)",
              }}
            >
              {/* Ornamental Industrial Numbers */}
              <div className="absolute -top-4 -right-4 text-[80px] md:text-[120px] font-black opacity-[0.03] pointer-events-none select-none italic leading-none">
                01
              </div>

              <div className="flex flex-col items-center text-center gap-3 md:gap-6 lg:gap-8 relative z-10 w-full">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-1 bg-primary mb-1 rounded-full" />
                  <span className="section-tag w-fit text-[10px] md:text-sm tracking-[0.3em] font-black uppercase py-1 px-3">
                    ESTABLISHMENT
                  </span>
                </div>

                <h2 className="text-[24px] sm:text-4xl md:text-5xl lg:text-7xl font-[1000] leading-[1.0] tracking-tighter uppercase italic break-words flex flex-col items-center">
                  THE PEOPLE&apos;S
                  <span className="text-primary NOT-italic block">
                    PIZZERIA
                  </span>
                </h2>

                <div className="w-[50%] h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent my-1" />

                <div className="space-y-3 md:space-y-6 mb-4 md:mb-8">
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-black leading-tight tracking-tight opacity-90 italic">
                    "London&apos;s original stone-baked spot. Crafted with soul
                    in Fitzrovia since 1999."
                  </p>
                  <p className="text-xs sm:text-base md:text-lg leading-relaxed opacity-60 max-w-2xl font-medium">
                    Today, our family has grown, but our values remain the same.
                    Fresh dough made daily, the finest ingredients, and an open
                    kitchen where you can watch the magic happen.
                  </p>
                </div>

                <Link href="/about">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary w-full sm:w-auto text-base sm:text-lg md:text-xl py-4 sm:py-6 md:px-12 md:py-8"
                  >
                    EXPLORE OUR STORY{" "}
                    <ArrowRight
                      size={20}
                      className="ml-2 sm:ml-3 inline md:w-[24px] md:h-[24px]"
                    />
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 mt-8 lg:mt-0 pb-16 lg:pb-0">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="aspect-[4/3] sm:aspect-[3/4] rounded-[30px] sm:rounded-[50px] overflow-hidden relative shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
              >
                <Image
                  src="/images/pizzas/artisan-bakery.jpg"
                  alt="Artisan Bakery"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-1000"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="aspect-[4/3] sm:aspect-[3/4] rounded-[30px] sm:rounded-[50px] overflow-hidden relative shadow-[0_20px_40px_rgba(0,0,0,0.3)] sm:translate-y-24"
              >
                <Image
                  src="/images/pizzas/fresh-prep.jpg"
                  alt="Fresh Prep"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-1000"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Section - ICCO Landmarks */}
      <section className="section-padding">
        <div className="page-container">
          <div className="text-center mb-32">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="section-tag mb-8"
            >
              OUR REALM
            </motion.span>
            <h2 className="text-[36px] sm:text-5xl md:text-6xl lg:text-8xl font-[950] tracking-tighter uppercase italic leading-[0.9]">
              WHERE TO <span className="text-primary NOT-italic">FiND US</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
            {[
              {
                name: "FiTZROViA",
                address: "46 Goodge Street, London",
                hours: "SUN-WED: 10AM-11PM",
                image: "/images/pizzas/fitzrovia.jpg",
              },
              {
                name: "SOHO",
                address: "23-24 Greek Street, London",
                hours: "OPEN UNTİL 3:30AM (FRI-SAT)",
                image: "/images/pizzas/soho.jpg",
              },
              {
                name: "CAMDEN",
                address: "21a Camden High St, London",
                hours: "DAILY: 11AM - LATE",
                image: "/images/pizzas/camden.jpg",
              },
            ].map((loc, i) => (
              <motion.div
                key={loc.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -20 }}
                className="group relative flex flex-col items-center bg-elevated border border-border rounded-[60px] overflow-hidden shadow-xl"
                style={{ paddingBottom: "60px" }}
              >
                <div className="relative w-full h-[250px] sm:h-[300px] lg:h-[400px] mb-6 sm:mb-8 overflow-hidden rounded-t-[40px] -mt-16 bg-black">
                  <Image
                    src={loc.image}
                    alt={loc.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-4 sm:mt-8 mb-4 sm:mb-6 uppercase tracking-tighter">
                  {loc.name}
                </h3>
                <div className="flex flex-col items-center gap-3 sm:gap-4 opacity-70 mb-8 sm:mb-12">
                  <div className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base lg:text-lg font-bold text-center px-4">
                    <MapPin
                      size={18}
                      className="text-primary shrink-0 md:w-[22px]"
                    />{" "}
                    {loc.address}
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base lg:text-lg font-bold text-center px-4">
                    <Clock
                      size={18}
                      className="text-secondary shrink-0 md:w-[20px]"
                    />{" "}
                    {loc.hours}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="bg-primary text-white p-6 rounded-3xl shadow-2xl"
                >
                  <ArrowRight size={24} />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / Social Feed - The Black Card Section */}
      <section
        className="section-padding mx-4 my-8 sm:m-10 rounded-[40px] sm:rounded-[80px] overflow-hidden relative"
        style={{
          background: "var(--bg-elevated)",
          border: "1px solid var(--border)",
        }}
      >
        <div className="absolute top-0 right-0 w-[50%] h-full bg-primary/10 blur-[150px] -z-0" />

        <div className="page-container grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 items-center relative z-10 px-4 sm:px-0">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-tag !text-white !bg-primary border border-white/20 mb-10">
              LEGENDARY VIBES
            </span>
            <h2
              className="text-[32px] sm:text-5xl md:text-6xl lg:text-8xl font-[950] mb-6 sm:mb-10 lg:mb-12 leading-[0.85] tracking-tighter uppercase italic"
              style={{ color: "var(--text-heading)" }}
            >
              JOIN THE
              <br />
              <span className="text-primary NOT-italic underline decoration-border/20 decoration-4 underline-offset-[10px] md:underline-offset-[20px]">
                FAMiLY
              </span>
            </h2>
            <p
              className="text-base sm:text-xl lg:text-2xl opacity-60 mb-10 sm:mb-16 leading-relaxed max-w-lg"
              style={{ color: "var(--text-body)" }}
            >
              Follow our journey and tag us in your slices. We feature the best
              community shots weekly.
            </p>
            <div className="flex gap-8">
              {[Instagram, Facebook].map((Icon, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.1, backgroundColor: "var(--primary)" }}
                  className="w-20 h-20 rounded-3xl flex items-center justify-center bg-elevated transition-all border border-border shadow-2xl backdrop-blur-xl"
                  style={{ color: "var(--text-heading)" }}
                >
                  <Icon size={32} />
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-square rounded-[60px] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.8)] border-[1px] border-white/10"
          >
            <Image
              src="/images/pizzas/social-wall.jpg"
              alt="Social Feed"
              fill
              className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-700"
            />
            <div className="absolute inset-x-4 sm:inset-x-8 bottom-4 sm:bottom-8 p-6 sm:p-12 bg-black/90 backdrop-blur-2xl rounded-[30px] sm:rounded-[40px] border border-white/10 z-20">
              <span className="text-xl sm:text-2xl md:text-3xl font-[950] italic tracking-tighter block mb-1 sm:mb-2 uppercase text-white leading-tight break-words">
                #THEPEOPLESPiZZERiA
              </span>
              <p className="text-white/40 font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[8px] sm:text-[10px]">
                FEATURED POST BY @PARADISE_LOVER
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
