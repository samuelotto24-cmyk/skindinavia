"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const posts = [
  {
    image: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2022/10/skindinavia_301654740_843255973747273_6612108819761506876_n.jpg",
    url: "https://instagram.com/skindinavia",
  },
  {
    image: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2022/10/skindinavia_306708562_625611635878669_1448671653329314283_n.jpg",
    url: "https://instagram.com/skindinavia",
  },
  {
    image: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2022/10/skindinavia_298772197_180775021098109_8376872377899932744_n.jpg",
    url: "https://instagram.com/skindinavia",
  },
  {
    image: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2022/10/skindinavia_291508262_170947788739315_3938528357252074175_n.jpg",
    url: "https://instagram.com/skindinavia",
  },
  {
    image: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2022/09/minimal-makeup-skindinavia-1200x1653.jpg",
    url: "https://instagram.com/skindinavia",
  },
  {
    image: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2022/08/Neon-Eyes-1200x800.jpg",
    url: "https://instagram.com/skindinavia",
  },
];

export function InstagramFeed() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section ref={ref} className="py-12 lg:py-14">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">Follow Along</p>
            <h2 className="mt-2 font-serif text-2xl tracking-tight sm:text-3xl">@skindinavia</h2>
          </div>
          <a
            href="https://instagram.com/skindinavia"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#E1306C] to-[#F77737] px-5 py-2.5 text-xs font-semibold text-white tracking-wider uppercase transition-opacity hover:opacity-90"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            Follow
          </a>
        </motion.div>

        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6 sm:gap-4">
          {posts.map((post, i) => (
            <motion.a
              key={i}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.06 }}
              className="group relative aspect-square overflow-hidden rounded-xl"
            >
              <Image
                src={post.image}
                alt="Skindinavia Instagram"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white" opacity="0.9"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
