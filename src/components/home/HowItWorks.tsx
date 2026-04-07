"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SkinScienceAnimation } from "@/components/animation/SkinScienceAnimation";

const stages = [
  {
    number: "01",
    title: "Mist",
    detail: "Micro-encapsulated cooling spheres blanket your makeup in a fine, even mist — engineered for uniform coverage at the molecular level.",
    accentClass: "text-sky-300",
    barColor: "bg-sky-400",
    ringColor: "rgba(56, 189, 248, 0.4)",
    glowColor: "rgba(56, 189, 248, 0.15)",
  },
  {
    number: "02",
    title: "Cool",
    detail: "Patented temperature-control technology lowers surface temperature by 5°F, fusing makeup to your skin with a cooling micro-barrier.",
    accentClass: "text-indigo-300",
    barColor: "bg-indigo-400",
    ringColor: "rgba(99, 102, 241, 0.4)",
    glowColor: "rgba(99, 102, 241, 0.15)",
  },
  {
    number: "03",
    title: "Lock",
    detail: "Time-release polymers activate over 16+ hours, creating continuous wear protection that outlasts sweat, humidity, and tears.",
    accentClass: "text-violet-300",
    barColor: "bg-violet-400",
    ringColor: "rgba(167, 139, 250, 0.4)",
    glowColor: "rgba(167, 139, 250, 0.15)",
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

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(advanceStage, STAGE_DURATION);
    return () => clearInterval(interval);
  }, [isInView, advanceStage]);

  useEffect(() => {
    if (!isInView) return;
    const start = performance.now();
    let raf: number;
    function tick(now: number) {
      setProgress(Math.min((now - start) / STAGE_DURATION, 1));
      if (now - start < STAGE_DURATION) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [activeStage, isInView]);

  const currentStage = stages[activeStage];

  return (
    <section ref={sectionRef} className="relative py-14 lg:py-20 bg-gradient-to-b from-[#08080f] via-[#0d0d1a] to-[#08080f] text-white overflow-hidden">
      {/* Ambient glow */}
      <motion.div
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[200px] pointer-events-none"
        style={{ background: currentStage.glowColor }}
      />

      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")" }} />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/30 mb-4"
          >
            U.S. Patent Protected
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-3xl tracking-tight sm:text-4xl lg:text-5xl"
          >
            <span className="text-white">
              The Science of
            </span>
            <br />
            <span className="bg-gradient-to-r from-white/80 via-white/60 to-white/40 bg-clip-text text-transparent">
              16-Hour Wear
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-4 mx-auto max-w-lg text-sm leading-relaxed text-white/35"
          >
            The only setting spray with patented temperature-control technology.
          </motion.p>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* LEFT: SVG Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative mx-auto w-full max-w-[420px] aspect-square"
          >
            {/* Glow ring behind animation */}
            <div
              className="absolute inset-[-20%] rounded-full blur-[80px] opacity-20 transition-colors duration-1000"
              style={{ background: currentStage.ringColor }}
            />
            <SkinScienceAnimation activeStage={activeStage} />
          </motion.div>

          {/* RIGHT: Interactive steps */}
          <div>
            <div className="space-y-3">
              {stages.map((stage, i) => {
                const isActive = i === activeStage;
                return (
                  <button
                    key={stage.number}
                    onClick={() => { setActiveStage(i); setProgress(0); }}
                    className={`w-full text-left rounded-2xl p-6 transition-all duration-500 ${
                      isActive
                        ? "bg-white/[0.06] border border-white/[0.08] backdrop-blur-sm shadow-[0_0_40px_rgba(255,255,255,0.02)]"
                        : "bg-transparent border border-transparent hover:bg-white/[0.02]"
                    }`}
                  >
                    <div className="flex items-start gap-5">
                      <span className={`font-serif text-4xl font-light transition-colors duration-500 ${
                        isActive ? stage.accentClass : "text-white/10"
                      }`}>
                        {stage.number}
                      </span>
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-serif text-2xl tracking-tight transition-colors duration-500 ${
                          isActive ? "text-white" : "text-white/25"
                        }`}>
                          {stage.title}
                        </h3>
                        <p className={`mt-2 text-sm leading-relaxed transition-all duration-500 ${
                          isActive ? "text-white/55 max-h-24" : "text-white/10 max-h-0 overflow-hidden"
                        }`}>
                          {stage.detail}
                        </p>
                        {isActive && (
                          <div className="mt-4 h-[2px] w-full rounded-full bg-white/[0.06] overflow-hidden">
                            <div
                              className={`h-full rounded-full ${stage.barColor} transition-none`}
                              style={{ width: `${progress * 100}%` }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-5 pl-6">
              <Button
                size="lg"
                className="h-12 px-10 text-sm tracking-wider uppercase bg-white text-[#0f0f1a] hover:bg-white/90"
                render={<Link href="/shop" />}
              >
                Shop Now
              </Button>
              <div className="flex flex-col gap-1">
                <p className="text-[10px] text-white/25 uppercase tracking-[0.2em]">
                  Clinically Tested &middot; Made in USA
                </p>
                <p className="text-[10px] text-white/15 uppercase tracking-[0.2em]">
                  Cruelty-Free &middot; Oil-Free &middot; Vegan
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
