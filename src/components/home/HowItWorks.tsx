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
    detail: "Micro-encapsulated cooling spheres blanket your makeup in a fine, even mist.",
    accentClass: "text-sky-600",
    barColor: "bg-sky-500",
  },
  {
    number: "02",
    title: "Cool",
    detail: "Patented tech lowers surface temperature, fusing makeup to your skin.",
    accentClass: "text-indigo-600",
    barColor: "bg-indigo-500",
  },
  {
    number: "03",
    title: "Lock",
    detail: "Time-release polymers create 16+ hours of continuous wear protection.",
    accentClass: "text-violet-600",
    barColor: "bg-violet-500",
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

  return (
    <section ref={sectionRef} className="relative py-10 lg:py-14 border-t border-border/40 overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground mb-3"
          >
            U.S. Patent Protected
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-2xl tracking-tight sm:text-3xl lg:text-4xl"
          >
            The Science of{" "}
            <span className="text-muted-foreground/60">16-Hour Wear</span>
          </motion.h2>
        </div>

        {/* Animation — compact, centered */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative mx-auto w-full max-w-[280px] aspect-square mb-8"
        >
          <SkinScienceAnimation activeStage={activeStage} light />
        </motion.div>

        {/* Steps — horizontal row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {stages.map((stage, i) => {
            const isActive = i === activeStage;
            return (
              <button
                key={stage.number}
                onClick={() => { setActiveStage(i); setProgress(0); }}
                className={`text-left rounded-xl p-5 transition-all duration-500 ${
                  isActive
                    ? "bg-stone-50 border border-border/60"
                    : "bg-transparent border border-transparent hover:bg-stone-50/50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className={`font-serif text-2xl font-light transition-colors duration-500 ${
                    isActive ? stage.accentClass : "text-muted-foreground/15"
                  }`}>
                    {stage.number}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-serif text-lg tracking-tight transition-colors duration-500 ${
                      isActive ? "text-foreground" : "text-muted-foreground/30"
                    }`}>
                      {stage.title}
                    </h3>
                    <p className={`mt-1 text-xs leading-relaxed transition-colors duration-500 ${
                      isActive ? "text-muted-foreground" : "text-muted-foreground/20"
                    }`}>
                      {stage.detail}
                    </p>
                    {isActive && (
                      <div className="mt-3 h-[2px] w-full rounded-full bg-border/40 overflow-hidden">
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

        {/* CTA */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="h-11 px-8 text-sm tracking-wider uppercase"
            render={<Link href="/shop" />}
          >
            Shop Now
          </Button>
          <p className="text-[10px] text-muted-foreground/40 uppercase tracking-[0.2em]">
            Clinically Tested &middot; Made in USA &middot; Cruelty-Free
          </p>
        </div>
      </div>
    </section>
  );
}
