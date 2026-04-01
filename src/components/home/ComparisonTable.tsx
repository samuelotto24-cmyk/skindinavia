"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, X, Minus } from "lucide-react";

const competitors = [
  {
    name: "Skindinavia",
    highlight: true,
    wear: "16+ hours",
    price: "$29 / 4 oz",
    pricePerOz: "$7.25",
    patent: true,
    clean: true,
    proTrusted: true,
    rating: "4.9",
    reviews: "50,000+",
  },
  {
    name: "Urban Decay",
    subtitle: "Reformulated",
    highlight: false,
    wear: "~12 hours",
    price: "$36 / 4 oz",
    pricePerOz: "$9.00",
    patent: false,
    clean: false,
    proTrusted: false,
    rating: "3.8",
    reviews: "Mixed",
  },
  {
    name: "Charlotte Tilbury",
    highlight: false,
    wear: "~8 hours",
    price: "$38 / 3.4 oz",
    pricePerOz: "$11.18",
    patent: false,
    clean: false,
    proTrusted: false,
    rating: "4.2",
    reviews: "Moderate",
  },
  {
    name: "Drugstore",
    subtitle: "NYX / e.l.f.",
    highlight: false,
    wear: "~4 hours",
    price: "$10 / 2 oz",
    pricePerOz: "$5.00",
    patent: false,
    clean: false,
    proTrusted: false,
    rating: "3.5",
    reviews: "Low",
  },
];

const rows = [
  { label: "Wear Time", key: "wear" as const },
  { label: "Price", key: "price" as const },
  { label: "Price / oz", key: "pricePerOz" as const },
  { label: "Rating", key: "rating" as const },
  { label: "Reviews", key: "reviews" as const },
];

const boolRows = [
  { label: "Patented Tech", key: "patent" as const },
  { label: "Clean Formula", key: "clean" as const },
  { label: "Pro Artist Trusted", key: "proTrusted" as const },
];

export function ComparisonTable() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-14 lg:py-16 border-t border-border/40">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
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
          className="mt-10 overflow-x-auto"
        >
          <table className="w-full min-w-[600px] text-sm">
            {/* Header row — brand names */}
            <thead>
              <tr>
                <th className="pb-4 pr-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground" />
                {competitors.map((c) => (
                  <th
                    key={c.name}
                    className={`pb-4 px-3 text-center ${c.highlight ? "" : "grayscale opacity-60"}`}
                  >
                    <p className={`text-sm font-medium ${c.highlight ? "font-serif text-base text-foreground" : "text-muted-foreground"}`}>
                      {c.name}
                    </p>
                    {c.subtitle && (
                      <p className="text-[10px] text-muted-foreground/60 mt-0.5">{c.subtitle}</p>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Text rows */}
              {rows.map((row) => (
                <tr key={row.label} className="border-t border-border/30">
                  <td className="py-3 pr-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {row.label}
                  </td>
                  {competitors.map((c) => (
                    <td
                      key={c.name}
                      className={`py-3 px-3 text-center ${
                        c.highlight
                          ? "font-medium text-foreground"
                          : "text-muted-foreground/50"
                      }`}
                    >
                      {c[row.key]}
                    </td>
                  ))}
                </tr>
              ))}
              {/* Boolean rows */}
              {boolRows.map((row) => (
                <tr key={row.label} className="border-t border-border/30">
                  <td className="py-3 pr-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {row.label}
                  </td>
                  {competitors.map((c) => (
                    <td key={c.name} className="py-3 px-3 text-center">
                      {c.highlight ? (
                        c[row.key] ? (
                          <Check className="mx-auto h-4 w-4 text-emerald-500" />
                        ) : (
                          <X className="mx-auto h-4 w-4 text-red-400" />
                        )
                      ) : c[row.key] ? (
                        <Minus className="mx-auto h-4 w-4 text-muted-foreground/30" />
                      ) : (
                        <X className="mx-auto h-4 w-4 text-muted-foreground/20" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 text-center text-[10px] text-muted-foreground/50"
        >
          Data based on published product claims, retail pricing, and aggregated customer reviews as of 2025.
        </motion.p>
      </div>
    </section>
  );
}
