import React, { useState } from "react";
import { ProductData } from "../data/products";

interface OrderModalProps {
  product: ProductData;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const [packSize, setPackSize] = useState<"12" | "24">("12");
  const [isSubscription, setIsSubscription] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);
  const [ordered, setOrdered] = useState<boolean>(false);

  if (!isOpen) return null;

  const basePriceNumber = parseFloat(product.price.replace(/[^0-9.]/g, "")) || 42;
  const unitPrice = packSize === "12" ? basePriceNumber : basePriceNumber * 1.85;
  const discountMultiplier = isSubscription ? 0.85 : 1.0;
  const finalPrice = (unitPrice * discountMultiplier * quantity).toFixed(2);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setOrdered(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200 select-none"
    >
      <div
        className="relative w-full max-w-lg bg-[#111111] border border-white/15 rounded-3xl p-6 sm:p-8 text-white shadow-2xl shadow-black overflow-hidden"
        style={{
          boxShadow: `0 0 40px ${product.glowColor}`,
        }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {ordered ? (
          <div className="py-8 flex flex-col items-center text-center animate-in zoom-in-95 duration-300">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
              style={{ backgroundColor: `${product.accentColor}25` }}
            >
              <svg
                className="w-8 h-8"
                style={{ color: product.accentColor }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <span className="text-xs uppercase tracking-[0.3em] font-mono text-neutral-400 mb-2">
              ALLOCATION CONFIRMED
            </span>
            <h3 id="order-modal-title" className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mb-3">
              Tune Your Frequency
            </h3>
            <p className="text-sm text-neutral-300 font-light max-w-sm mb-6 leading-relaxed">
              Your order for {quantity}x {product.name} ({packSize}-Pack) has been queued for immediate cold-chain fulfillment.
            </p>

            <button
              type="button"
              onClick={() => {
                setOrdered(false);
                onClose();
              }}
              className="px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest bg-white text-black hover:bg-neutral-200 transition-colors"
            >
              Return to Experience
            </button>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="mb-6">
              <span
                className="text-xs font-bold uppercase tracking-[0.25em]"
                style={{ color: product.accentColor }}
              >
                {product.flavor}
              </span>
              <h3 id="order-modal-title" className="text-2xl font-black uppercase tracking-tight text-white mt-1">
                {product.name}
              </h3>
              <p className="text-xs text-neutral-400 mt-1">{product.tagline}</p>
            </div>

            {/* Pack Size Selection */}
            <div className="mb-5">
              <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-2">
                Select Format
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPackSize("12")}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    packSize === "12"
                      ? "border-[#FF3B3B] bg-[#FF3B3B]/10 text-white"
                      : "border-white/10 bg-white/[0.03] text-neutral-400 hover:text-white"
                  }`}
                >
                  <div className="text-xs font-bold uppercase tracking-wider">12-Pack</div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">355ml Sleek Cans</div>
                </button>
                <button
                  type="button"
                  onClick={() => setPackSize("24")}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    packSize === "24"
                      ? "border-[#FF3B3B] bg-[#FF3B3B]/10 text-white"
                      : "border-white/10 bg-white/[0.03] text-neutral-400 hover:text-white"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                    <span>24-Pack Case</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">
                      SAVE 15%
                    </span>
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">Double Reserve</div>
                </button>
              </div>
            </div>

            {/* Purchase Type (Subscribe & Save) */}
            <div className="mb-5">
              <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-2">
                Purchase Cadence
              </label>
              <div className="space-y-2">
                <label
                  className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                    isSubscription
                      ? "border-[#FF3B3B] bg-[#FF3B3B]/10 text-white"
                      : "border-white/10 bg-white/[0.03] text-neutral-400 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="subscription"
                      checked={isSubscription}
                      onChange={() => setIsSubscription(true)}
                      className="accent-[#FF3B3B]"
                    />
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider">
                        Frequency Membership
                      </div>
                      <div className="text-[11px] text-neutral-400">
                        Delivered monthly. Pause, swap, or cancel anytime.
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#FF3B3B] tracking-wider whitespace-nowrap">
                    -15% OFF
                  </span>
                </label>

                <label
                  className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                    !isSubscription
                      ? "border-white/30 bg-white/10 text-white"
                      : "border-white/10 bg-white/[0.03] text-neutral-400 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="subscription"
                      checked={!isSubscription}
                      onChange={() => setIsSubscription(false)}
                      className="accent-[#FF3B3B]"
                    />
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider">
                        One-Time Allocation
                      </div>
                      <div className="text-[11px] text-neutral-400">Standard single order</div>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Quantity and Total */}
            <div className="flex items-center justify-between py-4 border-t border-white/10 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-wider text-neutral-400">Quantity:</span>
                <div className="flex items-center border border-white/20 rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2.5 py-1 hover:bg-white/10 text-sm font-bold text-neutral-300"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-xs font-mono font-bold text-white">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-2.5 py-1 hover:bg-white/10 text-sm font-bold text-neutral-300"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 block">
                  Total
                </span>
                <span className="text-xl font-black text-white font-mono">
                  ${finalPrice}
                </span>
              </div>
            </div>

            {/* CTA */}
            <button
              type="button"
              onClick={handleCheckout}
              className="w-full py-4 rounded-full text-xs font-extrabold uppercase tracking-[0.22em] text-white transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              style={{
                backgroundColor: "#FF3B3B",
                boxShadow: "0 0 25px rgba(255, 59, 59, 0.4)",
              }}
            >
              Complete Allocation
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
