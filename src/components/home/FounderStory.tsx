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
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-16 lg:py-20 border-t border-border/40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Product lineup showcase */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-[#f0ebe4] to-[#e8e0d6]">
              {/* Product bottles arranged */}
              <div className="absolute inset-0 flex items-center justify-center gap-2 px-8">
                {showcaseProducts.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.3 + i * 0.15 }}
                    className="relative h-[60%] flex-1"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain drop-shadow-xl"
                    />
                  </motion.div>
                ))}
              </div>
              {/* Quote overlay at bottom */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#e8e0d6] via-[#e8e0d6]/80 to-transparent px-8 pb-6 pt-16">
                <p className="font-serif text-lg italic leading-snug text-foreground/40 sm:text-xl">
                  &ldquo;Makeup isn&apos;t vanity — it&apos;s identity.&rdquo;
                </p>
                <p className="mt-1 text-xs uppercase tracking-wider text-foreground/30">
                  — Allen Goldman, Founder
                </p>
              </div>
            </div>
          </motion.div>

          {/* Story */}
          <div className="max-w-lg">
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xs font-medium uppercase tracking-[0.25em] text-brand-gold"
            >
              Our Origin
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-4 font-serif text-3xl tracking-tight sm:text-4xl"
            >
              One Night in Miami Changed Everything
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="mt-5 space-y-4 text-muted-foreground leading-relaxed"
            >
              <p>
                In 2005, founder Allen Goldman watched a woman&apos;s makeup melt under the
                heat of a Miami nightclub. That moment sparked a question nobody in beauty
                was asking: <em>what if you could cool makeup instead of sealing it?</em>
              </p>
              <p>
                Two years of R&amp;D led to a patented formula built on micro-encapsulated
                cooling spheres. The first customers weren&apos;t consumers — they were
                Hollywood makeup artists and Broadway pros who needed absolute performance
                under lights, sweat, and tears.
              </p>
              <p>
                For 15 years, a major beauty brand built their #1 bestseller on our formula —
                50,000 five-star reviews, Allure Best of Beauty Hall of Fame, all of it powered
                by Skindinavia&apos;s patent. When that partnership ended, they reformulated.
                We didn&apos;t. <em>The original is still here.</em>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-6"
            >
              <Button
                variant="outline"
                size="lg"
                className="h-12 px-10 text-sm tracking-wider uppercase"
                render={<Link href="/about-us" />}
              >
                Read the Full Story
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
