"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Heart, Users, Utensils, Award } from "lucide-react";

const cardStyle: React.CSSProperties = {
  background: "var(--bg-card)",
  borderRadius: "var(--radius-xl)",
  border: "1px solid var(--border)",
};

export default function AboutPage() {
  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--bg-body)", paddingTop: "180px" }}
    >
      <div className="page-container mb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-32 flex flex-col items-center"
        >
          <span className="section-tag mb-8 mx-auto inline-block">
            OUR STORY
          </span>
          <h1 className="text-6xl md:text-[5.5rem] font-black leading-[0.9] mb-12 uppercase tracking-tighter text-center">
            THE PEOPLE'S
            <br />
            <span style={{ color: "var(--primary)" }}>PIZZERIA</span>
          </h1>
          <p className="text-xl sm:text-2xl max-w-3xl mx-auto font-medium leading-relaxed opacity-70 px-4 text-center">
            Founded in 1999 on Goodge Street, we've been serving authentic,
            stone-baked pizza to Londoners for over 25 years.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center mb-24 lg:mb-48 px-4 sm:px-0">
          <div className="space-y-8 sm:space-y-12">
            <h2 className="text-4xl sm:text-5xl font-black uppercase">
              Independent &<br className="hidden sm:block" />
              Family Run
            </h2>
            <p className="text-lg sm:text-xl leading-relaxed opacity-80">
              ICCO is central London's family run independent pizzeria. Born out
              of a passion for great value and high-quality ingredients, we
              opened our doors for the first time in 1999 in the heart of
              Fitzrovia.
            </p>
            <p className="text-lg sm:text-xl leading-relaxed opacity-80">
              Our mission has always been simple: treat every guest like family,
              and serve them the best pizza in London.
            </p>
            <div className="grid grid-cols-2 gap-4 sm:gap-8 pt-8 sm:pt-12">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Heart className="text-primary" />
                </div>
                <span className="font-black uppercase tracking-widest text-sm">
                  Passionate
                </span>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center">
                  <Award className="text-secondary" />
                </div>
                <span className="font-black uppercase tracking-widest text-sm">
                  Authentic
                </span>
              </div>
            </div>
          </div>
          <div className="aspect-square relative rounded-[40px] sm:rounded-[60px] overflow-hidden shadow-2xl skew-y-0 sm:skew-y-3 mt-8 lg:mt-0">
            <Image
              src="/images/pizzas/artisan-bakery.jpg"
              alt="Our Bakery"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-24 lg:mb-48 px-4 sm:px-0">
          {[
            {
              title: "FRESH DAILY",
              desc: "Our dough is handmade every morning in-store. No exceptions, no shortcuts.",
              icon: Utensils,
            },
            {
              title: "THE COMMUNITY",
              desc: "From local workers to tourists, we are the melting pot of Fitzrovia and beyond.",
              icon: Users,
            },
            {
              title: "TiMELESS",
              desc: "Stone-baked tradition since 1999. The oven never cools down.",
              icon: Award,
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -20 }}
              style={cardStyle}
              className="text-center p-8 sm:p-12 lg:p-[60px]"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-elevated flex items-center justify-center mx-auto mb-8 sm:mb-10 border border-border">
                <item.icon size={32} className="text-primary sm:w-10 sm:h-10" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black mb-4 sm:mb-8 uppercase tracking-widest">
                {item.title}
              </h3>
              <p className="text-base sm:text-lg leading-relaxed opacity-60 font-medium">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
