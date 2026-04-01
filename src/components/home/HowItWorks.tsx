"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/mock-data";

const originalProduct = products.find((p) => p.id === "1")!;

const features = [
  { label: "16+ Hour Wear", position: "top-[15%] -left-4 lg:left-auto lg:-right-48" },
  { label: "Patented Cooling Tech", position: "top-[45%] -right-4 lg:-right-52" },
  { label: "Oil-Free & Vegan", position: "top-[75%] -left-4 lg:left-auto lg:-right-44" },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section ref={sectionRef} className="relative py-12 lg:py-14 bg-gradient-to-b from-[#1a1a2e] to-[#16213e] text-white overflow-hidden">
      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")" }} />
      <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-sky-500/5 blur-[80px]" />
      <div className="absolute bottom-0 left-0 w-[200px] h-[200px] rounded-full bg-violet-500/5 blur-[60px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left: product with overlaid feature callouts */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center"
          >
            {/* Product bottle */}
            <div className="relative h-[320px] w-[200px] lg:h-[380px] lg:w-[240px]">
              <Image
                src={originalProduct.image}
                alt={originalProduct.name}
                fill
                className="object-contain drop-shadow-2xl"
              />
              <div className="absolute inset-0 -z-10 scale-150 rounded-full bg-sky-400/8 blur-[60px]" />
            </div>

            {/* Feature callout pills overlaid */}
            {features.map((feature, i) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
                className={`absolute ${feature.position} z-20`}
              >
                <div className="rounded-full bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 text-xs font-medium tracking-wide text-white/90 shadow-lg">
                  {feature.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right: text + Shop Now */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="text-xs font-medium uppercase tracking-[0.25em] text-sky-300"
            >
              Patented Technology
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-3 font-serif text-2xl tracking-tight sm:text-3xl lg:text-4xl text-white"
            >
              The Science of 16-Hour Wear
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-3 max-w-md text-sm leading-relaxed text-white/50"
            >
              Everyone else seals makeup on. We cool it in. Micro-encapsulated cooling
              spheres lower the temperature of your makeup, fusing it to your skin for
              16+ hours. That&apos;s the difference a patent makes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-6"
            >
              <Button
                size="lg"
                className="h-11 px-8 text-sm tracking-wider uppercase bg-white text-[#1a1a2e] hover:bg-white/90"
                render={<Link href="/shop" />}
              >
                Shop Now
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-5 text-[10px] text-white/30 uppercase tracking-wider"
            >
              U.S. Patent Protected &middot; Clinically Tested &middot; Made in USA
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
