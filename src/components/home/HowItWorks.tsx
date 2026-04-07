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
    accentClass: "text-sky-600",
    barColor: "bg-sky-500",
  },
  {
    number: "02",
    title: "Cool",
    detail: "Patented temperature-control technology lowers surface temperature by 5°F, fusing makeup to your skin with a cooling micro-barrier.",
    accentClass: "text-indigo-600",
    barColor: "bg-indigo-500",
  },
  {
    number: "03",
    title: "Lock",
    detail: "Time-release polymers activate over 16+ hours, creating continuous wear protection that outlasts sweat, humidity, and tears.",
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
    <section ref={sectionRef} className="relative py-14 lg:py-20 border-t border-border/40 overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground mb-4"
          >
            U.S. Patent Protected
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-3xl tracking-tight sm:text-4xl lg:text-5xl"
          >
            The Science of
            <br />
            <span className="text-muted-foreground/60">16-Hour Wear</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-4 mx-auto max-w-lg text-sm leading-relaxed text-muted-foreground"
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
            <SkinScienceAnimation activeStage={activeStage} light />
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
                        ? "bg-stone-50 border border-border/60"
                        : "bg-transparent border border-transparent hover:bg-stone-50/50"
                    }`}
                  >
                    <div className="flex items-start gap-5">
                      <span className={`font-serif text-4xl font-light transition-colors duration-500 ${
                        isActive ? stage.accentClass : "text-muted-foreground/15"
                      }`}>
                        {stage.number}
                      </span>
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-serif text-2xl tracking-tight transition-colors duration-500 ${
                          isActive ? "text-foreground" : "text-muted-foreground/30"
                        }`}>
                          {stage.title}
                        </h3>
                        <p className={`mt-2 text-sm leading-relaxed transition-all duration-500 ${
                          isActive ? "text-muted-foreground max-h-24" : "text-muted-foreground/20 max-h-0 overflow-hidden"
                        }`}>
                          {stage.detail}
                        </p>
                        {isActive && (
                          <div className="mt-4 h-[2px] w-full rounded-full bg-border/40 overflow-hidden">
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
                className="h-12 px-10 text-sm tracking-wider uppercase"
                render={<Link href="/shop" />}
              >
                Shop Now
              </Button>
              <div className="flex flex-col gap-1">
                <p className="text-[10px] text-muted-foreground/50 uppercase tracking-[0.2em]">
                  Clinically Tested &middot; Made in USA
                </p>
                <p className="text-[10px] text-muted-foreground/35 uppercase tracking-[0.2em]">
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
