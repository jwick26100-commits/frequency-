import React, { useEffect, useRef, useState, useCallback } from "react";
import { ProductData } from "../data/products";
import { ProductTextOverlays } from "./ProductTextOverlays";

interface ProductBottleScrollProps {
  product: ProductData;
  onOrderClick: () => void;
}

export const ProductBottleScroll: React.FC<ProductBottleScrollProps> = ({
  product,
  onOrderClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // References for image preloading and rendering without causing React re-renders
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);
  const scrollProgressRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);
  const hasValidImagesRef = useRef<boolean>(false);

  // Minimal state for UI indicators & overlays
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [loadPercent, setLoadPercent] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  const [manualScrub, setManualScrub] = useState<number>(0);

  const [missingFrameCount, setMissingFrameCount] = useState<number>(0);

  // Check reduced motion preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }
  }, []);

  /**
   * Finds the closest loaded frame for targetIndex to prevent flicker during load
   */
  const getBestAvailableFrame = useCallback((targetIndex: number): HTMLImageElement | null => {
    const images = imagesRef.current;
    if (!images || images.length === 0) return null;

    const target = Math.max(0, Math.min(images.length - 1, targetIndex));

    if (images[target] && images[target].complete && images[target].naturalWidth > 0) {
      return images[target];
    }

    // Search outwards for closest loaded frame
    for (let offset = 1; offset < images.length; offset++) {
      const up = target + offset;
      if (up < images.length && images[up] && images[up].complete && images[up].naturalWidth > 0) {
        return images[up];
      }
      const down = target - offset;
      if (down >= 0 && images[down] && images[down].complete && images[down].naturalWidth > 0) {
        return images[down];
      }
    }

    return null;
  }, []);

  /**
   * Main Canvas render routine
   */
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear entire canvas
    ctx.clearRect(0, 0, width, height);

    const frameIdx = Math.round(currentFrameRef.current);
    const frameImg = getBestAvailableFrame(frameIdx);

    if (frameImg && frameImg.complete && frameImg.naturalWidth > 0) {
      // High-precision contain calculation
      const imgW = frameImg.naturalWidth;
      const imgH = frameImg.naturalHeight;
      const canvasRatio = width / height;

      const scaleX = width / imgW;
      const scaleY = height / imgH;

      // Responsive cover-style scaling:
      // 1. Reaches all the way to left and right edges (scale >= scaleX, so drawWidth >= width)
      // 2. Preserves proportional aspect ratio (no stretch or distortion)
      // 3. Desktop / Landscape (and square/tablet viewports): true cover (Math.max(scaleX, scaleY))
      //    fills the viewport completely with zero letterboxing margins
      // 4. Mobile / Portrait: fills 100% of the screen width and scales prominently so the product
      //    commands the screen without clipping vital bottle details
      let scale: number;
      if (canvasRatio >= 0.75) {
        // Desktop, laptop, tablet landscape & standard viewports
        scale = Math.max(scaleX, scaleY);
      } else {
        // Mobile portrait viewports
        const minWidthScale = scaleX;
        const prominentScale = (height * 0.65) / imgH;
        scale = Math.max(minWidthScale, Math.min(scaleY, Math.max(prominentScale, minWidthScale * 1.3)));
      }

      const drawWidth = imgW * scale;
      const drawHeight = imgH * scale;

      const offsetX = (width - drawWidth) / 2;
      const offsetY = (height - drawHeight) / 2;

      // Subtle atmospheric glow behind the bottle
      const glowGrad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        drawWidth * 0.1,
        width / 2,
        height / 2,
        drawWidth * 0.7
      );
      glowGrad.addColorStop(0, product.glowColor);
      glowGrad.addColorStop(1, "rgba(10, 10, 10, 0)");
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);

      // Render the high-resolution frame
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(frameImg, offsetX, offsetY, drawWidth, drawHeight);
    }
  }, [getBestAvailableFrame, product.glowColor]);

  // Preload frames for the current product (supports .jpg and .webp)
  useEffect(() => {
    setIsLoading(true);
    setLoadPercent(0);
    setMissingFrameCount(0);
    hasValidImagesRef.current = false;

    const total = product.totalFrames || 120;
    const startFrameNumber = product.startFrameNumber ?? 1;
    const loadedImages: HTMLImageElement[] = new Array(total);
    let loadedCount = 0;
    let missingCount = 0;

    for (let i = 0; i < total; i++) {
      const frameNumber = i + startFrameNumber;
      const paddedNum = String(frameNumber).padStart(3, "0");
      const baseFilename = `ezgif-frame-${paddedNum}`;
      const jpgPath = `${product.sequencePath}${baseFilename}.jpg`;
      const webpPath = `${product.sequencePath}${baseFilename}.webp`;

      // Determine primary file path:
      // Chocolate explicitly uses the WebP sequence (/images/chocolate/ezgif-frame-002.webp ... 121.webp)
      // Other products use their preferred format with automatic dual-format fallback (.webp <-> .jpg)
      const isChocolate = product.id === "chocolate";
      const primaryPath = isChocolate ? webpPath : jpgPath;
      const fallbackPath = isChocolate ? jpgPath : webpPath;

      const img = new Image();
      if (primaryPath.startsWith("http")) {
        img.crossOrigin = "anonymous";
      }

      img.onload = () => {
        loadedCount++;
        hasValidImagesRef.current = true;
        setLoadPercent(Math.round((loadedCount / total) * 100));
        if (loadedCount + missingCount >= total) {
          setIsLoading(false);
          if (missingCount === 0) {
            console.info(`[FREQUENCY Canvas] Successfully loaded all ${total} frames from ${product.sequencePath}`);
          }
        }
        renderCanvas();
      };

      img.onerror = () => {
        // Fallback to alternative format once if primary failed
        const primaryFilename = primaryPath.split("/").pop() || "";
        if (img.src.includes(primaryFilename)) {
          img.src = fallbackPath;
        } else {
          missingCount++;
          setMissingFrameCount((prev) => prev + 1);
          if (loadedCount + missingCount >= total) {
            setIsLoading(false);
          }
        }
      };

      img.src = primaryPath;
      loadedImages[i] = img;
    }

    imagesRef.current = loadedImages;

    return () => {
      loadedImages.forEach((img) => {
        if (img) {
          img.onload = null;
          img.onerror = null;
        }
      });
    };
  }, [product.id, product.sequencePath, product.totalFrames, product.startFrameNumber, renderCanvas]);

  // Handle Resize and DPR scaling
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;

    const w = rect.width > 0 ? rect.width : (typeof window !== "undefined" ? window.innerWidth : 1280);
    const h = rect.height > 0 ? rect.height : (typeof window !== "undefined" ? window.innerHeight : 720);

    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);

    renderCanvas();
  }, [renderCanvas]);

  useEffect(() => {
    handleResize();

    const canvas = canvasRef.current;
    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && canvas) {
      observer = new ResizeObserver(() => {
        handleResize();
      });
      observer.observe(canvas);
    }

    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      if (observer) observer.disconnect();
    };
  }, [handleResize]);

  // RequestAnimationFrame loop for frame smoothing
  useEffect(() => {
    let active = true;

    const loop = () => {
      if (!active) return;
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.01) {
        currentFrameRef.current = current + diff * 0.35;
        renderCanvas();
      } else if (current !== target) {
        currentFrameRef.current = target;
        renderCanvas();
      }

      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);

    return () => {
      active = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [renderCanvas]);

  // Handle Window Scroll to update scroll progress and frameIndex
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const container = containerRef.current;
        if (!container) {
          ticking = false;
          return;
        }

        const rect = container.getBoundingClientRect();
        const totalScrollable = rect.height - window.innerHeight;

        if (totalScrollable <= 0) {
          ticking = false;
          return;
        }

        // Progress from 0 to 1
        const rawProgress = -rect.top / totalScrollable;
        const clampedProgress = Math.min(1, Math.max(0, rawProgress));

        scrollProgressRef.current = clampedProgress;
        setScrollProgress(clampedProgress);

        // Map progress (0 -> 1) to frameIndex (0 -> 119)
        const totalFrames = product.totalFrames; // 120
        const frameIndex = Math.min(totalFrames - 1, Math.max(0, Math.floor(clampedProgress * totalFrames)));

        targetFrameRef.current = frameIndex;

        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initial sync

    return () => window.removeEventListener("scroll", onScroll);
  }, [product.totalFrames]);

  // Reduced motion scrub handler
  const handleReducedMotionScrub = (val: number) => {
    setManualScrub(val);
    const progress = val / 100;
    scrollProgressRef.current = progress;
    setScrollProgress(progress);
    const frameIndex = Math.min(product.totalFrames - 1, Math.max(0, Math.floor(progress * product.totalFrames)));
    targetFrameRef.current = frameIndex;
    currentFrameRef.current = frameIndex;
    renderCanvas();
  };

  return (
    <section
      id="product-scroll-container"
      ref={containerRef}
      className="relative w-full h-[500vh] bg-[#0A0A0A] selection:bg-none"
      style={{
        background: product.ambientBg,
      }}
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Subtle radial ambient atmosphere */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-1000"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${product.glowColor} 0%, transparent 65%)`,
          }}
        />

        {/* HTML5 Canvas Component */}
        <canvas
          id="product-bottle-canvas"
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block cursor-default z-10"
          style={{ touchAction: "pan-y" }}
          aria-label={`Interactive 360 cinematic animation of ${product.name}`}
        />

        {/* Cinematic Scroll-driven Text Overlays */}
        <ProductTextOverlays
          progress={scrollProgress}
          product={product}
          onOrderClick={onOrderClick}
        />

        {/* Subtle Frame Preloading & Buffer Status Pill */}
        {isLoading && (
          <div className="absolute top-20 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md text-[11px] font-medium tracking-wider text-neutral-300 transition-opacity duration-500">
            <span
              className="w-2 h-2 rounded-full animate-ping"
              style={{ backgroundColor: product.accentColor }}
            />
            <span>BUFFERING SEQUENCE {loadPercent}%</span>
          </div>
        )}

        {missingFrameCount > 0 && !isLoading && (
          <div className="absolute top-20 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-red-950/80 border border-red-500/30 backdrop-blur-md text-[11px] font-mono tracking-wider text-red-300 transition-opacity duration-500">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span>FRAMES MISSING ({missingFrameCount}/120 in {product.sequencePath})</span>
          </div>
        )}

        {/* Realtime Sequence Frame & Scroll Indicator (Bottom Left) */}
        <div className="hidden sm:flex flex-col gap-1 absolute bottom-8 left-8 z-30 text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
            <span>FRAME: {String(targetFrameRef.current + product.startFrameNumber).padStart(3, "0")} / 121</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
            <span>ROTATION: {Math.round(scrollProgress * 360)}°</span>
          </div>
        </div>

        {/* Scroll Progress Vertical Bar (Right edge) */}
        <div className="hidden lg:flex flex-col items-center gap-2 absolute right-8 top-1/2 -translate-y-1/2 z-30">
          <span className="text-[9px] uppercase tracking-[0.25em] text-neutral-500 rotate-90 origin-center mb-6">
            SEQUENCE
          </span>
          <div className="w-[2px] h-32 bg-white/10 rounded-full overflow-hidden relative">
            <div
              className="w-full transition-all duration-75 rounded-full"
              style={{
                height: `${Math.max(4, scrollProgress * 100)}%`,
                backgroundColor: product.accentColor,
                boxShadow: `0 0 10px ${product.accentColor}`,
              }}
            />
          </div>
          <span className="text-[10px] font-mono text-neutral-400 mt-2">
            {Math.round(scrollProgress * 100)}%
          </span>
        </div>

        {/* Reduced Motion Accessible Manual Scrub Bar */}
        {prefersReducedMotion && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-md p-3 rounded-xl bg-black/80 border border-white/20 backdrop-blur-lg flex items-center gap-3">
            <span className="text-xs uppercase tracking-wider text-neutral-300 font-semibold whitespace-nowrap">
              Frame Scrub:
            </span>
            <input
              type="range"
              min="0"
              max="100"
              value={manualScrub}
              onChange={(e) => handleReducedMotionScrub(Number(e.target.value))}
              className="w-full accent-[#FF3B3B] cursor-pointer"
              aria-label="Scrub product rotation frames"
            />
            <span className="text-xs font-mono text-neutral-400 min-w-[36px]">
              {manualScrub}%
            </span>
          </div>
        )}
      </div>
    </section>
  );
};
