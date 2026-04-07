"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const milestones = [
  {
    hour: "0h",
    title: "Just Applied",
    detail: "Cooling spheres activate on contact",
    status: "Fresh",
    color: "bg-sky-400",
    ringColor: "ring-sky-400/20",
  },
  {
    hour: "4h",
    title: "Post-Lunch Meeting",
    detail: "Zero shine, zero touch-ups needed",
    status: "Flawless",
    color: "bg-blue-400",
    ringColor: "ring-blue-400/20",
  },
  {
    hour: "8h",
    title: "After-Work Gym",
    detail: "Sweat-proof hold still locked in",
    status: "Holding",
    color: "bg-indigo-400",
    ringColor: "ring-indigo-400/20",
  },
  {
    hour: "12h",
    title: "Dinner Date",
    detail: "Looks like you just sat down in the chair",
    status: "Perfect",
    color: "bg-violet-400",
    ringColor: "ring-violet-400/20",
  },
  {
    hour: "16h",
    title: "Last Call",
    detail: "Still the same as hour zero",
    status: "Locked In",
    color: "bg-pink-400",
    ringColor: "ring-pink-400/20",
  },
];

export function BeforeAfter() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-14 lg:py-16">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground"
          >
            All-Day Performance
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-3 font-serif text-2xl tracking-tight sm:text-3xl"
          >
            16 Hours. One Application. Your Whole Day.
          </motion.h2>
        </div>

        {/* Timeline */}
        <div className="mt-12 relative">
          {/* Connecting line — draws across */}
          <div className="absolute top-5 left-0 right-0 h-px bg-border/30 hidden sm:block" />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 2, delay: 0.3, ease: [0.33, 1, 0.68, 1] }}
            className="absolute top-5 left-0 right-0 h-px bg-gradient-to-r from-sky-400 via-violet-400 to-pink-400 origin-left hidden sm:block"
          />

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-5 sm:gap-3">
            {milestones.map((m, i) => {
              const delay = 0.3 + i * 0.35;
              return (
                <motion.div
                  key={m.hour}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay }}
                  className="relative text-center"
                >
                  {/* Dot — pulses in */}
                  <div className="flex justify-center mb-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ type: "spring", stiffness: 400, damping: 15, delay }}
                      className="relative z-10"
                    >
                      {/* Pulse ring */}
                      <motion.div
                        initial={{ scale: 1, opacity: 0 }}
                        animate={isInView ? { scale: [1, 2.5, 2.5], opacity: [0, 0.4, 0] } : {}}
                        transition={{ duration: 0.8, delay: delay + 0.1 }}
                        className={`absolute inset-0 rounded-full ${m.color}`}
                      />
                      <div className={`h-2.5 w-2.5 rounded-full ${m.color} ring-4 ring-background`} />
                    </motion.div>
                  </div>

                  {/* Hour — counts up feel */}
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: delay + 0.1 }}
                    className="font-serif text-2xl font-light tracking-tight text-foreground/80 sm:text-3xl"
                  >
                    {m.hour}
                  </motion.p>

                  {/* Title */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.3, delay: delay + 0.2 }}
                    className="mt-1.5 text-xs font-medium uppercase tracking-wider text-foreground"
                  >
                    {m.title}
                  </motion.p>

                  {/* Detail */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.3, delay: delay + 0.25 }}
                    className="mt-1 text-[11px] leading-relaxed text-muted-foreground max-w-[140px] mx-auto"
                  >
                    {m.detail}
                  </motion.p>

                  {/* Status pill — pops in */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: delay + 0.3 }}
                    className="mt-2.5 inline-flex"
                  >
                    <span className={`rounded-full px-2.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-white ${m.color}`}>
                      {m.status}
                    </span>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 2.2 }}
          className="mt-8 text-center text-xs text-muted-foreground"
        >
          Based on clinical wear testing &middot; Results may vary by skin type
        </motion.p>
      </div>
    </section>
  );
}
