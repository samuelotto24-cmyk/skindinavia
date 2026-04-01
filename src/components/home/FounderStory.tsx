"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";

export function FounderStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-32 bg-gradient-to-b from-background to-card">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Image / visual placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-[#f0ebe4] to-[#e8e0d6]">
              <div className="absolute inset-0 flex items-center justify-center p-12">
                <p className="font-serif text-3xl italic leading-snug text-foreground/[0.07] sm:text-4xl lg:text-5xl">
                  &ldquo;Makeup isn&apos;t vanity — it&apos;s identity.&rdquo;
                </p>
              </div>
              <div className="absolute bottom-8 left-8">
                <p className="font-serif text-lg tracking-tight text-foreground/20">AG</p>
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
              className="mt-6 space-y-4 text-muted-foreground leading-relaxed"
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
                For 15 years, a major beauty brand sold our formula as their own bestseller.
                Now, Skindinavia stands on its own — the original, under our name, with the
                technology that started it all.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-8"
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
