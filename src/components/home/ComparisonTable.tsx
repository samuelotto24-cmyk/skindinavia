"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, X } from "lucide-react";

const rows = [
  {
    label: "Wear Time",
    skindinavia: "16+ hours",
    ud: "~12 hours",
    ct: "~8 hours",
    drug: "~4 hours",
  },
  {
    label: "Price (4 oz)",
    skindinavia: "$29",
    ud: "$36",
    ct: "$38 (3.4 oz)",
    drug: "$10 (2 oz)",
  },
  {
    label: "Rating",
    skindinavia: "4.9 ★",
    ud: "3.8 ★",
    ct: "4.2 ★",
    drug: "3.5 ★",
  },
];

const boolRows = [
  {
    label: "Patented Tech",
    skindinavia: true,
    ud: false,
    ct: false,
    drug: false,
  },
  {
    label: "Clean & Vegan",
    skindinavia: true,
    ud: false,
    ct: false,
    drug: true,
  },
  {
    label: "Pro Trusted",
    skindinavia: true,
    ud: false,
    ct: false,
    drug: false,
  },
];

export function ComparisonTable() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-14 lg:py-16 border-t border-border/40">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="text-center">
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

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-10 overflow-x-auto -mx-6 px-6"
        >
          <div className="min-w-[560px]">
            {/* Header row */}
            <div className="grid grid-cols-5 gap-2 pb-4 border-b border-border/50">
              <div />
              <div className="text-center">
                <p className="font-serif text-base font-medium text-foreground">Skindinavia</p>
                <p className="text-[10px] text-emerald-600 font-medium uppercase tracking-wider mt-0.5">The Original</p>
              </div>
              <div className="text-center opacity-40 grayscale">
                <p className="text-sm text-muted-foreground">Urban Decay</p>
                <p className="text-[10px] text-muted-foreground/60 mt-0.5">Reformulated</p>
              </div>
              <div className="text-center opacity-40 grayscale">
                <p className="text-sm text-muted-foreground">Charlotte Tilbury</p>
              </div>
              <div className="text-center opacity-40 grayscale">
                <p className="text-sm text-muted-foreground">Drugstore</p>
                <p className="text-[10px] text-muted-foreground/60 mt-0.5">NYX / e.l.f.</p>
              </div>
            </div>

            {/* Text rows */}
            {rows.map((row) => (
              <div key={row.label} className="grid grid-cols-5 gap-2 py-3 border-b border-border/20">
                <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground flex items-center">
                  {row.label}
                </div>
                <div className="text-center text-sm font-medium text-foreground">
                  {row.skindinavia}
                </div>
                <div className="text-center text-sm text-muted-foreground/40">
                  {row.ud}
                </div>
                <div className="text-center text-sm text-muted-foreground/40">
                  {row.ct}
                </div>
                <div className="text-center text-sm text-muted-foreground/40">
                  {row.drug}
                </div>
              </div>
            ))}

            {/* Boolean rows */}
            {boolRows.map((row) => (
              <div key={row.label} className="grid grid-cols-5 gap-2 py-3 border-b border-border/20">
                <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground flex items-center">
                  {row.label}
                </div>
                <div className="flex justify-center">
                  {row.skindinavia ? (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                    </div>
                  ) : (
                    <X className="h-4 w-4 text-red-300" />
                  )}
                </div>
                <div className="flex justify-center opacity-40">
                  {row.ud ? (
                    <Check className="h-4 w-4 text-muted-foreground/40" />
                  ) : (
                    <X className="h-4 w-4 text-muted-foreground/30" />
                  )}
                </div>
                <div className="flex justify-center opacity-40">
                  {row.ct ? (
                    <Check className="h-4 w-4 text-muted-foreground/40" />
                  ) : (
                    <X className="h-4 w-4 text-muted-foreground/30" />
                  )}
                </div>
                <div className="flex justify-center opacity-40">
                  {row.drug ? (
                    <Check className="h-4 w-4 text-muted-foreground/40" />
                  ) : (
                    <X className="h-4 w-4 text-muted-foreground/30" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 text-center text-[10px] text-muted-foreground/40"
        >
          Based on published product claims, retail pricing, and aggregated reviews as of 2025.
        </motion.p>
      </div>
    </section>
  );
}
