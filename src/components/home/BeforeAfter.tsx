"use client";

import { useRef, useState } from "react";
import Image from "next/image";
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
            {/* "After" side — full background (with Skindinavia) — flawless makeup */}
            <div className="absolute inset-0">
              <Image
                src="https://skindinavia.wpenginepowered.com/wp-content/uploads/2022/09/bride-makeup-trends-in-2022-1200x798.jpg"
                alt="Flawless makeup with Skindinavia after 16 hours"
                fill
                className="object-cover"
                unoptimized
              />
              {/* Warm tint overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
              {/* Label */}
              <div className="absolute bottom-6 right-6 z-20 text-right">
                <p className="font-serif text-3xl font-light text-white sm:text-4xl">16h</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-white/80">With Skindinavia</p>
                <p className="text-[10px] text-white/50">Flawless. Still locked in.</p>
              </div>
            </div>

            {/* "Before" side — clipped (without) — desaturated, degraded */}
            <div
              className="absolute inset-0 grayscale"
              style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
            >
              <Image
                src="https://skindinavia.wpenginepowered.com/wp-content/uploads/2022/09/bride-makeup-trends-in-2022-1200x798.jpg"
                alt="Makeup fading without setting spray"
                fill
                className="object-cover brightness-75 contrast-75"
                unoptimized
              />
              {/* Degraded overlay — warm smudge effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-neutral-500/20 via-transparent to-black/40" />
              {/* Noise/texture to simulate degraded skin */}
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.5' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />
              {/* Label */}
              <div className="absolute bottom-6 left-6 z-20">
                <p className="font-serif text-3xl font-light text-white/70 sm:text-4xl">4h</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-white/50">Without</p>
                <p className="text-[10px] text-white/30">Fading. Creasing. Melting.</p>
              </div>
            </div>

            {/* Slider handle */}
            <div
              className="absolute top-0 bottom-0 z-10 flex items-center"
              style={{ left: `${position}%` }}
            >
              <div className="relative h-full w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.3)]">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M5 3L2 8L5 13" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M11 3L14 8L11 13" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Corner labels */}
            <div className="absolute top-4 left-4 z-20 rounded-full bg-black/50 backdrop-blur-sm px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-white">
              Without Setting Spray
            </div>
            <div className="absolute top-4 right-4 z-20 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-foreground">
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
