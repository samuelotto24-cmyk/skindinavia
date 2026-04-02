"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { reviews } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";

// Map reviews to product color tints based on content
const reviewTints: Record<string, { bg: string; border: string }> = {
  r1: { bg: "bg-pink-50/50", border: "border-pink-200/30" },       // Bridal review
  r2: { bg: "bg-blue-50/50", border: "border-blue-200/30" },       // Pro/Original review
  r3: { bg: "bg-sky-50/50", border: "border-sky-200/30" },         // Original review
  r4: { bg: "bg-emerald-50/50", border: "border-emerald-200/30" }, // Oil Control review
  r5: { bg: "bg-violet-50/50", border: "border-violet-200/30" },   // General review
};

const defaultTint = { bg: "bg-card", border: "border-border/30" };

export function ReviewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const maxIndex = reviews.length - 1;

  const next = useCallback(() => {
    setCurrentIndex((i) => (i >= maxIndex ? 0 : i + 1));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setCurrentIndex((i) => (i <= 0 ? maxIndex : i - 1));
  }, [maxIndex]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const visibleReviews = Array.from({ length: 3 }, (_, i) => {
    const idx = (currentIndex + i) % reviews.length;
    return reviews[idx];
  });

  return (
    <section className="py-14 lg:py-16 border-t border-brand-gold/20 bg-gradient-to-b from-amber-50/30 via-background to-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand-gold">
            5,000+ Five-Star Reviews
          </p>
          <h2 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">
            What Our Customers Say
          </h2>
        </div>

        <div
          className="mt-10"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="grid gap-6 md:grid-cols-3">
            <AnimatePresence mode="wait">
            {visibleReviews.map((review, i) => {
              const tint = reviewTints[review.id] || defaultTint;
              return (
                <motion.div
                  key={`${review.id}-${currentIndex}-${i}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ type: "spring", stiffness: 200, damping: 25, delay: i * 0.05 }}
                  className={`rounded-2xl border ${tint.border} ${tint.bg} p-10 ${
                    i > 0 ? "hidden md:block" : ""
                  }`}
                >
                  <div className="flex gap-0.5 text-brand-gold">
                    {Array.from({ length: 5 }, (_, s) => (
                      <span key={s} className="text-lg">
                        {s < review.rating ? "\u2605" : "\u2606"}
                      </span>
                    ))}
                  </div>

                  <h4 className="mt-5 font-serif text-lg tracking-tight">
                    {review.title}
                  </h4>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-5">
                    &ldquo;{review.body}&rdquo;
                  </p>

                  <div className="mt-6 flex items-center gap-2">
                    <span className="text-sm font-medium">{review.author}</span>
                    {review.verified && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                          className="shrink-0"
                        >
                          <path
                            d="M8.5 3L4.25 7.25 2 5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Verified
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center justify-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="size-10 rounded-full"
              onClick={prev}
              aria-label="Previous reviews"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M10 12L6 8L10 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>

            <div className="flex gap-1.5">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? "w-6 bg-foreground"
                      : "w-1.5 bg-border hover:bg-muted-foreground/40"
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              className="size-10 rounded-full"
              onClick={next}
              aria-label="Next reviews"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M6 12L10 8L6 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
