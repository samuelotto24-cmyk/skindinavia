"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Mist",
    description:
      "A fine cooling mist blankets your makeup in thousands of micro-encapsulated temperature-control spheres.",
  },
  {
    number: "02",
    title: "Cool",
    description:
      "Our patented technology lowers the surface temperature of your makeup, fusing it to your skin — not sealing it on top.",
  },
  {
    number: "03",
    title: "Lock",
    description:
      "Spheres of varying sizes release active ingredients over 16+ hours, continuously cooling and controlling oil.",
  },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-16 lg:py-20 border-y border-border/40 bg-gradient-to-b from-card/80 via-card to-card/80">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs font-medium uppercase tracking-[0.25em] text-brand-gold"
          >
            Patented Technology
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-4 font-serif text-3xl tracking-tight sm:text-4xl lg:text-5xl"
          >
            The Science of 16-Hour Wear
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto mt-4 max-w-xl text-muted-foreground"
          >
            Everyone else seals makeup on. We cool it in. That&apos;s the difference a patent makes.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="mt-12 grid gap-8 lg:grid-cols-3 lg:gap-12">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.15 }}
              className="relative text-center lg:text-left"
            >
              <p className="font-serif text-6xl font-light text-border/80 lg:text-7xl">
                {step.number}
              </p>
              <h3 className="mt-4 font-serif text-2xl tracking-tight">
                {step.title}
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {step.description}
              </p>

              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 -right-6 w-12 border-t border-dashed border-border" />
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 text-center"
        >
          <p className="text-sm text-muted-foreground">
            U.S. Patent Protected &middot; Clinically Tested &middot; Made in USA
          </p>
        </motion.div>
      </div>
    </section>
  );
}
