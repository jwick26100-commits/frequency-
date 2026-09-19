import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PRODUCTS, ProductData } from "../data/products";
import { Navbar } from "../components/Navbar";
import { ProductBottleScroll } from "../components/ProductBottleScroll";
import { ProductDetailsSection } from "../components/ProductDetailsSection";
import { FlavorSelector } from "../components/FlavorSelector";
import { Footer } from "../components/Footer";
import { OrderModal } from "../components/OrderModal";

export default function Page() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false);

  const currentProduct: ProductData = PRODUCTS[currentIndex];
  const nextIndex = (currentIndex + 1) % PRODUCTS.length;
  const nextProduct: ProductData = PRODUCTS[nextIndex];

  const handleSelectFlavor = (newIndex: number) => {
    if (newIndex === currentIndex) return;
    setCurrentIndex(newIndex);
  };

  const handleNextFlavor = () => {
    setCurrentIndex(nextIndex);
    // Smooth scroll back to top of the product scroll container
    const container = document.getElementById("product-scroll-container");
    if (container) {
      container.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div
      className="min-h-screen bg-[#0A0A0A] text-white flex flex-col relative selection:bg-[#FF3B3B] selection:text-white"
      style={{
        "--product-accent": currentProduct.accentColor,
        "--product-secondary": currentProduct.secondaryColor,
        "--product-glow": currentProduct.glowColor,
      } as React.CSSProperties}
    >
      {/* 1. Global Navigation */}
      <Navbar
        currentProduct={currentProduct}
        onOpenOrderModal={() => setIsOrderModalOpen(true)}
        onSelectFlavor={handleSelectFlavor}
        currentIndex={currentIndex}
      />

      {/* 2. Hero & 500vh Sticky Scroll Canvas Sequence */}
      <main className="flex-1 w-full relative">
        <ProductBottleScroll
          key={currentProduct.id}
          product={currentProduct}
          onOrderClick={() => setIsOrderModalOpen(true)}
        />

        {/* 3. Product Specifications, Tasting Notes & The Ritual */}
        <ProductDetailsSection
          product={currentProduct}
          nextProduct={nextProduct}
          onOrderClick={() => setIsOrderModalOpen(true)}
          onNextFlavorClick={handleNextFlavor}
          onSelectFlavor={handleSelectFlavor}
          allProducts={PRODUCTS}
          currentIndex={currentIndex}
        />
      </main>

      {/* 4. Minimal Bottom-Center Floating Flavor Selector */}
      <FlavorSelector
        products={PRODUCTS}
        currentIndex={currentIndex}
        onSelect={handleSelectFlavor}
      />

      {/* 5. Luxury Dark Footer with Newsletter & Sitemaps */}
      <Footer
        products={PRODUCTS}
        currentIndex={currentIndex}
        onSelectProduct={handleSelectFlavor}
      />

      {/* 6. Quick Checkout / Allocation Modal */}
      <OrderModal
        product={currentProduct}
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
      />
    </div>
  );
}
