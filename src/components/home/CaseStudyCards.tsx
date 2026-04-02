"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { caseStudies, products } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";

// Map each case study to a relevant product image for visual interest
const caseStudyImages: Record<string, string> = {
  cs1: products.find((p) => p.id === "1")!.image, // Original — healthcare pros
  cs2: products.find((p) => p.id === "1")!.image, // Original — Broadway
  cs3: products.find((p) => p.id === "2")!.image, // Bridal — destination weddings
  cs4: products.find((p) => p.id === "3")!.image, // Oil Control — film sets
};

// Gradient per case study for variety
const caseStudyGradients: Record<string, string> = {
  cs1: "from-blue-50/60 to-sky-50/30",
  cs2: "from-amber-50/50 to-orange-50/30",
  cs3: "from-rose-50/60 to-pink-50/30",
  cs4: "from-violet-50/50 to-purple-50/30",
};

export function CaseStudyCards() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="py-12 lg:py-14 border-t border-border/40 bg-gradient-to-b from-card/50 to-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
            Tested in the Field
          </p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-3 font-serif text-2xl tracking-tight sm:text-3xl"
          >
            From Broadway to the Altar
          </motion.h2>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {caseStudies.map((study, i) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
            >
              <Link
                href={`/case-studies/${study.slug}`}
                className="group block"
              >
                <div className="flex h-full overflow-hidden rounded-2xl border border-border/50 bg-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-stone-200/50">
                  {/* Product image column */}
                  <div className={`relative hidden sm:block w-[140px] shrink-0 bg-gradient-to-br ${caseStudyGradients[study.id]}`}>
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                      <Image
                        src={caseStudyImages[study.id]}
                        alt=""
                        width={100}
                        height={160}
                        className="h-auto max-h-[140px] w-auto object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  </div>
                  {/* Text content */}
                  <div className="flex flex-1 flex-col p-5">
                    <Badge variant="secondary" className="mb-2 w-fit text-[9px] uppercase tracking-wider">
                      {study.category}
                    </Badge>
                    <h3 className="font-serif text-base font-medium tracking-tight text-foreground">
                      {study.title}
                    </h3>
                    <p className="mt-1.5 flex-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                      {study.excerpt}
                    </p>
                    <span className="mt-3 inline-flex text-xs font-medium text-foreground underline-offset-4 transition-all group-hover:underline">
                      Read Case Study &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
