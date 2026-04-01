"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "01",
    title: "Mist",
    detail: "Micro-encapsulated cooling spheres blanket your makeup",
    accent: "bg-sky-400",
  },
  {
    number: "02",
    title: "Cool",
    detail: "Patented tech lowers temperature, fusing makeup to skin",
    accent: "bg-blue-400",
  },
  {
    number: "03",
    title: "Lock",
    detail: "Active ingredients release over 16+ hours of wear",
    accent: "bg-violet-400",
  },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section ref={sectionRef} className="relative py-12 bg-gradient-to-b from-[#1a1a2e] to-[#16213e] text-white overflow-hidden">
      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")" }} />

      <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs font-medium uppercase tracking-[0.25em] text-sky-300"
          >
            Patented Technology
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-3 font-serif text-2xl tracking-tight sm:text-3xl text-white"
          >
            The Science of 16-Hour Wear
          </motion.h2>
        </div>

        {/* 3 steps — clean horizontal row */}
        <div className="mt-10 grid grid-cols-3 gap-4 lg:gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="text-center"
            >
              <div className={`mx-auto h-1 w-8 rounded-full ${step.accent} mb-4 opacity-60`} />
              <p className="font-serif text-3xl font-light text-white/20">{step.number}</p>
              <h3 className="mt-1 font-serif text-lg tracking-tight text-white">{step.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-white/45 max-w-[200px] mx-auto">{step.detail}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 flex items-center justify-center gap-6"
        >
          <Button
            size="lg"
            className="h-10 px-8 text-sm tracking-wider uppercase bg-white text-[#1a1a2e] hover:bg-white/90"
            render={<Link href="/shop" />}
          >
            Shop Now
          </Button>
          <p className="text-[10px] text-white/25 uppercase tracking-wider hidden sm:block">
            U.S. Patent Protected &middot; Clinically Tested &middot; Made in USA
          </p>
        </motion.div>
      </div>
    </section>
  );
}
