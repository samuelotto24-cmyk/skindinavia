"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { artists } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";

const artist = artists[0];

export function ArtistSpotlight() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative py-12 lg:py-14 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50/30 via-background to-rose-50/20" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          {/* Artist photo — real headshot */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="relative aspect-[5/4] overflow-hidden rounded-2xl">
              <Image
                src={artist.image}
                alt={artist.name}
                fill
                className="object-cover"
                unoptimized
              />
              {/* Gradient overlay at bottom for text */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-5 pt-16">
                <p className="font-serif text-sm uppercase tracking-wider text-white/80">
                  {artist.name}
                </p>
                <p className="text-xs text-white/50">
                  {artist.specialty} &middot; Ambassador since 2012
                </p>
              </div>
            </div>
          </motion.div>

          {/* Artist info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
              Pro Artists Trust Skindinavia
            </p>
            <h3 className="mt-2 font-serif text-2xl tracking-tight sm:text-3xl">
              Artist Spotlight
            </h3>
            <p className="mt-1 text-base font-light text-muted-foreground">
              {artist.title}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {artist.bio}
            </p>
            <div className="mt-5">
              <Button variant="outline" size="lg" className="h-10 px-6 text-sm tracking-wider uppercase" render={<Link href={`/artist-spotlights/${artist.slug}`} />}>
                View Profile
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
