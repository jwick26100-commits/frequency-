import React, { useState } from "react";
import { ProductData } from "../data/products";

interface FooterProps {
  products: ProductData[];
  currentIndex: number;
  onSelectProduct: (index: number) => void;
}

export const Footer: React.FC<FooterProps> = ({
  products,
  onSelectProduct,
}) => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().length > 3) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer id="main-footer" className="relative z-20 bg-[#0A0A0A] border-t border-white/10 pt-20 pb-12 text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Top Section: Newsletter & Brand Ethos */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="mb-4">
                <img
                  src="/images/frequency-logo.svg"
                  alt="FREQUENCY"
                  className="h-7 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-sm text-neutral-400 font-light max-w-sm leading-relaxed">
                Formulating bioactive beverage architectures at the intersection of cellular botany, neuro-adaptogens, and vibrational taste.
              </p>
            </div>

            <div className="mt-8 text-xs text-neutral-500 uppercase tracking-widest font-mono">
              LOS ANGELES • TOKYO • ZÜRICH
            </div>
          </div>

          {/* Newsletter Input Form */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-neutral-200 mb-2">
              Join the Frequency Dispatch
            </h3>
            <p className="text-xs text-neutral-400 mb-5 max-w-md font-light">
              Receive limited release batch notifications, clinical botanical monographs, and private tasting allocations.
            </p>

            {subscribed ? (
              <div className="p-4 rounded-xl bg-white/[0.04] border border-[#FF3B3B]/40 text-xs text-white flex items-center gap-3 animate-in fade-in duration-300">
                <span className="w-2 h-2 rounded-full bg-[#FF3B3B]" />
                <span>You have been calibrated. Check your inbox for allocation verification.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-4 py-3 rounded-full bg-white/[0.04] border border-white/15 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF3B3B] focus:ring-1 focus:ring-[#FF3B3B] transition-colors"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-[#FF3B3B] hover:bg-[#ff5252] text-white text-xs font-bold uppercase tracking-widest transition-all shadow-lg shadow-[#FF3B3B]/20 whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Middle Navigation Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 py-14 border-b border-white/10 text-xs">
          {/* Shop */}
          <div className="flex flex-col gap-3">
            <h4 className="font-bold tracking-[0.2em] uppercase text-neutral-300 mb-1">
              Shop Flavors
            </h4>
            {products.map((p, idx) => (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  onSelectProduct(idx);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="text-left text-neutral-400 hover:text-white transition-colors"
              >
                {p.name}
              </button>
            ))}
            <a href="#flavor-matrix" className="text-neutral-400 hover:text-white transition-colors">
              Variety Discovery Case
            </a>
          </div>

          {/* Support */}
          <div className="flex flex-col gap-3">
            <h4 className="font-bold tracking-[0.2em] uppercase text-neutral-300 mb-1">
              Support
            </h4>
            <a href="#faq" className="text-neutral-400 hover:text-white transition-colors">
              Contact & Concierge
            </a>
            <a href="#faq" className="text-neutral-400 hover:text-white transition-colors">
              Frequently Asked Questions
            </a>
            <a href="#faq" className="text-neutral-400 hover:text-white transition-colors">
              Cold-Chain Shipping
            </a>
            <a href="#faq" className="text-neutral-400 hover:text-white transition-colors">
              Subscriptions & Allocations
            </a>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-3">
            <h4 className="font-bold tracking-[0.2em] uppercase text-neutral-300 mb-1">
              Company
            </h4>
            <a href="#about" className="text-neutral-400 hover:text-white transition-colors">
              About FREQUENCY
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              TikTok
            </a>
            <a href="#manifesto" className="text-neutral-400 hover:text-white transition-colors">
              The Botanical Manifesto
            </a>
          </div>

          {/* Quality & Certifications */}
          <div className="flex flex-col gap-3">
            <h4 className="font-bold tracking-[0.2em] uppercase text-neutral-300 mb-1">
              Standards
            </h4>
            <span className="text-neutral-400">100% Non-GMO Botanical Extract</span>
            <span className="text-neutral-400">Infinitely Recyclable Aluminum</span>
            <span className="text-neutral-400">Zero Added Refined Sugar</span>
            <span className="text-neutral-400">Third-Party Potency Tested</span>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            © {new Date().getFullYear()} FREQUENCY BEVERAGE CO. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-neutral-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-neutral-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-neutral-400 cursor-pointer">Accessibility Statement</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
