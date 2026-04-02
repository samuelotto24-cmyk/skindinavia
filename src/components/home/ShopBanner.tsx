"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

export function ShopBanner() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section ref={ref} className="py-4 lg:py-6">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <Link href="/shop" className="group block">
            <div className="relative overflow-hidden rounded-2xl h-[220px] sm:h-[280px] bg-gradient-to-r from-pink-200 via-pink-100 to-rose-200">
              {/* Product image */}
              <div className="absolute right-[5%] top-1/2 -translate-y-1/2 h-[85%] w-[200px] sm:w-[260px] transition-transform duration-500 group-hover:scale-105">
                <Image
                  src="https://skindinavia.com/wp-content/uploads/2021/10/IMG9618-scaled.jpg"
                  alt="Skindinavia Bridal Setting Spray"
                  fill
                  className="object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.2)]"
                  unoptimized
                />
              </div>

              {/* Text overlay — left side */}
              <div className="absolute inset-y-0 left-0 flex flex-col justify-center px-8 sm:px-12 max-w-[55%]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-pink-600/70">The Original Formula</p>
                <h3 className="mt-2 font-serif text-2xl tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                  Shop Skindinavia
                </h3>
                <p className="mt-2 text-sm text-foreground/60 hidden sm:block">
                  Patented. Trusted. Since 2005.
                </p>
                <div className="mt-4">
                  <span className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-background transition-all group-hover:bg-foreground/80">
                    Shop Now
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
