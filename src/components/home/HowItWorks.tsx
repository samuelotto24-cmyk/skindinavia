"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/mock-data";

const originalProduct = products.find((p) => p.id === "1")!;

const stages = [
  {
    number: "01",
    title: "Mist",
    detail: "Micro-encapsulated cooling spheres blanket your makeup in a fine, even mist.",
    ringColor: "rgba(56, 189, 248, 0.4)",   // sky-400
    glowColor: "rgba(56, 189, 248, 0.15)",
    accentClass: "text-sky-300",
    bgGlow: "bg-sky-400/10",
  },
  {
    number: "02",
    title: "Cool",
    detail: "Patented tech lowers the surface temperature, fusing makeup to your skin.",
    ringColor: "rgba(99, 102, 241, 0.4)",    // indigo-400
    glowColor: "rgba(99, 102, 241, 0.15)",
    accentClass: "text-indigo-300",
    bgGlow: "bg-indigo-400/10",
  },
  {
    number: "03",
    title: "Lock",
    detail: "Active ingredients release over 16+ hours of continuous wear protection.",
    ringColor: "rgba(167, 139, 250, 0.4)",   // violet-400
    glowColor: "rgba(167, 139, 250, 0.15)",
    accentClass: "text-violet-300",
    bgGlow: "bg-violet-400/10",
  },
];

const STAGE_DURATION = 4000;

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  const [activeStage, setActiveStage] = useState(0);
  const [progress, setProgress] = useState(0);

  const advanceStage = useCallback(() => {
    setActiveStage((prev) => (prev + 1) % stages.length);
    setProgress(0);
  }, []);

  // Auto-advance stages
  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(advanceStage, STAGE_DURATION);
    return () => clearInterval(interval);
  }, [isInView, advanceStage]);

  // Progress bar animation
  useEffect(() => {
    if (!isInView) return;
    const start = performance.now();
    let raf: number;

    function tick(now: number) {
      const elapsed = now - start;
      setProgress(Math.min(elapsed / STAGE_DURATION, 1));
      if (elapsed < STAGE_DURATION) {
        raf = requestAnimationFrame(tick);
      }
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [activeStage, isInView]);

  const current = stages[activeStage];

  return (
    <section ref={sectionRef} className="relative py-16 lg:py-20 bg-gradient-to-b from-[#0f0f1a] via-[#141425] to-[#0f0f1a] text-white overflow-hidden">
      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")" }} />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-sky-300/80">
            Patented Technology
          </p>
          <h2 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl text-white">
            The Science of 16-Hour Wear
          </h2>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-[1fr,1.1fr] lg:gap-16">
          {/* LEFT: Animated visualization */}
          <div className="relative flex items-center justify-center">
            <div className="relative h-[360px] w-[360px] sm:h-[400px] sm:w-[400px]">

              {/* Outer ambient glow — changes color per stage */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`glow-${activeStage}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 1.2 }}
                  className={`absolute inset-0 rounded-full ${current.bgGlow} blur-[60px] scale-125`}
                />
              </AnimatePresence>

              {/* Ring 1 — outermost, slow pulse */}
              <motion.div
                animate={{
                  scale: activeStage === 0 ? [1, 1.15, 1] : activeStage === 2 ? [1.1, 0.95, 1.1] : [1, 1.05, 1],
                  opacity: activeStage === 0 ? [0.15, 0.35, 0.15] : activeStage === 2 ? [0.3, 0.5, 0.3] : [0.1, 0.2, 0.1],
                }}
                transition={{ duration: activeStage === 0 ? 2 : 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full border"
                style={{ borderColor: current.ringColor }}
              />

              {/* Ring 2 — mid ring */}
              <motion.div
                animate={{
                  scale: activeStage === 0 ? [0.85, 1.0, 0.85] : activeStage === 1 ? [0.8, 0.88, 0.8] : [0.85, 0.78, 0.85],
                  opacity: activeStage === 1 ? [0.3, 0.6, 0.3] : [0.15, 0.3, 0.15],
                }}
                transition={{ duration: activeStage === 1 ? 1.8 : 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                className="absolute inset-[15%] rounded-full border"
                style={{ borderColor: current.ringColor }}
              />

              {/* Ring 3 — inner ring, fastest */}
              <motion.div
                animate={{
                  scale: activeStage === 2 ? [0.95, 0.85, 0.95] : activeStage === 0 ? [0.7, 0.82, 0.7] : [0.75, 0.7, 0.75],
                  opacity: activeStage === 2 ? [0.4, 0.7, 0.4] : [0.1, 0.25, 0.1],
                }}
                transition={{ duration: activeStage === 2 ? 1.5 : 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                className="absolute inset-[30%] rounded-full border"
                style={{ borderColor: current.ringColor }}
              />

              {/* Orbiting dots — MIST stage: dots fly outward */}
              {activeStage === 0 && (
                <>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div
                      key={`mist-${i}`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: [0, 0.8, 0],
                        scale: [0, 1, 0.5],
                        x: [0, Math.cos((i * Math.PI * 2) / 8) * 160],
                        y: [0, Math.sin((i * Math.PI * 2) / 8) * 160],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeOut",
                      }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-sky-300"
                    />
                  ))}
                </>
              )}

              {/* Orbiting dots — COOL stage: dots orbit in a circle */}
              {activeStage === 1 && (
                <>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <motion.div
                      key={`orbit-${i}`}
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "linear",
                        delay: i * 1,
                      }}
                      className="absolute inset-[10%]"
                      style={{ transformOrigin: "center center" }}
                    >
                      <motion.div
                        animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-indigo-300"
                      />
                    </motion.div>
                  ))}
                </>
              )}

              {/* Shield pulse — LOCK stage */}
              {activeStage === 2 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{
                    opacity: [0, 0.3, 0.15, 0.3],
                    scale: [0.6, 0.72, 0.68, 0.72],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-[18%] rounded-full"
                  style={{ background: `radial-gradient(circle, ${current.glowColor} 0%, transparent 70%)` }}
                />
              )}

              {/* Center: Product bottle */}
              <div className="absolute inset-[25%] flex items-center justify-center z-10">
                <div className="relative h-full w-[60%]">
                  <Image
                    src={originalProduct.image}
                    alt="Skindinavia Setting Spray"
                    fill
                    className="object-contain drop-shadow-[0_0_30px_rgba(56,189,248,0.15)]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Steps + progress */}
          <div>
            <div className="space-y-2">
              {stages.map((stage, i) => {
                const isActive = i === activeStage;
                return (
                  <button
                    key={stage.number}
                    onClick={() => { setActiveStage(i); setProgress(0); }}
                    className={`w-full text-left rounded-xl p-5 transition-all duration-500 ${
                      isActive
                        ? "bg-white/[0.06] border border-white/10"
                        : "bg-transparent border border-transparent hover:bg-white/[0.03]"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <span className={`font-serif text-3xl font-light transition-colors duration-500 ${
                        isActive ? stage.accentClass : "text-white/15"
                      }`}>
                        {stage.number}
                      </span>
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-serif text-xl tracking-tight transition-colors duration-500 ${
                          isActive ? "text-white" : "text-white/30"
                        }`}>
                          {stage.title}
                        </h3>
                        <p className={`mt-1 text-sm leading-relaxed transition-colors duration-500 ${
                          isActive ? "text-white/60" : "text-white/15"
                        }`}>
                          {stage.detail}
                        </p>
                        {/* Progress bar */}
                        {isActive && (
                          <div className="mt-3 h-0.5 w-full rounded-full bg-white/10 overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              style={{
                                width: `${progress * 100}%`,
                                backgroundColor: stages[i].ringColor,
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex items-center gap-5 pl-5">
              <Button
                size="lg"
                className="h-11 px-8 text-sm tracking-wider uppercase bg-white text-[#0f0f1a] hover:bg-white/90"
                render={<Link href="/shop" />}
              >
                Shop Now
              </Button>
              <p className="text-[10px] text-white/20 uppercase tracking-wider hidden sm:block">
                U.S. Patent Protected &middot; Clinically Tested &middot; Made in USA
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
