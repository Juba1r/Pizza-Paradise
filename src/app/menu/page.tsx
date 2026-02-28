"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  ShoppingBag,
  X,
  Star,
  Plus,
  Minus,
  ChevronDown,
  Check,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchPizzas,
  selectPizzas,
  selectPizzasLoading,
} from "@/store/slices/menuSlice";
import {
  setActiveCategory,
  setSearchQuery,
  selectActiveCategory,
  selectSearchQuery,
} from "@/store/slices/uiSlice";
import { addItem } from "@/store/slices/cartSlice";
import { PizzaCard } from "@/components/menu/PizzaCard";
import { formatCurrency, calculatePizzaPrice } from "@/lib/utils";
import toast from "react-hot-toast";
import Image from "next/image";

const categories = [
  { label: "ALL", value: "ALL" },
  { label: "SPECIALTY", value: "SPECIALTY" },
  { label: "VEGETARIAN", value: "VEGETARIAN" },
  { label: "NON-VEG", value: "NON-VEG" },
  { label: "VEGAN", value: "VEGAN" },
];

export default function MenuPage() {
  const dispatch = useAppDispatch();
  const pizzas = useAppSelector(selectPizzas);
  const loading = useAppSelector(selectPizzasLoading);
  const activeCategory = useAppSelector(selectActiveCategory);
  const searchQuery = useAppSelector(selectSearchQuery);

  const [selectedPizza, setSelectedPizza] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState("MEDIUM");
  const [quantity, setQuantity] = useState(1);
  const [sortOption, setSortOption] = useState("POPULAR");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const sortOptions = [
    { label: "POPULAR", value: "POPULAR" },
    { label: "PRICE: LOW TO HIGH", value: "PRICE_LOW" },
    { label: "PRICE: HIGH TO LOW", value: "PRICE_HIGH" },
    { label: "HIGHEST RATED", value: "RATING" },
  ];

  const currentSortLabel =
    sortOptions.find((opt) => opt.value === sortOption)?.label || "POPULAR";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sortedPizzas = [...pizzas].sort((a, b) => {
    switch (sortOption) {
      case "PRICE_LOW":
        return a.price - b.price;
      case "PRICE_HIGH":
        return b.price - a.price;
      case "RATING":
        return b.rating - a.rating;
      case "POPULAR":
      default:
        return a.featured === b.featured ? 0 : a.featured ? -1 : 1;
    }
  });

  useEffect(() => {
    dispatch(fetchPizzas());
  }, [dispatch]);

  const quickAdd = (pizza: any, e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(
      addItem({
        id: `${pizza.id}-MEDIUM`,
        pizzaId: pizza.id,
        name: pizza.name,
        price: pizza.price,
        basePrice: pizza.price,
        size: "MEDIUM",
        quantity: 1,
        imageUrl: pizza.imageUrl,
        toppings: [],
      }),
    );
    toast.success(`Added ${pizza.name} to cart! 🍕`);
  };

  const handleAddToCart = () => {
    const price = calculatePizzaPrice(selectedPizza.price, selectedSize);
    dispatch(
      addItem({
        id: `${selectedPizza.id}-${selectedSize}`,
        pizzaId: selectedPizza.id,
        name: selectedPizza.name,
        price: price,
        basePrice: selectedPizza.price,
        size: selectedSize,
        quantity: quantity,
        imageUrl: selectedPizza.imageUrl,
        toppings: [],
      }),
    );
    toast.success("Added to your slice of heaven! ✨");
    setSelectedPizza(null);
  };

  return (
    <div
      className="min-h-screen pb-32"
      style={{ background: "var(--bg-body)", paddingTop: "180px" }}
    >
      <div className="page-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-32 flex flex-col items-center"
        >
          <span className="section-tag mb-8 mx-auto inline-block">
            ARTiSAN PiZZAS
          </span>
          <h1 className="text-6xl md:text-[5.5rem] font-black leading-[0.9] mb-12 uppercase tracking-tighter text-center">
            THE <span style={{ color: "var(--primary)" }}>MENU</span>
          </h1>
          <p className="text-xl max-w-2xl mx-auto font-medium leading-relaxed opacity-70 text-center">
            Legendary stone-baked artisan pizzas created with London's tastes in
            mind. Crafted since 1999.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="relative z-40 mb-16 sm:mb-24 px-6 py-8 sm:px-10 sm:py-10 rounded-[30px] sm:rounded-[40px] border border-border bg-elevated/50 backdrop-blur-sm overflow-visible">
          <div className="flex flex-col gap-8 items-center justify-center">
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 w-full">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => dispatch(setActiveCategory(cat.value))}
                  className={`shrink-0 px-6 py-3 sm:px-8 sm:py-4 rounded-full font-black text-[10px] sm:text-[12px] tracking-widest transition-all ${
                    activeCategory === cat.value
                      ? "scale-105 shadow-[0_10px_20px_rgba(227,30,36,0.3)]"
                      : "hover:scale-105 hover:shadow-md opacity-60 hover:opacity-100"
                  }`}
                  style={{
                    background:
                      activeCategory === cat.value
                        ? "var(--primary)"
                        : "var(--bg-elevated)",
                    color:
                      activeCategory === cat.value
                        ? "white"
                        : "var(--text-heading)",
                    border:
                      "1px solid " +
                      (activeCategory === cat.value
                        ? "var(--primary)"
                        : "var(--border)"),
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center lg:max-w-4xl">
              <div
                className="flex items-center w-full group rounded-2xl border-2 border-transparent focus-within:border-primary transition-all shadow-sm hover:bg-elevated focus-within:bg-elevated h-[60px]"
                style={{ background: "var(--bg-card)" }}
              >
                <Search
                  className="ml-6 text-muted group-focus-within:text-primary transition-all shrink-0"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search pizzas..."
                  value={searchQuery}
                  onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                  className="w-full h-full px-4 bg-transparent outline-none font-bold text-sm tracking-wide"
                />
              </div>

              <div className="relative w-full sm:w-72 lg:w-80" ref={sortRef}>
                <button
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="flex items-center w-full group rounded-2xl border-2 border-transparent hover:border-primary/50 focus-within:border-primary transition-all shadow-sm h-[60px] px-6 gap-4 cursor-pointer"
                  style={{ background: "var(--bg-card)" }}
                >
                  <SlidersHorizontal
                    className={`transition-all ${isSortOpen ? "text-primary" : "text-muted"} group-hover:text-primary shrink-0`}
                    size={20}
                  />
                  <span className="flex-1 text-left font-black text-[11px] sm:text-xs tracking-[0.15em] uppercase truncate">
                    {currentSortLabel}
                  </span>
                  <motion.div
                    animate={{ rotate: isSortOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`${isSortOpen ? "text-primary" : "text-muted"} group-hover:text-primary`}
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isSortOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 15, scale: 0.95 }}
                      className="absolute top-full left-0 right-0 mt-4 p-2.5 z-[100] rounded-3xl border border-border shadow-2xl overflow-hidden backdrop-blur-3xl"
                      style={{
                        background: "var(--bg-nav)",
                      }}
                    >
                      <div className="flex flex-col gap-1.5">
                        {sortOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => {
                              setSortOption(option.value);
                              setIsSortOpen(false);
                            }}
                            className={`flex items-center justify-between w-full pl-12 pr-6 py-4 rounded-2xl font-black text-[11px] tracking-[0.1em] text-left transition-all duration-300 ${
                              sortOption === option.value
                                ? "bg-primary text-white shadow-[0_8px_20px_rgba(227,30,36,0.4)]"
                                : "hover:bg-elevated text-muted hover:text-heading"
                            }`}
                          >
                            <span>{option.label}</span>
                            {sortOption === option.value && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", damping: 12 }}
                              >
                                <Check
                                  size={16}
                                  className="shrink-0"
                                  strokeWidth={3}
                                />
                              </motion.div>
                            )}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="pizza-grid">
          <AnimatePresence mode="popLayout">
            {loading
              ? [...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse rounded-[40px] h-[600px]"
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border)",
                    }}
                  />
                ))
              : sortedPizzas.map((pizza, i) => (
                  <PizzaCard
                    key={pizza.id}
                    pizza={pizza}
                    i={i}
                    onClick={() => {
                      setSelectedPizza(pizza);
                      setSelectedSize("MEDIUM");
                      setQuantity(1);
                    }}
                    onQuickAdd={quickAdd}
                  />
                ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {!loading && pizzas.length === 0 && (
          <div className="text-center py-48">
            <div
              className="w-32 h-32 rounded-[40px] flex items-center justify-center mx-auto mb-10"
              style={{ background: "var(--bg-elevated)" }}
            >
              <Search size={52} style={{ color: "var(--text-faint)" }} />
            </div>
            <h3 className="text-4xl font-black mb-6 uppercase">
              NO MATCHES FOUND
            </h3>
            <p className="text-lg font-medium mb-12 opacity-60">
              Try adjusting your filters or search query.
            </p>
            <button
              onClick={() => {
                dispatch(setActiveCategory("ALL"));
                dispatch(setSearchQuery(""));
              }}
              className="btn-primary"
            >
              CLEAR FILTERS
            </button>
          </div>
        )}
      </div>

      {/* Modal - Enhanced for zero overlap */}
      <AnimatePresence>
        {selectedPizza && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 lg:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPizza(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />

            <button
              onClick={() => setSelectedPizza(null)}
              className="fixed top-4 right-4 sm:top-6 sm:right-6 lg:top-10 lg:right-10 z-[210] w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-all backdrop-blur-md shadow-2xl border border-white/20"
            >
              <X size={24} className="sm:w-8 sm:h-8" />
            </button>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="relative w-full max-w-6xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto rounded-[30px] sm:rounded-[40px] lg:rounded-[60px] shadow-2xl flex flex-col lg:flex-row"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
              }}
            >
              <div className="lg:w-1/2 relative h-[250px] sm:h-[400px] lg:h-auto overflow-hidden shrink-0">
                <Image
                  src={selectedPizza.imageUrl || "/images/pizzas/default.jpg"}
                  alt={selectedPizza.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              <div className="lg:w-1/2 p-6 sm:p-10 lg:p-20 flex flex-col justify-between gap-8 lg:gap-12">
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <span className="badge badge-red uppercase tracking-widest text-[11px]">
                      Best Choice
                    </span>
                    <div className="flex items-center gap-2 py-2 px-4 rounded-xl bg-elevated font-black text-sm">
                      <Star
                        size={16}
                        className="text-yellow-400 fill-yellow-400"
                      />{" "}
                      {selectedPizza.rating}
                    </div>
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 leading-tight uppercase">
                    {selectedPizza.name}
                  </h2>
                  <p className="text-base sm:text-lg lg:text-xl font-medium leading-relaxed opacity-70">
                    {selectedPizza.description}
                  </p>
                </div>

                <div className="space-y-4 sm:space-y-8">
                  <h4 className="text-xs sm:text-sm font-black tracking-[0.2em] opacity-40 uppercase">
                    Select Size
                  </h4>
                  <div className="grid grid-cols-3 gap-3 sm:gap-6">
                    {["SMALL", "MEDIUM", "LARGE"].map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className="py-4 sm:py-6 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm transition-all border shadow-sm"
                        style={{
                          background:
                            selectedSize === size
                              ? "var(--primary)"
                              : "var(--bg-elevated)",
                          color:
                            selectedSize === size
                              ? "white"
                              : "var(--text-heading)",
                          borderColor:
                            selectedSize === size
                              ? "var(--primary)"
                              : "var(--border)",
                        }}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div
                  className="flex items-center justify-between py-8 sm:py-12"
                  style={{
                    borderTop: "1px solid var(--border)",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-elevated flex items-center justify-center hover:bg-border transition-all"
                    >
                      <Minus size={20} className="sm:w-6 sm:h-6" />
                    </button>
                    <span className="text-2xl sm:text-3xl font-black">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-elevated flex items-center justify-center hover:bg-border transition-all"
                    >
                      <Plus size={20} className="sm:w-6 sm:h-6" />
                    </button>
                  </div>
                  <div
                    className="text-right text-3xl sm:text-4xl lg:text-5xl font-black text-primary"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {formatCurrency(
                      calculatePizzaPrice(selectedPizza.price, selectedSize) *
                        quantity,
                    )}
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full btn-primary py-5 sm:py-8 text-lg sm:text-2xl flex items-center justify-center gap-4 sm:gap-6 shadow-2xl"
                >
                  ADD TO BASKET{" "}
                  <ShoppingBag size={24} className="sm:w-7 sm:h-7" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
