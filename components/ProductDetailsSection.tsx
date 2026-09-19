import React from "react";
import { motion } from "motion/react";
import { ProductData } from "../data/products";

interface ProductDetailsSectionProps {
  product: ProductData;
  nextProduct: ProductData;
  onOrderClick: () => void;
  onNextFlavorClick: () => void;
  onSelectFlavor: (index: number) => void;
  allProducts: ProductData[];
  currentIndex: number;
}

export const ProductDetailsSection: React.FC<ProductDetailsSectionProps> = ({
  product,
  nextProduct,
  onOrderClick,
  onNextFlavorClick,
  onSelectFlavor,
  allProducts,
  currentIndex,
}) => {
  return (
    <div id="product-details-area" className="relative z-20 bg-[#0A0A0A] text-white">
      {/* 1. Primary Product Overview & Specifications */}
      <section id="product-formula" className="py-24 sm:py-32 border-t border-white/10 relative overflow-hidden">
        {/* Subtle background glow */}
        <div
          className="pointer-events-none absolute -top-40 right-0 w-[500px] h-[500px] rounded-full blur-[140px] opacity-15"
          style={{ backgroundColor: product.accentColor }}
        />

        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          {/* Header Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="w-2.5 h-2.5 rounded-full animate-pulse"
                  style={{ backgroundColor: product.accentColor }}
                />
                <span
                  className="text-xs font-bold uppercase tracking-[0.3em]"
                  style={{ color: product.accentColor }}
                >
                  {product.flavor}
                </span>
              </div>

              <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-6 leading-none">
                {product.name}
              </h2>

              <p className="text-lg sm:text-xl text-neutral-300 font-light leading-relaxed max-w-2xl">
                {product.description}
              </p>
            </div>

            {/* Price & Purchase Action Card */}
            <div className="lg:col-span-5 p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <span className="text-3xl font-black text-white font-mono tracking-tight">
                    {product.price}
                  </span>
                  <span className="text-xs text-neutral-400 block mt-0.5">
                    {product.packSize}
                  </span>
                </div>

                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-white/10 text-white border border-white/15">
                  Free Cold Shipping
                </span>
              </div>

              <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
                Direct harvest formulation. Refrigerated cold-chain delivery guarantees 100% active terpene potency.
              </p>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={onOrderClick}
                  className="w-full py-4 rounded-full text-xs font-extrabold uppercase tracking-[0.22em] text-white transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  style={{
                    backgroundColor: "#FF3B3B",
                    boxShadow: "0 0 30px rgba(255, 59, 59, 0.4)",
                  }}
                >
                  Buy Now — {product.price}
                </button>

                <div className="flex items-center justify-center gap-6 pt-2 text-[11px] text-neutral-400">
                  <span className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 16 16" fill="currentColor">
                      <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                    </svg>
                    In Stock
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 16 16" fill="currentColor">
                      <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                    </svg>
                    Ships Tomorrow
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Full Specification Matrix */}
          <div className="pt-12 border-t border-white/10">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-400 mb-8">
              Clinical Botanical Architecture
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {product.specs.map((item, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-colors"
                >
                  <span className="text-xs uppercase tracking-wider text-neutral-400 block mb-2 font-medium">
                    {item.label}
                  </span>
                  <div className="text-lg font-bold text-white mb-1 leading-snug">
                    {item.value}
                  </div>
                  {item.subtext && (
                    <div className="text-xs text-neutral-400 font-light">
                      {item.subtext}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 3. Tasting Notes & The Ritual */}
          <div id="product-ritual" className="mt-20 pt-16 border-t border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-400 mb-4">
                Sensory Tasting Notes
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {product.tastingNotes.map((note, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase border border-white/15 bg-white/[0.03] text-neutral-200"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-400 mb-4">
                The Activation Ritual
              </h3>
              <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed bg-white/[0.02] p-6 rounded-2xl border border-white/10">
                {product.ritual}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Flavor Comparison Matrix / All Flavors */}
      <section id="flavor-matrix" className="py-24 border-t border-white/10 bg-[#070707]">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#FF3B3B] block mb-2">
              THE FULL TRINITY
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
              Select Your Resonance
            </h2>
            <p className="text-sm text-neutral-400 font-light">
              Each FREQUENCY formulation is engineered for specific neurological and physical states.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {allProducts.map((p, idx) => {
              const isActive = idx === currentIndex;
              return (
                <div
                  key={p.id}
                  className={`p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
                    isActive
                      ? "border-white/30 bg-white/[0.06] shadow-2xl"
                      : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                  }`}
                  style={{
                    boxShadow: isActive ? `0 0 35px ${p.glowColor}` : "none",
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="text-xs font-black uppercase tracking-[0.25em]"
                        style={{ color: p.accentColor }}
                      >
                        {p.shortName}
                      </span>
                      {isActive && (
                        <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest bg-[#FF3B3B] text-white">
                          ACTIVE CAN
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-2">
                      {p.name}
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed mb-6 font-light">
                      {p.description}
                    </p>

                    <div className="space-y-2 pt-4 border-t border-white/10 text-xs text-neutral-300 mb-6">
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Target State:</span>
                        <span className="font-semibold text-white">{p.tagline}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Key Bio-Active:</span>
                        <span className="font-semibold text-white">
                          {p.specs[1]?.value.split("+")[0] || "Adaptogenic"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onSelectFlavor(idx);
                      const container = document.getElementById("product-scroll-container");
                      if (container) {
                        container.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className={`w-full py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                      isActive
                        ? "bg-white text-black hover:bg-neutral-200"
                        : "border border-white/20 text-white hover:bg-white/10"
                    }`}
                  >
                    {isActive ? "Viewing Now" : `Switch to ${p.shortName}`}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Cinematic NEXT FLAVOR CTA (Framer Motion whileInView) */}
      <section className="py-32 sm:py-40 relative overflow-hidden border-t border-white/10">
        <div
          className="absolute inset-0 opacity-20 transition-all duration-1000 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${nextProduct.glowColor} 0%, transparent 70%)`,
          }}
        />

        <div className="max-w-5xl mx-auto px-6 sm:px-12 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.35em] text-neutral-400 block mb-4">
              NEXT ARCHITECTURE IN SEQUENCE
            </span>

            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white mb-6 leading-none">
              Explore {nextProduct.name}
            </h2>

            <p className="text-base sm:text-lg text-neutral-300 max-w-xl mx-auto font-light leading-relaxed mb-10">
              {nextProduct.tagline} — {nextProduct.flavor}. Tap below to rotate into the next vibrational frequency.
            </p>

            <motion.button
              type="button"
              onClick={onNextFlavorClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 rounded-full text-xs sm:text-sm font-black uppercase tracking-[0.25em] text-white shadow-2xl transition-all cursor-pointer inline-flex items-center gap-3"
              style={{
                backgroundColor: nextProduct.accentColor,
                color: "#FFFFFF",
                boxShadow: `0 0 45px ${nextProduct.glowColor}`,
              }}
            >
              <span>Transition to {nextProduct.shortName}</span>
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                <path d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
