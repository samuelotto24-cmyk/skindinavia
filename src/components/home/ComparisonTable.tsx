"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Check, X } from "lucide-react";

const rows = [
  { label: "Wear Time", sk: "16+ hours", ud: "~12 hours", ct: "~8 hours", dr: "~4 hours" },
  { label: "Price (4 oz)", sk: "$29", ud: "$36", ct: "$38 (3.4oz)", dr: "$10 (2oz)" },
  { label: "Rating", sk: "4.9 ★", ud: "3.8 ★", ct: "4.2 ★", dr: "3.5 ★" },
];

const boolRows = [
  { label: "Patented Tech", sk: true, ud: false, ct: false, dr: false },
  { label: "Clean & Vegan", sk: true, ud: false, ct: false, dr: true },
  { label: "Pro Trusted", sk: true, ud: false, ct: false, dr: false },
];

export function ComparisonTable() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const videoRef = useRef<HTMLDivElement>(null);
  const videoInView = useInView(videoRef, { once: true, margin: "-100px" });
  const [videoStarted, setVideoStarted] = useState(false);

  useEffect(() => {
    if (videoInView && !videoStarted) setVideoStarted(true);
  }, [videoInView, videoStarted]);

  return (
    <section ref={ref} className="py-12 lg:py-14 border-t border-border/40">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="text-center mb-8">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground"
          >
            How We Compare
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-3 font-serif text-2xl tracking-tight sm:text-3xl"
          >
            The Original vs. Everyone Else
          </motion.h2>
        </div>

        {/* Comparison table — centered */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="overflow-x-auto mx-auto max-w-3xl"
        >
          <div className="min-w-[420px]">
            <div className="grid grid-cols-5 gap-1 pb-3 border-b border-border/50">
              <div />
              <div className="text-center">
                <p className="font-serif text-sm font-medium text-foreground">Skindinavia</p>
                <p className="text-[9px] text-emerald-600 font-medium uppercase tracking-wider mt-0.5">The Original</p>
              </div>
              <div className="text-center opacity-40 grayscale">
                <p className="text-xs text-muted-foreground">Urban Decay</p>
              </div>
              <div className="text-center opacity-40 grayscale">
                <p className="text-xs text-muted-foreground">Charlotte T.</p>
              </div>
              <div className="text-center opacity-40 grayscale">
                <p className="text-xs text-muted-foreground">Drugstore</p>
              </div>
            </div>

            {rows.map((row) => (
              <div key={row.label} className="grid grid-cols-5 gap-1 py-2.5 border-b border-border/20">
                <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground flex items-center">{row.label}</div>
                <div className="text-center text-xs font-medium text-foreground">{row.sk}</div>
                <div className="text-center text-xs text-muted-foreground/40">{row.ud}</div>
                <div className="text-center text-xs text-muted-foreground/40">{row.ct}</div>
                <div className="text-center text-xs text-muted-foreground/40">{row.dr}</div>
              </div>
            ))}

            {boolRows.map((row) => (
              <div key={row.label} className="grid grid-cols-5 gap-1 py-2.5 border-b border-border/20">
                <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground flex items-center">{row.label}</div>
                <div className="flex justify-center">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100">
                    <Check className="h-3 w-3 text-emerald-600" />
                  </div>
                </div>
                {[row.ud, row.ct, row.dr].map((val, i) => (
                  <div key={i} className="flex justify-center opacity-40">
                    {val ? <Check className="h-3.5 w-3.5 text-muted-foreground/40" /> : <X className="h-3.5 w-3.5 text-muted-foreground/30" />}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <p className="mt-3 text-[9px] text-muted-foreground/40 text-center">
            Based on published claims, retail pricing, and aggregated reviews.
          </p>
        </motion.div>

        {/* Video — centered below table, capped width */}
        <motion.div
          ref={videoRef}
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 mx-auto max-w-2xl"
        >
          <div className="relative aspect-video overflow-hidden rounded-xl bg-black">
            {videoStarted ? (
              <iframe
                src="https://www.youtube.com/embed/xDlJb1DGAjM?autoplay=1&mute=1&rel=0&loop=1&playlist=xDlJb1DGAjM"
                title="Skindinavia Spray Off"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            ) : (
              <img
                src="https://img.youtube.com/vi/xDlJb1DGAjM/maxresdefault.jpg"
                alt="Skindinavia comparison video"
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
          </div>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            See the difference — a side-by-side wear test
          </p>
        </motion.div>
      </div>
    </section>
  );
}
