"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/mock-data";

const originalProduct = products.find((p) => p.id === "1")!;

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
    <section ref={sectionRef} className="relative py-14 lg:py-16 bg-gradient-to-b from-[#1a1a2e] to-[#16213e] text-white overflow-hidden">
      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")" }} />

      {/* Large faded product bottle as background visual */}
      <div className="absolute right-[-5%] top-1/2 -translate-y-1/2 h-[500px] w-[300px] opacity-[0.06] pointer-events-none">
        <Image
          src={originalProduct.image}
          alt=""
          fill
          className="object-contain"
        />
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-0 left-[20%] w-[400px] h-[400px] rounded-full bg-sky-500/5 blur-[100px]" />
      <div className="absolute bottom-0 right-[30%] w-[300px] h-[300px] rounded-full bg-violet-500/5 blur-[80px]" />

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
            className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl text-white"
          >
            The Science of 16-Hour Wear
          </motion.h2>
        </div>

        {/* 3 steps */}
        <div className="mt-12 grid grid-cols-3 gap-4 lg:gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="text-center"
            >
              <div className={`mx-auto h-1 w-10 rounded-full ${step.accent} mb-5`} />
              <p className="font-serif text-4xl font-light text-white/40">{step.number}</p>
              <h3 className="mt-2 font-serif text-xl tracking-tight text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/45 max-w-[220px] mx-auto">{step.detail}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex items-center justify-center gap-6"
        >
          <Button
            size="lg"
            className="h-11 px-8 text-sm tracking-wider uppercase bg-white text-[#1a1a2e] hover:bg-white/90"
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
