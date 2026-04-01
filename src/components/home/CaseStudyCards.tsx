"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { caseStudies } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";

export function CaseStudyCards() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="py-16 lg:py-20 border-t border-border/40 bg-gradient-to-b from-card/50 to-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
            Tested in the Field
          </p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl"
          >
            From Broadway to the Altar
          </motion.h2>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {caseStudies.map((study, i) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
            >
              <Link
                href={`/case-studies/${study.slug}`}
                className="group"
              >
                <div className="flex h-full flex-col rounded-2xl border border-border/50 bg-card p-8 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-stone-200/50">
                  <Badge variant="secondary" className="mb-4 w-fit text-[10px] uppercase tracking-wider">
                    {study.category}
                  </Badge>
                  <h3 className="text-xl font-medium tracking-tight text-foreground">
                    {study.title}
                  </h3>
                  <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">
                    {study.excerpt}
                  </p>
                  <span className="mt-6 inline-flex text-sm font-medium text-foreground underline-offset-4 transition-all group-hover:underline">
                    Read More
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
