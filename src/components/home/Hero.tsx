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
import { TextReveal } from "@/components/animation/TextReveal";
import { CountUp } from "@/components/animation/CountUp";

const heroProducts = [
  products.find((p) => p.id === "2")!, // Bridal
  products.find((p) => p.id === "3")!, // Oil Control
  products.find((p) => p.id === "1")!, // Original
];

// Product accent colors for the background glow
const productGlows: Record<string, string> = {
  "2": "bg-pink-400/20",
  "3": "bg-emerald-400/15",
  "1": "bg-blue-400/15",
};

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tiltRef = use3DTilt<HTMLDivElement>({ maxRotation: 8, scale: 1.03 });
  const ctaRef = useMagneticHover<HTMLDivElement>({ radius: 60, strength: 0.2 });
  const activeProduct = heroProducts[activeIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % heroProducts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Warm gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f8f3ed] via-[#faf7f3] to-[#f5eff0]" />

      {/* Dynamic product-colored glow — changes with carousel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeProduct.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className={`absolute top-1/4 right-[15%] w-[500px] h-[500px] rounded-full ${productGlows[activeProduct.id]} blur-[100px]`}
        />
      </AnimatePresence>

      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr,1.2fr] lg:gap-12">
          {/* Narrative text */}
          <div className="max-w-xl">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-5 text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground"
            >
              The Original Formula
            </motion.p>

            <h1 className="font-serif text-4xl leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.5rem]">
              <TextReveal delay={0.2}>
                The Setting Spray Behind
              </TextReveal>
              <br />
              <span className="italic">
                <TextReveal delay={0.5}>
                  50,000 Five-Star Reviews
                </TextReveal>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              Patented cooling technology that locks in your makeup for 16+ hours.
              Invented in 2005. Trusted by professionals. Finally, under our own name.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              ref={ctaRef}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Button
                size="lg"
                className="h-12 px-10 text-sm tracking-wider uppercase"
                render={<Link href="/shop" />}
              >
                Shop Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-12 px-10 text-sm tracking-wider uppercase"
                render={<Link href="/about-us" />}
              >
                Our Story
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="mt-10 flex gap-10"
            >
              <div>
                <p className="font-serif text-2xl font-medium tracking-tight">
                  <CountUp end={16} suffix="+" duration={1.5} />
                </p>
                <p className="mt-0.5 text-xs uppercase tracking-wider text-muted-foreground">Hour Wear</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-medium tracking-tight">
                  <CountUp end={50} suffix="K+" duration={2} />
                </p>
                <p className="mt-0.5 text-xs uppercase tracking-wider text-muted-foreground">Five-Star Reviews</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-medium tracking-tight">
                  <CountUp end={20} duration={1.8} />
                </p>
                <p className="mt-0.5 text-xs uppercase tracking-wider text-muted-foreground">Years Trusted</p>
              </div>
            </motion.div>
          </div>

          {/* BIGGER product showcase */}
          <div className="flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
              className="relative"
            >
              <MorphingBlob
                color={`${activeProduct.accentColor}18`}
                size={550}
                className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              />

              <div
                ref={tiltRef}
                className="relative z-10 h-[520px] w-[340px] sm:h-[600px] sm:w-[400px] lg:h-[640px] lg:w-[420px]"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProduct.id}
                    initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.9, rotate: 2 }}
                    transition={{ type: "spring", stiffness: 100, damping: 16 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Image
                      src={activeProduct.image}
                      alt={activeProduct.name}
                      width={420}
                      height={640}
                      className="h-auto max-h-[640px] w-auto object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.15)]"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Product name + dots */}
              <div className="mt-4 text-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeProduct.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-sm font-medium tracking-wide"
                  >
                    {activeProduct.shortName}
                  </motion.p>
                </AnimatePresence>
                <div className="mt-3 flex justify-center gap-2">
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
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
