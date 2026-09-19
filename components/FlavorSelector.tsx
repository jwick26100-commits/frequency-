import React from "react";
import { ProductData } from "../data/products";

interface FlavorSelectorProps {
  products: ProductData[];
  currentIndex: number;
  onSelect: (index: number) => void;
}

export const FlavorSelector: React.FC<FlavorSelectorProps> = ({
  products,
  currentIndex,
  onSelect,
}) => {
  const handlePrev = () => {
    onSelect((currentIndex - 1 + products.length) % products.length);
  };

  const handleNext = () => {
    onSelect((currentIndex + 1) % products.length);
  };

  const activeProduct = products[currentIndex];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 sm:gap-3 px-3 py-2 rounded-full bg-black/70 border border-white/15 backdrop-blur-xl shadow-2xl shadow-black/80 select-none">
      {/* Previous Arrow */}
      <button
        type="button"
        onClick={handlePrev}
        className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
        aria-label="Previous flavor"
      >
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
          <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Flavor Pills */}
      <div className="flex items-center gap-1 sm:gap-2">
        {products.map((p, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => onSelect(idx)}
              className={`relative px-3.5 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-black tracking-[0.22em] uppercase transition-all duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-white ${
                isActive
                  ? "text-white shadow-lg"
                  : "text-neutral-400 hover:text-neutral-200 hover:bg-white/5"
              }`}
              style={{
                backgroundColor: isActive ? "rgba(255, 255, 255, 0.12)" : "transparent",
              }}
            >
              {p.shortName}

              {/* Active glow underline/indicator */}
              {isActive && (
                <span
                  className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: activeProduct.accentColor,
                    boxShadow: `0 0 8px ${activeProduct.accentColor}`,
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Next Arrow */}
      <button
        type="button"
        onClick={handleNext}
        className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
        aria-label="Next flavor"
      >
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
          <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
};
