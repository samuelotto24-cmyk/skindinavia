"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/mock-data";

const showcaseProducts = [
  products.find((p) => p.id === "1")!,
  products.find((p) => p.id === "2")!,
  products.find((p) => p.id === "3")!,
];

export function FounderStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section ref={sectionRef} className="relative py-12 lg:py-14 bg-gradient-to-b from-[#2a2520] to-[#1f1b17] text-white overflow-hidden">
      {/* Warm noise texture */}
      <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")" }} />
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[400px] h-[300px] rounded-full bg-amber-500/5 blur-[80px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[auto,1fr] lg:gap-16">
          {/* Product lineup — horizontal strip, not tall box */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex items-end justify-center gap-3 lg:gap-4"
          >
            {showcaseProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }}
                className={`relative ${i === 1 ? "h-[240px] w-[80px] lg:h-[280px] lg:w-[95px]" : "h-[200px] w-[68px] lg:h-[240px] lg:w-[80px]"}`}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.4)]"
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Story — compact */}
          <div className="max-w-lg">
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xs font-medium uppercase tracking-[0.25em] text-amber-400/80"
            >
              Our Origin
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-3 font-serif text-2xl tracking-tight sm:text-3xl text-white"
            >
              One Night in Miami Changed Everything
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-4 space-y-3 text-sm text-white/55 leading-relaxed"
            >
              <p>
                In 2005, founder Allen Goldman watched a woman&apos;s makeup melt under the
                heat of a Miami nightclub. That sparked a question nobody was asking:
                <em className="text-white/75"> what if you could cool makeup instead of sealing it?</em>
              </p>
              <p>
                For 15 years, a major beauty brand built their #1 bestseller on our formula —
                50,000 five-star reviews, Allure Best of Beauty Hall of Fame. When they
                reformulated, we didn&apos;t. <em className="text-white/75">The original is still here.</em>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-5 flex items-center gap-4"
            >
              <Button
                variant="outline"
                size="lg"
                className="h-10 px-6 text-sm tracking-wider uppercase border-white/20 text-white hover:bg-white/10"
                render={<Link href="/about-us" />}
              >
                Read the Full Story
              </Button>
              <p className="font-serif text-sm italic text-white/30">
                &ldquo;Makeup isn&apos;t vanity — it&apos;s identity.&rdquo;
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
