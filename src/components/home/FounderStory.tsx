"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";

export function FounderStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section ref={sectionRef} className="relative py-14 lg:py-16 bg-gradient-to-b from-[#2a2520] to-[#1f1b17] text-white overflow-hidden">
      {/* Warm noise texture */}
      <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-amber-500/5 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: real lifestyle photo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="https://skindinavia.com/wp-content/uploads/2021/07/SKINDINAVIA_2021-50-copy.jpg"
                alt="Skindinavia brand story"
                fill
                className="object-cover"
                unoptimized
              />
              {/* Dark overlay for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              {/* Quote at bottom of photo */}
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="font-serif text-lg italic leading-snug text-white/90 sm:text-xl lg:text-2xl">
                  &ldquo;Makeup isn&apos;t vanity — it&apos;s identity.&rdquo;
                </p>
                <p className="mt-2 text-xs uppercase tracking-wider text-white/50">
                  — Allen Goldman, Founder
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: story — bigger text */}
          <div>
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
              className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl text-white"
            >
              One Night in Miami Changed Everything
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-5 space-y-4 text-base text-white/60 leading-relaxed"
            >
              <p>
                In 2005, founder Allen Goldman watched a woman&apos;s makeup melt under the
                heat of a Miami nightclub. That sparked a question nobody was asking:
                <em className="text-white/80"> what if you could cool makeup instead of sealing it?</em>
              </p>
              <p>
                For 15 years, a major beauty brand built their #1 bestseller on our formula —
                50,000 five-star reviews, Allure Best of Beauty Hall of Fame. When they
                reformulated, we didn&apos;t. <em className="text-white/80">The original is still here.</em>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-6"
            >
              <Button
                variant="outline"
                size="lg"
                className="h-11 px-8 text-sm tracking-wider uppercase bg-white text-foreground hover:bg-white/90"
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
