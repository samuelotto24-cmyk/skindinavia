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
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section ref={sectionRef} className="relative py-14 lg:py-16 bg-gradient-to-b from-[#1a1a2e] to-[#16213e] text-white overflow-hidden">
      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")" }} />
      {/* Gradient orbs for depth */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-sky-500/5 blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-violet-500/5 blur-[80px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr,auto] lg:gap-16">
          {/* Left: Header + Steps stacked */}
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
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-3 font-serif text-2xl tracking-tight sm:text-3xl lg:text-4xl text-white"
            >
              The Science of 16-Hour Wear
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-2 max-w-md text-sm text-white/50"
            >
              Everyone else seals makeup on. We cool it in.
            </motion.p>

            <div className="mt-8 space-y-4">
              {steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className={`flex gap-4 items-start rounded-xl bg-gradient-to-r ${step.accent} p-4 border border-white/5`}
                >
                  <span className={`font-serif text-3xl font-light ${step.numberColor} shrink-0 leading-none`}>
                    {step.number}
                  </span>
                  <div>
                    <h3 className="font-serif text-lg tracking-tight text-white">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-white/50">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-6 text-xs text-white/30"
            >
              U.S. Patent Protected &middot; Clinically Tested &middot; Made in USA
            </motion.p>
          </div>

          {/* Right: Product bottle with glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex justify-center"
          >
            <div className="relative h-[360px] w-[240px]">
              <Image
                src={originalProduct.image}
                alt={originalProduct.name}
                fill
                className="object-contain drop-shadow-2xl"
              />
              <div className="absolute inset-0 -z-10 scale-125 rounded-full bg-sky-400/8 blur-[50px]" />
              <div className="absolute top-1/3 left-1/4 -z-10 h-32 w-32 rounded-full bg-violet-400/8 blur-[40px]" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
