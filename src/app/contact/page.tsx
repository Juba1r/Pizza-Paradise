"use client";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageSquare, Send, Globe } from "lucide-react";

const cardStyle: React.CSSProperties = {
  background: "var(--bg-card)",
  borderRadius: "var(--radius-xl)",
  border: "1px solid var(--border)",
  padding: "50px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "20px 24px",
  borderRadius: "20px",
  background: "var(--bg-input)",
  border: "1px solid var(--border)",
  color: "var(--text-heading)",
  fontWeight: 600,
  fontSize: "1rem",
  outline: "none",
};

export default function ContactPage() {
  return (
    <div
      className="min-h-screen pb-32"
      style={{ background: "var(--bg-body)", paddingTop: "180px" }}
    >
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-32"
        >
          <span className="section-tag mb-8">GET iN TOUCH</span>
          <h1 className="text-6xl md:text-[5.5rem] font-black leading-[0.9] mb-12 uppercase tracking-tighter">
            CONTACT <span style={{ color: "var(--primary)" }}>US</span>
          </h1>
          <p className="text-2xl max-w-3xl mx-auto font-medium leading-relaxed opacity-70">
            Have a question, feedback, or just want to talk pizza? We're all
            ears.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-32">
          {[
            {
              title: "General Inquiries",
              info: "hello@pizzaparadise.com",
              icon: Mail,
              color: "var(--primary)",
            },
            {
              title: "Phone Fitzrovia",
              info: "020 7580 9562",
              icon: Phone,
              color: "var(--secondary)",
            },
            {
              title: "Head Office",
              info: "46 Goodge St, London",
              icon: Globe,
              color: "var(--text-heading)",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              style={cardStyle}
              className="text-center"
            >
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8"
                style={{ background: `${item.color}10`, color: item.color }}
              >
                <item.icon size={32} />
              </div>
              <h3 className="text-xl font-black mb-4 uppercase">
                {item.title}
              </h3>
              <p className="text-[18px] font-bold opacity-60">{item.info}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div style={cardStyle} className="space-y-12">
            <h2 className="text-4xl font-black uppercase">Send a Message</h2>
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black tracking-widest opacity-40 uppercase">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    style={inputStyle}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black tracking-widest opacity-40 uppercase">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    style={inputStyle}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black tracking-widest opacity-40 uppercase">
                  Subject
                </label>
                <select style={inputStyle}>
                  <option>General Feedback</option>
                  <option>Order Issue</option>
                  <option>Catering Inquiry</option>
                  <option>Careers</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black tracking-widest opacity-40 uppercase">
                  Your Message
                </label>
                <textarea
                  placeholder="Tell us everything..."
                  rows={6}
                  style={{ ...inputStyle, resize: "none" }}
                />
              </div>

              <button className="w-full btn-primary py-6 text-xl flex items-center justify-center gap-4 shadow-xl">
                SEND MESSAGE <Send size={24} />
              </button>
            </form>
          </div>

          <div className="space-y-12">
            <div style={cardStyle} className="space-y-8">
              <h3 className="text-2xl font-black uppercase">FAQ</h3>
              <div className="space-y-8">
                {[
                  "Do you take table reservations?",
                  "Can I order for a large party or catering?",
                  "Where do you source your ingredients?",
                  "Are there gluten-free dough options?",
                ].map((q, i) => (
                  <div
                    key={i}
                    className="pb-6 border-b border-border last:border-0"
                  >
                    <p className="font-black text-sm uppercase mb-3 hover:text-primary cursor-pointer transition-colors">
                      {q}
                    </p>
                    <p className="text-sm opacity-60 font-medium">
                      Please contact our Fitzrovia branch for specific inquiries
                      regarding reservations and larger party bookings.
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[40px] overflow-hidden grayscale contrast-125 border border-border h-[400px] relative">
              {/* Google Maps Embed Placeholder - using ICCO Fitzrovia address */}
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=46%20Goodge%20St,%20London%20W1T%204LU+(Pizza%20Paradise)&t=&z=16&ie=UTF8&iwloc=B&output=embed"
              />
              <div className="absolute top-8 left-8 bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-2xl border border-border">
                <p className="text-xs font-black uppercase tracking-widest">
                  Find Us Here
                </p>
                <p className="text-[10px] opacity-60 font-bold">
                  46 Goodge Street, Fitzrovia
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
