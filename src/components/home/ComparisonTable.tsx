"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FlaskConical, Clock, Star, Leaf, Award, Users } from "lucide-react";

const reasons = [
  {
    icon: FlaskConical,
    title: "Patented Technology",
    description: "The only setting spray with temperature-control technology that actively cools and locks makeup in place.",
    color: "text-sky-600",
    bg: "bg-sky-50",
  },
  {
    icon: Clock,
    title: "16+ Hours — Tested, Not Claimed",
    description: "Independent wear tests prove 16+ hours of hold. We don't inflate numbers — we prove them.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: Users,
    title: "10,000+ Pro Artists",
    description: "The go-to spray on Broadway stages, Hollywood sets, and red carpets worldwide.",
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    icon: Star,
    title: "4.9 Stars Across 50K+ Reviews",
    description: "The highest-rated setting spray on the market — not by a little, by a lot.",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    icon: Award,
    title: "Best Value Per Ounce",
    description: "Premium formula at $29 for 4oz. Competitors charge more for less product and shorter wear.",
    color: "text-pink-600",
    bg: "bg-pink-50",
  },
  {
    icon: Leaf,
    title: "Clean, Vegan & Cruelty-Free",
    description: "Oil-free, paraben-free, and never tested on animals. Beauty without compromise.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
];

export function ComparisonTable() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-12 lg:py-14 border-t border-border/40">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="text-center mb-10">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground"
          >
            Why Skindinavia
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-3 font-serif text-2xl tracking-tight sm:text-3xl"
          >
            There's a Reason the Pros Choose Us
          </motion.h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
              className="rounded-xl border border-border/50 bg-card p-6"
            >
              <div className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${reason.bg}`}>
                <reason.icon className={`h-4.5 w-4.5 ${reason.color}`} strokeWidth={1.8} />
              </div>
              <h3 className="mt-4 text-sm font-semibold tracking-tight">{reason.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
