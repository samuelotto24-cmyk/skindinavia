"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { products } from "@/lib/mock-data";

const originalProduct = products.find((p) => p.id === "1")!;

const steps = [
  {
    number: "01",
    title: "Mist",
    description:
      "A fine cooling mist blankets your makeup in thousands of micro-encapsulated temperature-control spheres.",
    accent: "from-sky-500/10 to-blue-500/5",
    numberColor: "text-sky-300",
  },
  {
    number: "02",
    title: "Cool",
    description:
      "Our patented technology lowers the surface temperature of your makeup, fusing it to your skin — not sealing it on top.",
    accent: "from-blue-500/10 to-indigo-500/5",
    numberColor: "text-blue-300",
  },
  {
    number: "03",
    title: "Lock",
    description:
      "Spheres of varying sizes release active ingredients over 16+ hours, continuously cooling and controlling oil.",
    accent: "from-violet-500/10 to-purple-500/5",
    numberColor: "text-violet-300",
  },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} className="py-16 lg:py-20 bg-gradient-to-b from-[#1a1a2e] to-[#16213e] text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
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
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-4 font-serif text-3xl tracking-tight sm:text-4xl lg:text-5xl text-white"
          >
            The Science of 16-Hour Wear
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto mt-4 max-w-xl text-white/60"
          >
            Everyone else seals makeup on. We cool it in. That&apos;s the difference a patent makes.
          </motion.p>
        </div>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Steps */}
          <div className="space-y-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
                className={`flex gap-5 items-start rounded-xl bg-gradient-to-r ${step.accent} p-6 backdrop-blur-sm border border-white/5`}
              >
                <span className={`font-serif text-4xl font-light ${step.numberColor} shrink-0 leading-none`}>
                  {step.number}
                </span>
                <div>
                  <h3 className="font-serif text-xl tracking-tight text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Product bottle with glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:flex justify-center"
          >
            <div className="relative h-[420px] w-[280px]">
              <Image
                src={originalProduct.image}
                alt={originalProduct.name}
                fill
                className="object-contain drop-shadow-2xl"
              />
              {/* Colored glow behind bottle */}
              <div className="absolute inset-0 -z-10 scale-125 rounded-full bg-sky-400/10 blur-[60px]" />
              <div className="absolute top-1/3 left-1/4 -z-10 h-40 w-40 rounded-full bg-violet-400/10 blur-[50px]" />
            </div>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 text-center text-sm text-white/40"
        >
          U.S. Patent Protected &middot; Clinically Tested &middot; Made in USA
        </motion.p>
      </div>
    </section>
  );
}
