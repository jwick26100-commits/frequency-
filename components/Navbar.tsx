import React, { useState, useEffect } from "react";
import { ProductData } from "../data/products";

interface NavbarProps {
  currentProduct: ProductData;
  onOpenOrderModal: () => void;
  onSelectFlavor: (index: number) => void;
  currentIndex: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentProduct,
  onOpenOrderModal,
  onSelectFlavor,
  currentIndex,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0A0A0A]/85 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-2xl shadow-black/40"
          : "bg-gradient-to-b from-[#0A0A0A]/80 via-[#0A0A0A]/30 to-transparent backdrop-blur-xs py-5 border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        {/* Original FREQUENCY Brand Logo Asset */}
        <a
          href="#"
          className="group flex items-center select-none outline-none focus-visible:ring-2 focus-visible:ring-[#FF3B3B] rounded-sm transition-opacity duration-300 hover:opacity-90"
          aria-label="FREQUENCY Home"
        >
          <img
            src="/images/frequency-logo.svg"
            alt="FREQUENCY"
            className="h-8 sm:h-9 md:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            referrerPolicy="no-referrer"
          />
        </a>

        {/* Center Quick Navigation (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-300" aria-label="Main Navigation">
          <button
            type="button"
            onClick={() => scrollToSection("product-scroll-container")}
            className="hover:text-white transition-colors duration-200 outline-none focus-visible:text-[#FF3B3B]"
          >
            Experience
          </button>
          <button
            type="button"
            onClick={() => scrollToSection("flavor-matrix")}
            className="hover:text-white transition-colors duration-200 outline-none focus-visible:text-[#FF3B3B]"
          >
            Flavors
          </button>
          <button
            type="button"
            onClick={() => scrollToSection("product-formula")}
            className="hover:text-white transition-colors duration-200 outline-none focus-visible:text-[#FF3B3B]"
          >
            Bio-Formula
          </button>
          <button
            type="button"
            onClick={() => scrollToSection("product-ritual")}
            className="hover:text-white transition-colors duration-200 outline-none focus-visible:text-[#FF3B3B]"
          >
            The Ritual
          </button>
        </nav>

        {/* Right side CTA & Active Indicator */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[11px] uppercase tracking-wider text-neutral-300">
            <span
              className="w-2 h-2 rounded-full transition-colors duration-500 animate-pulse"
              style={{ backgroundColor: currentProduct.accentColor }}
            />
            <span>{currentProduct.shortName}</span>
          </div>

          <button
            id="nav-order-cta"
            type="button"
            onClick={onOpenOrderModal}
            className="relative group overflow-hidden px-5 sm:px-6 py-2.5 rounded-full text-xs font-bold tracking-[0.18em] uppercase transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3B3B]"
            style={{
              backgroundColor: "#FF3B3B",
              color: "#FFFFFF",
              boxShadow: "0 0 20px rgba(255, 59, 59, 0.35)",
            }}
          >
            <span className="relative z-10 flex items-center gap-1.5">
              Order Now
              <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
                <path d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-neutral-300 hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A0A0A]/95 border-b border-white/10 px-6 py-6 backdrop-blur-2xl animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-4 text-sm font-semibold tracking-wider uppercase text-neutral-300">
            <button
              type="button"
              onClick={() => scrollToSection("product-scroll-container")}
              className="text-left py-2 hover:text-white"
            >
              Experience
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("flavor-matrix")}
              className="text-left py-2 hover:text-white"
            >
              Flavors
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("product-formula")}
              className="text-left py-2 hover:text-white"
            >
              Bio-Formula
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("product-ritual")}
              className="text-left py-2 hover:text-white"
            >
              The Ritual
            </button>

            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <span className="text-xs tracking-widest text-neutral-400">Switch Flavor</span>
              <div className="grid grid-cols-3 gap-2">
                {["Mango", "Chocolate", "Pomegranate"].map((flavor, idx) => (
                  <button
                    key={flavor}
                    type="button"
                    onClick={() => {
                      onSelectFlavor(idx);
                      setMobileMenuOpen(false);
                    }}
                    className={`py-2 px-1 text-center text-xs font-bold rounded-md border transition-colors ${
                      currentIndex === idx
                        ? "border-[#FF3B3B] bg-[#FF3B3B]/10 text-white"
                        : "border-white/10 bg-white/[0.02] text-neutral-400 hover:text-white"
                    }`}
                  >
                    {flavor}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
