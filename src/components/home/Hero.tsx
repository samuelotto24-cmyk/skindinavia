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
  products.find((p) => p.id === "2")!,
  products.find((p) => p.id === "3")!,
  products.find((p) => p.id === "1")!,
];

const productGlows: Record<string, string> = {
  "2": "bg-pink-400/20",
  "3": "bg-emerald-400/15",
  "1": "bg-blue-400/15",
};

const productBgs: Record<string, string> = {
  "2": "from-pink-100/60 via-rose-50/40 to-pink-50/20",
  "3": "from-emerald-100/50 via-teal-50/30 to-emerald-50/15",
  "1": "from-blue-100/50 via-sky-50/30 to-blue-50/15",
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
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#f8f3ed] via-[#faf7f3] to-[#f5eff0]" />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeProduct.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className={`absolute top-0 right-[10%] w-[500px] h-[500px] rounded-full ${productGlows[activeProduct.id]} blur-[100px]`}
        />
      </AnimatePresence>

      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-10 lg:px-8 lg:py-14">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
          {/* Text */}
          <div className="max-w-lg">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground"
            >
              The Original Formula
            </motion.p>

            <h1 className="font-serif text-3xl leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
              <TextReveal delay={0.2}>
                Your Makeup Is Gone
              </TextReveal>
              <br />
              <TextReveal delay={0.45}>
                by 3 PM.
              </TextReveal>
              <br />
              <span className="italic">
                <TextReveal delay={0.7}>
                  Ours Isn't.
                </TextReveal>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.0 }}
              className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base"
            >
              The patented cooling spray that locks your look in for 16+ hours —
              through work, workouts, weddings, and everything in between.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.1 }}
              ref={ctaRef}
              className="mt-6 flex flex-wrap gap-3"
            >
              <Button
                size="lg"
                className="h-11 px-8 text-sm tracking-wider uppercase"
                render={<Link href="/shop" />}
              >
                Shop Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-11 px-8 text-sm tracking-wider uppercase"
                render={<Link href="/about-us" />}
              >
                Our Story
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="mt-8 flex gap-8"
            >
              <div>
                <p className="font-serif text-xl font-medium tracking-tight">
                  <CountUp end={16} suffix="+" duration={1.5} />
                </p>
                <p className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">Hour Wear</p>
              </div>
              <div>
                <p className="font-serif text-xl font-medium tracking-tight">
                  <CountUp end={50} suffix="K+" duration={2} />
                </p>
                <p className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">Five-Star Reviews</p>
              </div>
              <div>
                <p className="font-serif text-xl font-medium tracking-tight">
                  <CountUp end={20} duration={1.8} />
                </p>
                <p className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">Years Trusted</p>
              </div>
            </motion.div>
          </div>

          {/* Product carousel — clickable to buy */}
          <div className="flex justify-center lg:justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
              className="relative"
            >
              {/* Colored background */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`bg-${activeProduct.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className={`absolute inset-[-16px] rounded-3xl bg-gradient-to-br ${productBgs[activeProduct.id]}`}
                />
              </AnimatePresence>

              <MorphingBlob
                color={`${activeProduct.accentColor}20`}
                size={420}
                className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              />

              {/* Shop Now tag */}
              <div className="relative z-20 mb-2 text-center">
                <Link
                  href={`/products/${activeProduct.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-foreground/90 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-background transition-all hover:bg-foreground"
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
                  Shop Now
                </Link>
              </div>

              {/* Clickable product image */}
              <Link href={`/products/${activeProduct.slug}`}>
                <div
                  ref={tiltRef}
                  className="relative z-10 h-[380px] w-[250px] sm:h-[430px] sm:w-[280px] cursor-pointer"
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
                        width={280}
                        height={430}
                        className="h-auto max-h-[430px] w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </Link>

              {/* Product name + price + dots */}
              <div className="mt-4 text-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProduct.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Link href={`/products/${activeProduct.slug}`} className="group inline-block">
                      <p className="text-sm font-medium tracking-wide group-hover:underline underline-offset-2">
                        {activeProduct.shortName}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        From ${activeProduct.defaultPrice}
                      </p>
                    </Link>
                  </motion.div>
                </AnimatePresence>
                <div className="mt-3 flex justify-center gap-2">
                  {heroProducts.map((p, i) => (
                    <button
                      key={p.id}
                      onClick={() => setActiveIndex(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === activeIndex ? "w-6 bg-foreground" : "w-1.5 bg-border"
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
