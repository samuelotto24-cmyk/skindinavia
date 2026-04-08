"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SkinScienceAnimation } from "@/components/animation/SkinScienceAnimation";

const stages = [
  { number: "01", title: "Mist", detail: "Cooling spheres blanket your makeup in a fine, even mist.", accentClass: "text-sky-600", barColor: "bg-sky-500" },
  { number: "02", title: "Cool", detail: "Temperature drops 5°F, fusing makeup to skin.", accentClass: "text-indigo-600", barColor: "bg-indigo-500" },
  { number: "03", title: "Lock", detail: "Time-release polymers protect for 16+ hours.", accentClass: "text-violet-600", barColor: "bg-violet-500" },
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
    <section ref={sectionRef} className="relative py-10 lg:py-12 border-t border-border/40 overflow-hidden">
      <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
        {/* Header — inline */}
        <div className="mb-6">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground mb-2"
          >
            U.S. Patent Protected
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-2xl tracking-tight sm:text-3xl"
          >
            The Science of <span className="text-muted-foreground/60">16-Hour Wear</span>
          </motion.h2>
        </div>

        {/* Animation left + steps right */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 lg:gap-10">
          {/* Animation — compact */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="shrink-0 w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] lg:w-[220px] lg:h-[220px]"
          >
            <SkinScienceAnimation activeStage={activeStage} light />
          </motion.div>

          {/* Steps — tight list */}
          <div className="flex-1 w-full">
            {stages.map((stage, i) => {
              const isActive = i === activeStage;
              return (
                <button
                  key={stage.number}
                  onClick={() => { setActiveStage(i); setProgress(0); }}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-400 ${
                    isActive ? "bg-stone-50" : "hover:bg-stone-50/40"
                  }`}
                >
                  <div className="flex items-baseline gap-3">
                    <span className={`font-serif text-lg font-light transition-colors duration-400 ${
                      isActive ? stage.accentClass : "text-muted-foreground/15"
                    }`}>
                      {stage.number}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2">
                        <h3 className={`font-serif text-base tracking-tight transition-colors duration-400 ${
                          isActive ? "text-foreground" : "text-muted-foreground/30"
                        }`}>
                          {stage.title}
                        </h3>
                        <span className={`text-xs transition-colors duration-400 ${
                          isActive ? "text-muted-foreground" : "text-muted-foreground/15"
                        }`}>
                          {stage.detail}
                        </span>
                      </div>
                      {isActive && (
                        <div className="mt-2 h-[1.5px] w-full rounded-full bg-border/30 overflow-hidden">
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

            <div className="mt-4 pl-4 flex items-center gap-4">
              <Button
                size="sm"
                className="h-9 px-6 text-xs tracking-wider uppercase"
                render={<Link href="/shop" />}
              >
                Shop Now
              </Button>
              <p className="text-[9px] text-muted-foreground/35 uppercase tracking-[0.2em]">
                Clinically Tested &middot; Made in USA
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
