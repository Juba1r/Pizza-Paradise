"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Phone, Clock, ArrowRight, ExternalLink } from "lucide-react";

const locations = [
  {
    name: "FiTZROViA",
    address: "46 Goodge Street, W1T 4LU, London",
    phone: "020 7580 9562",
    hours: "Sun-Wed: 10am-11pm / Thu-Sat: 10am-Midnight",
    image: "/images/pizzas/fitzrovia.jpg",
    map: "https://maps.app.goo.gl/uGTksy68XortuXin8",
  },
  {
    name: "SOHO",
    address: "23-24 Greek Street, W1D 4DZ, London",
    phone: "020 7437 9470",
    hours: "Sun-Tue: 10am-Midnight / Wed-Sat: 10am-3:30am",
    image: "/images/pizzas/soho.jpg",
    map: "https://maps.app.goo.gl/W8fbvyWonTmfKBmN9",
  },
  {
    name: "CAMDEN",
    address: "21a Camden High Street, NW1 7JE, London",
    phone: "020 7387 7011",
    hours: "Mon-Wed: 11am-11pm / Thu-Sun: Late Night",
    image: "/images/pizzas/camden.jpg",
    map: "https://maps.app.goo.gl/T1iuSG4PZqkpS29G8",
  },
];

const cardStyle: React.CSSProperties = {
  background: "var(--bg-card)",
  borderRadius: "var(--radius-xl)",
  border: "1px solid var(--border)",
  padding: "40px",
};

export default function PizzeriasPage() {
  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--bg-body)", paddingTop: "180px" }}
    >
      <div className="page-container mb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-32"
        >
          <span className="section-tag mb-8">LOCATiONS</span>
          <h1 className="text-6xl md:text-[5.5rem] font-black leading-[0.9] mb-12 uppercase tracking-tighter">
            OUR <span style={{ color: "var(--primary)" }}>PiZZERiAS</span>
          </h1>
          <p className="text-2xl max-w-3xl mx-auto font-medium leading-relaxed opacity-70">
            Find your nearest ICCO spot across Central London. Fresh pizza,
            great vibes.
          </p>
        </motion.div>

        <div className="space-y-48">
          {locations.map((loc, i) => (
            <div
              key={loc.name}
              className={`flex flex-col ${i % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-24 items-center`}
            >
              <div className="flex-1 space-y-12">
                <div
                  style={cardStyle}
                  className="group hover:border-primary transition-all"
                >
                  <h2 className="text-5xl font-black mb-8 border-b border-border pb-8">
                    {loc.name}
                  </h2>
                  <div className="space-y-8">
                    <div className="flex items-start gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                        <MapPin className="text-primary" />
                      </div>
                      <div>
                        <p className="text-xl font-black uppercase mb-1">
                          Address
                        </p>
                        <p className="text-lg opacity-60 font-medium">
                          {loc.address}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center shrink-0">
                        <Phone className="text-secondary" />
                      </div>
                      <div>
                        <p className="text-xl font-black uppercase mb-1">
                          Phone
                        </p>
                        <p className="text-lg opacity-60 font-medium">
                          {loc.phone}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-elevated flex items-center justify-center shrink-0 border border-border">
                        <Clock className="opacity-50" />
                      </div>
                      <div>
                        <p className="text-xl font-black uppercase mb-1">
                          Opening Hours
                        </p>
                        <p className="text-lg opacity-60 font-medium leading-relaxed">
                          {loc.hours}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-12">
                    <a
                      href={loc.map}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 btn-primary text-sm py-5 flex items-center justify-center gap-3"
                    >
                      GET DiRECTiONS <ExternalLink size={18} />
                    </a>
                    <button className="flex-1 py-5 rounded-2xl font-black text-sm border border-border bg-elevated transition-all hover:bg-border">
                      ORDER ONLiNE
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex-1 w-full aspect-[4/3] relative rounded-[60px] overflow-hidden shadow-2xl">
                <Image
                  src={loc.image}
                  alt={loc.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-12 left-12">
                  <span className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 text-white font-black text-sm uppercase tracking-widest">
                    London Pizzeria
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
