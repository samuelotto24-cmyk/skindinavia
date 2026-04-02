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
    accentClass: "text-sky-300",
    barColor: "bg-sky-400",
    ringColor: "rgba(56, 189, 248, 0.4)",
  },
  {
    number: "02",
    title: "Cool",
    detail: "Patented tech lowers the surface temperature, fusing makeup to your skin.",
    accentClass: "text-indigo-300",
    barColor: "bg-indigo-400",
    ringColor: "rgba(99, 102, 241, 0.4)",
  },
  {
    number: "03",
    title: "Lock",
    detail: "Active ingredients release over 16+ hours of continuous wear protection.",
    accentClass: "text-violet-300",
    barColor: "bg-violet-400",
    ringColor: "rgba(167, 139, 250, 0.4)",
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
    <section ref={sectionRef} className="relative py-10 lg:py-12 bg-gradient-to-b from-[#0f0f1a] via-[#141425] to-[#0f0f1a] text-white overflow-hidden">
      {/* Noise */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")" }} />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-sky-300/80">
            Patented Technology
          </p>
          <h2 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl text-white">
            The Science of 16-Hour Wear
          </h2>
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* LEFT: SVG Animation */}
          <div className="relative mx-auto w-full max-w-[420px] aspect-square">
            <SkinScienceAnimation activeStage={activeStage} />
          </div>

          {/* RIGHT: Interactive steps */}
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
                        {isActive && (
                          <div className="mt-3 h-0.5 w-full rounded-full bg-white/10 overflow-hidden">
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
