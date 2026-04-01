"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { blogPosts } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";

const latestPosts = blogPosts.slice(0, 3);

export function BlogPreview() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Tips, Tutorials & Science
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

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group"
              >
                <article className="flex h-full flex-col rounded-2xl border border-border/50 bg-card p-8 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-stone-200/50">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">
                      {post.category}
                    </Badge>
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
                  <h3 className="mt-4 text-lg font-medium leading-snug tracking-tight text-foreground">
                    {post.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                    {post.excerpt}
                  </p>
                  <span className="mt-6 inline-flex text-sm font-medium text-foreground underline-offset-4 transition-all group-hover:underline">
                    Read More
                  </span>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
