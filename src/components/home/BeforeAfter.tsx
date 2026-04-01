"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export function BeforeAfter() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  function handleMove(clientX: number) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }

  return (
    <section ref={sectionRef} className="py-14 lg:py-16">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground"
          >
            See the Difference
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-3 font-serif text-2xl tracking-tight sm:text-3xl"
          >
            16 Hours. Zero Touch-Ups.
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-10"
        >
          {/* Slider container */}
          <div
            ref={containerRef}
            className="relative aspect-[16/9] overflow-hidden rounded-2xl cursor-col-resize select-none"
            onMouseMove={(e) => {
              if (e.buttons === 1) handleMove(e.clientX);
            }}
            onMouseDown={(e) => handleMove(e.clientX)}
            onTouchMove={(e) => handleMove(e.touches[0].clientX)}
          >
            {/* "After" side — full background (with Skindinavia) */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#faf5f0] to-[#f5efe8]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="font-serif text-5xl font-light text-foreground/10 sm:text-7xl lg:text-8xl">16h</p>
                  <p className="mt-2 text-sm font-medium uppercase tracking-wider text-foreground/60">With Skindinavia</p>
                  <p className="mt-1 text-xs text-foreground/40">Flawless. Still locked in.</p>
                </div>
              </div>
              {/* Subtle radial glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-pink-200/20 blur-[80px]" />
            </div>

            {/* "Before" side — clipped (without Skindinavia) */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-neutral-200 to-neutral-300 grayscale"
              style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="font-serif text-5xl font-light text-neutral-400/40 sm:text-7xl lg:text-8xl">4h</p>
                  <p className="mt-2 text-sm font-medium uppercase tracking-wider text-neutral-500/70">Without</p>
                  <p className="mt-1 text-xs text-neutral-400/60">Fading. Creasing. Melting.</p>
                </div>
              </div>
              {/* Smudge/mess texture overlay */}
              <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.4' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />
            </div>

            {/* Slider handle */}
            <div
              className="absolute top-0 bottom-0 z-10 flex items-center"
              style={{ left: `${position}%` }}
            >
              <div className="relative h-full w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.3)]">
                {/* Drag handle circle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M5 3L2 8L5 13" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M11 3L14 8L11 13" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Labels */}
            <div className="absolute top-4 left-4 z-20 rounded-full bg-black/40 backdrop-blur-sm px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white">
              Without
            </div>
            <div className="absolute top-4 right-4 z-20 rounded-full bg-white/80 backdrop-blur-sm px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-foreground">
              With Skindinavia
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Drag to compare &middot; Based on clinical wear testing
          </p>
        </motion.div>
      </div>
    </section>
  );
}
