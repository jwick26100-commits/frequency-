import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ProductData } from "../data/products";

interface ProductTextOverlaysProps {
  progress: number;
  product: ProductData;
  onOrderClick: () => void;
}

/**
 * Calculates smooth opacity, translate, scale and blur based on normalized progress
 * within a given [start, peakIn, peakOut, end] window.
 */
function getSectionTransform(
  p: number,
  start: number,
  peakIn: number,
  peakOut: number,
  end: number
) {
  if (p < start || p > end) {
    return { opacity: 0, y: 35, scale: 0.96, blur: 8, active: false };
  }

  let opacity = 0;
  let y = 0;
  let scale = 1;
  let blur = 0;

  if (p >= start && p < peakIn) {
    const t = (p - start) / (peakIn - start);
    opacity = t;
    y = (1 - t) * 35;
    scale = 0.96 + t * 0.04;
    blur = (1 - t) * 8;
  } else if (p >= peakIn && p <= peakOut) {
    opacity = 1;
    y = 0;
    scale = 1;
    blur = 0;
  } else if (p > peakOut && p <= end) {
    const t = (p - peakOut) / (end - peakOut);
    opacity = 1 - t;
    y = -t * 35;
    scale = 1 + t * 0.03;
    blur = t * 8;
  }

  return { opacity, y, scale, blur, active: opacity > 0.02 };
}

export const ProductTextOverlays: React.FC<ProductTextOverlaysProps> = ({
  progress,
  product,
  onOrderClick,
}) => {
  // Section 1: 0.00 -> 0.18
  const s1 = getSectionTransform(progress, 0.0, 0.04, 0.12, 0.18);
  // Section 2: 0.18 -> 0.42
  const s2 = getSectionTransform(progress, 0.18, 0.24, 0.34, 0.42);
  // Section 3: 0.42 -> 0.68
  const s3 = getSectionTransform(progress, 0.42, 0.48, 0.60, 0.68);
  // Section 4: 0.68 -> 0.90
  const s4 = getSectionTransform(progress, 0.68, 0.74, 0.84, 0.90);

  const sec1 = product.sections[0];
  const sec2 = product.sections[1];
  const sec3 = product.sections[2];
  const sec4 = product.sections[3];

  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-center select-none overflow-hidden">
      {/* SECTION 1: 0.00 -> 0.18 (Hero cinematic statement) */}
      {s1.active && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-start pt-24 sm:pt-28 md:pt-32 text-center px-4 max-w-4xl mx-auto transition-transform duration-75"
          style={{
            opacity: s1.opacity,
            transform: `translateY(${s1.y}px) scale(${s1.scale})`,
            filter: `blur(${s1.blur}px)`,
          }}
        >
          {sec1.badge && (
            <div className="mb-3 sm:mb-4 px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase border border-white/15 bg-white/5 backdrop-blur-md text-neutral-300">
              {sec1.badge}
            </div>
          )}

          <span
            className="text-xs sm:text-sm font-bold uppercase tracking-[0.35em] mb-2"
            style={{ color: product.accentColor }}
          >
            {sec1.eyebrow}
          </span>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-[0.08em] leading-tight text-white drop-shadow-2xl">
            {sec1.title}
          </h1>

          <p className="mt-3 sm:mt-5 text-sm sm:text-base md:text-lg text-neutral-300 max-w-xl font-normal leading-relaxed">
            {sec1.description}
          </p>

          <div className="mt-6 flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-neutral-400">
            <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-ping" />
            Scroll to decompose botanical matrix
          </div>
        </div>
      )}

      {/* SECTION 2: 0.18 -> 0.42 (Left-aligned origin & terroir) */}
      {s2.active && (
        <div
          className="absolute inset-y-0 left-0 flex items-center w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-16 transition-transform duration-75"
          style={{
            opacity: s2.opacity,
            transform: `translateY(${s2.y}px) scale(${s2.scale})`,
            filter: `blur(${s2.blur}px)`,
          }}
        >
          <div className="max-w-md sm:max-w-lg bg-black/40 md:bg-transparent backdrop-blur-md md:backdrop-blur-none p-6 md:p-0 rounded-2xl border border-white/10 md:border-none">
            <div className="flex items-center gap-3 mb-3">
              <span
                className="w-8 h-[2px]"
                style={{ backgroundColor: product.accentColor }}
              />
              <span
                className="text-xs font-bold uppercase tracking-[0.3em]"
                style={{ color: product.accentColor }}
              >
                {sec2.eyebrow}
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-[0.06em] leading-tight text-white mb-4 drop-shadow-lg">
              {sec2.title}
            </h2>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light mb-6">
              {sec2.description}
            </p>

            {sec2.stat && (
              <div className="inline-flex items-baseline gap-3 pt-3 border-t border-white/15">
                <span
                  className="text-3xl sm:text-4xl font-black tracking-tight"
                  style={{ color: product.accentColor }}
                >
                  {sec2.stat.value}
                </span>
                <span className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium">
                  {sec2.stat.label}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SECTION 3: 0.42 -> 0.68 (Right-aligned neuro-harmonic matrix) */}
      {s3.active && (
        <div
          className="absolute inset-y-0 right-0 flex items-center justify-end w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-16 transition-transform duration-75"
          style={{
            opacity: s3.opacity,
            transform: `translateY(${s3.y}px) scale(${s3.scale})`,
            filter: `blur(${s3.blur}px)`,
          }}
        >
          <div className="max-w-md sm:max-w-lg text-left md:text-right bg-black/40 md:bg-transparent backdrop-blur-md md:backdrop-blur-none p-6 md:p-0 rounded-2xl border border-white/10 md:border-none">
            <div className="flex items-center gap-3 mb-3 md:justify-end">
              <span
                className="text-xs font-bold uppercase tracking-[0.3em]"
                style={{ color: product.accentColor }}
              >
                {sec3.eyebrow}
              </span>
              <span
                className="w-8 h-[2px]"
                style={{ backgroundColor: product.accentColor }}
              />
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-[0.06em] leading-tight text-white mb-4 drop-shadow-lg">
              {sec3.title}
            </h2>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light mb-6">
              {sec3.description}
            </p>

            {sec3.stat && (
              <div className="inline-flex items-baseline gap-3 pt-3 border-t border-white/15 md:justify-end">
                <span
                  className="text-3xl sm:text-4xl font-black tracking-tight"
                  style={{ color: product.accentColor }}
                >
                  {sec3.stat.value}
                </span>
                <span className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium">
                  {sec3.stat.label}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SECTION 4: 0.68 -> 0.90 (Climactic finale & CTA) */}
      {s4.active && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 max-w-3xl mx-auto transition-transform duration-75"
          style={{
            opacity: s4.opacity,
            transform: `translateY(${s4.y}px) scale(${s4.scale})`,
            filter: `blur(${s4.blur}px)`,
          }}
        >
          {sec4.badge && (
            <div className="mb-4 px-3.5 py-1 rounded-full text-xs font-bold tracking-[0.28em] uppercase border border-white/20 bg-white/5 backdrop-blur-md text-white">
              {sec4.badge}
            </div>
          )}

          <span
            className="text-xs sm:text-sm font-bold uppercase tracking-[0.35em] mb-2"
            style={{ color: product.accentColor }}
          >
            {sec4.eyebrow}
          </span>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-[0.08em] leading-tight text-white mb-4 drop-shadow-2xl">
            {sec4.title}
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-neutral-300 max-w-lg font-light leading-relaxed mb-8">
            {sec4.description}
          </p>

          <div className="pointer-events-auto flex flex-col sm:flex-row items-center gap-4">
            <button
              type="button"
              onClick={onOrderClick}
              className="px-8 py-3.5 rounded-full font-extrabold text-xs uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer shadow-2xl hover:scale-105 active:scale-95"
              style={{
                backgroundColor: "#FF3B3B",
                color: "#FFFFFF",
                boxShadow: "0 0 35px rgba(255, 59, 59, 0.45)",
              }}
            >
              Order {product.shortName} — {product.price}
            </button>

            <a
              href="#product-formula"
              className="px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-[0.18em] border border-white/20 text-white hover:bg-white/10 transition-colors"
            >
              Explore Formula
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
