"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { pressLogos, pressLogoImages } from "@/lib/mock-data";

const scrollLogos = [...pressLogos, ...pressLogos];

export function PressLogos() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="py-10 overflow-hidden bg-gradient-to-r from-rose-50/30 via-sky-50/20 to-violet-50/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-8">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground"
        >
          As Seen In
        </motion.p>
      </div>

      <div className="relative group">
        <div className="flex items-center gap-16 group-hover:[animation-play-state:paused]" style={{ animation: "marquee 40s linear infinite", width: "max-content" }}>
          {scrollLogos.map((name, i) => {
            const logoUrl = pressLogoImages[name];
            if (!logoUrl) return null;
            return (
              <div
                key={`${name}-${i}`}
                className="shrink-0 opacity-40 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
              >
                <Image
                  src={logoUrl}
                  alt={name}
                  width={160}
                  height={48}
                  className="h-10 w-auto object-contain sm:h-12"
                  unoptimized
                />
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
