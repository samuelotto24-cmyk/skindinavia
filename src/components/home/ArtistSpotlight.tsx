"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { artists, products } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";

const artist = artists[0];
const featuredProduct = products.find((p) => p.id === "2")!;

export function ArtistSpotlight() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative py-14 lg:py-16 overflow-hidden">
      {/* Subtle radial gradient behind the whole section */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50/30 via-background to-rose-50/20" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Product visual — landscape format, textured */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div
              className="relative aspect-[5/4] overflow-hidden rounded-2xl"
              style={{
                background: `linear-gradient(145deg, ${artist.accentColor}18 0%, ${artist.accentColor}30 50%, ${artist.accentColor}12 100%)`,
              }}
            >
              {/* Subtle dot pattern texture */}
              <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "16px 16px" }} />

              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="relative h-[75%] w-[40%]"
                >
                  <Image
                    src={featuredProduct.image}
                    alt={`${artist.name}'s go-to: ${featuredProduct.shortName}`}
                    fill
                    className="object-contain drop-shadow-2xl"
                  />
                </motion.div>
              </div>
              <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                <p className="font-serif text-xs uppercase tracking-wider text-foreground/25">
                  {artist.name}&apos;s Pick
                </p>
                <p className="font-serif text-xs uppercase tracking-wider text-foreground/25">
                  Since 2012
                </p>
              </div>
            </div>
          </motion.div>

          {/* Artist info — compact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
              {artist.specialty}
            </p>
            <h3 className="mt-2 font-serif text-2xl tracking-tight sm:text-3xl">
              {artist.name}
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
