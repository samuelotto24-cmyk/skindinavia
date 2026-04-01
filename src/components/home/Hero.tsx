"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/mock-data";
import { use3DTilt } from "@/hooks/use-3d-tilt";
import { useMagneticHover } from "@/hooks/use-magnetic-hover";
import { MorphingBlob } from "@/components/animation/MorphingBlob";
import { SpringEntrance } from "@/components/animation/SpringEntrance";

const heroProducts = [
  products.find((p) => p.id === "2")!, // Bridal (bestseller)
  products.find((p) => p.id === "3")!, // Oil Control
  products.find((p) => p.id === "1")!, // Original
];

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tiltRef = use3DTilt<HTMLDivElement>({ maxRotation: 8, scale: 1.02 });
  const ctaRef = useMagneticHover<HTMLDivElement>({ radius: 60, strength: 0.25 });
  const activeProduct = heroProducts[activeIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % heroProducts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-b from-[#faf5f0] to-white">
      <div className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Text content */}
          <div className="max-w-xl">
            <SpringEntrance delay={0}>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Patented. Trusted. Since 2005.
              </p>
            </SpringEntrance>

            <SpringEntrance delay={0.1}>
              <h1 className="text-balance text-4xl font-light leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                When You Need to Pull an{" "}
                <span className="font-semibold">ALL NIGHTER</span> —{" "}
                <span className="italic">Skindinavia Will Be There</span>
              </h1>
            </SpringEntrance>

            <SpringEntrance delay={0.2}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
                The World&apos;s #1 Makeup Setting Spray Formula. Locks in your
                look for 16+ hours with patented cooling technology.
              </p>
            </SpringEntrance>

            <SpringEntrance delay={0.4}>
              <div ref={ctaRef} className="mt-10 flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="h-12 px-8 text-sm tracking-wide"
                  render={<Link href="/shop" />}
                >
                  Shop Bestsellers
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 px-8 text-sm tracking-wide"
                  render={<Link href="/about-us" />}
                >
                  Our Story
                </Button>
              </div>
            </SpringEntrance>
          </div>

          {/* Product spotlight */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <MorphingBlob
                color={`${activeProduct.accentColor}15`}
                size={450}
                className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              />

              <div
                ref={tiltRef}
                className="relative z-10 h-[480px] w-[300px] sm:h-[540px] sm:w-[340px]"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProduct.id}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{
                      type: "spring",
                      stiffness: 150,
                      damping: 20,
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Image
                      src={activeProduct.image}
                      alt={activeProduct.name}
                      width={340}
                      height={480}
                      className="h-auto max-h-[480px] w-auto object-contain drop-shadow-2xl"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Product indicator dots */}
              <div className="mt-6 flex justify-center gap-2">
                {heroProducts.map((p, i) => (
                  <button
                    key={p.id}
                    onClick={() => setActiveIndex(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === activeIndex ? "w-8 bg-foreground" : "w-2 bg-border"
                    }`}
                    aria-label={`Show ${p.shortName}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
