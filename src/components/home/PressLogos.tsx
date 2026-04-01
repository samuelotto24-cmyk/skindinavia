"use client";

import Image from "next/image";
import { pressLogos, pressLogoImages } from "@/lib/mock-data";

const scrollLogos = [...pressLogos, ...pressLogos];

export function PressLogos() {
  return (
    <section className="border-y border-border/50 py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-10">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Recognized Globally — You Might Have Read About Us Somewhere
        </p>
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
                  width={120}
                  height={40}
                  className="h-8 w-auto object-contain"
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
