"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Play } from "lucide-react";

export function VideoSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [playing, setPlaying] = useState(false);

  return (
    <section ref={ref} className="py-14 lg:py-16">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground"
          >
            See It in Action
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-3 font-serif text-2xl tracking-tight sm:text-3xl"
          >
            The Spray Off
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 relative aspect-video overflow-hidden rounded-2xl bg-black"
        >
          {playing ? (
            <iframe
              src="https://www.youtube.com/embed/xDlJb1DGAjM?autoplay=1&rel=0"
              title="Skindinavia Spray Off"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          ) : (
            <button
              onClick={() => setPlaying(true)}
              className="absolute inset-0 flex items-center justify-center group cursor-pointer"
            >
              {/* Thumbnail */}
              <img
                src="https://img.youtube.com/vi/xDlJb1DGAjM/maxresdefault.jpg"
                alt="Watch Skindinavia Spray Off video"
                className="absolute inset-0 h-full w-full object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/20" />
              {/* Play button */}
              <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform group-hover:scale-110">
                <Play className="h-6 w-6 text-foreground ml-1" fill="currentColor" />
              </div>
            </button>
          )}
        </motion.div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Skindinavia vs. the competition — a side-by-side wear test
        </p>
      </div>
    </section>
  );
}
