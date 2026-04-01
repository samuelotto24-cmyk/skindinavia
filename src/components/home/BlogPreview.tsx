"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { blogPosts, products } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";

const latestPosts = blogPosts.slice(0, 3);

// Map blog posts to product images for visual anchoring
const blogImages = [
  products.find((p) => p.id === "1")!.image, // Science — Original spray
  products.find((p) => p.id === "2")!.image, // Bridal — Bridal spray
  products.find((p) => p.id === "3")!.image, // Tips — Oil Control
];

const blogGradients = [
  "from-sky-50/50 to-blue-50/30",
  "from-rose-50/60 to-pink-50/30",
  "from-emerald-50/50 to-teal-50/30",
];

export function BlogPreview() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="py-16 lg:py-20 border-t border-border/40">
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
          {latestPosts.map((post, i) => (
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
                  {/* Image header */}
                  <div className={`relative h-[180px] bg-gradient-to-br ${blogGradients[i]} flex items-center justify-center`}>
                    <div className="relative h-[140px] w-[90px] transition-transform duration-500 group-hover:scale-110">
                      <Image
                        src={blogImages[i]}
                        alt=""
                        fill
                        className="object-contain drop-shadow-lg"
                      />
                    </div>
                  </div>
                  {/* Text content */}
                  <div className="flex flex-1 flex-col p-6">
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
                    <h3 className="mt-3 font-serif text-lg font-medium leading-snug tracking-tight text-foreground">
                      {post.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                      {post.excerpt}
                    </p>
                    <span className="mt-4 inline-flex text-sm font-medium text-foreground underline-offset-4 transition-all group-hover:underline">
                      Read Article &rarr;
                    </span>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
