"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { products } from "@/lib/mock-data";

const originalProduct = products.find((p) => p.id === "1")!;

const steps = [
  {
    number: "01",
    title: "Mist",
    description:
      "A fine cooling mist blankets your makeup in thousands of micro-encapsulated temperature-control spheres.",
    color: "text-sky-400/60",
  },
  {
    number: "02",
    title: "Cool",
    description:
      "Our patented technology lowers the surface temperature of your makeup, fusing it to your skin — not sealing it on top.",
    color: "text-blue-400/60",
  },
  {
    number: "03",
    title: "Lock",
    description:
      "Spheres of varying sizes release active ingredients over 16+ hours, continuously cooling and controlling oil.",
    color: "text-violet-400/60",
  },
];

export function HowItWorks() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Product bottle scale & rotation based on scroll
  const bottleScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.95]);
  const bottleRotate = useTransform(scrollYProgress, [0, 1], [-3, 3]);

  // Each step fades in at different scroll positions
  const step1Opacity = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]);
  const step1Y = useTransform(scrollYProgress, [0.05, 0.2], [40, 0]);
  const step2Opacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const step2Y = useTransform(scrollYProgress, [0.3, 0.5], [40, 0]);
  const step3Opacity = useTransform(scrollYProgress, [0.55, 0.75], [0, 1]);
  const step3Y = useTransform(scrollYProgress, [0.55, 0.75], [40, 0]);

  const stepAnimations = [
    { opacity: step1Opacity, y: step1Y },
    { opacity: step2Opacity, y: step2Y },
    { opacity: step3Opacity, y: step3Y },
  ];

  // Footer text
  const footerOpacity = useTransform(scrollYProgress, [0.8, 0.95], [0, 1]);

  return (
    <section ref={containerRef} className="relative h-[300vh] border-y border-border/40">
      {/* Sticky container — pins for the full scroll */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden bg-gradient-to-b from-card/80 via-card to-card/80">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          {/* Header — always visible */}
          <div className="text-center mb-12">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-gold">
              Patented Technology
            </p>
            <h2 className="mt-4 font-serif text-3xl tracking-tight sm:text-4xl lg:text-5xl">
              The Science of 16-Hour Wear
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Everyone else seals makeup on. We cool it in. That&apos;s the difference a patent makes.
            </p>
          </div>

          {/* Main content: steps on left, product on right */}
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Steps — scroll-triggered one by one */}
            <div className="space-y-10">
              {steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  style={{
                    opacity: stepAnimations[i].opacity,
                    y: stepAnimations[i].y,
                  }}
                  className="flex gap-6 items-start"
                >
                  <span className={`font-serif text-5xl font-light ${step.color} shrink-0 leading-none`}>
                    {step.number}
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl tracking-tight">
                      {step.title}
                    </h3>
                    <p className="mt-2 leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Patent footer */}
              <motion.p
                style={{ opacity: footerOpacity }}
                className="text-sm text-muted-foreground pt-4"
              >
                U.S. Patent Protected &middot; Clinically Tested &middot; Made in USA
              </motion.p>
            </div>

            {/* Product bottle — transforms as you scroll */}
            <div className="hidden lg:flex justify-center">
              <motion.div
                style={{
                  scale: bottleScale,
                  rotate: bottleRotate,
                }}
                className="relative h-[400px] w-[260px]"
              >
                <Image
                  src={originalProduct.image}
                  alt={originalProduct.name}
                  fill
                  className="object-contain drop-shadow-2xl"
                />
                {/* Subtle glow behind bottle */}
                <div className="absolute inset-0 -z-10 scale-150 rounded-full bg-brand-gold-light/20 blur-[80px]" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
