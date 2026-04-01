"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { blogPosts } from "@/lib/mock-data";

const latestPosts = blogPosts.slice(0, 3);

// Category color map
const categoryColors: Record<string, { bg: string; text: string }> = {
  Science: { bg: "bg-sky-100", text: "text-sky-700" },
  Bridal: { bg: "bg-pink-100", text: "text-pink-700" },
  Tips: { bg: "bg-amber-100", text: "text-amber-700" },
};

const defaultColor = { bg: "bg-neutral-100", text: "text-neutral-600" };

export function BlogPreview() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="py-14 lg:py-16 border-t border-border/40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
            Tips, Tutorials &amp; Science
          </p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl"
          >
            From the Blog
          </motion.h2>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post, i) => {
            const color = categoryColors[post.category] || defaultColor;
            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block"
                >
                  <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/50 bg-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-stone-200/50">
                    {/* Real featured image */}
                    <div className="relative h-[200px] overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        unoptimized
                      />
                    </div>
                    {/* Text content */}
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-center gap-3">
                        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ${color.bg} ${color.text}`}>
                          {post.category}
                        </span>
                        <time
                          dateTime={post.date}
                          className="text-xs text-muted-foreground"
                        >
                          {new Date(post.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </time>
                      </div>
                      <h3 className="mt-3 font-serif text-base font-medium leading-snug tracking-tight text-foreground">
                        {post.title}
                      </h3>
                      <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                        {post.excerpt}
                      </p>
                      <span className="mt-3 inline-flex text-xs font-medium text-foreground underline-offset-4 transition-all group-hover:underline">
                        Read Article &rarr;
                      </span>
                    </div>
                  </article>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
