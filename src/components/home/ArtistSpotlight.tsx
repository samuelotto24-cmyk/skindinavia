"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { artists, products } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";

const artist = artists[0];
const featuredProduct = products.find((p) => p.id === "2")!; // Bridal — most visually striking

export function ArtistSpotlight() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
            Pro Artists Trust Skindinavia
          </p>
          <h2 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">
            Artist Spotlight
          </h2>
        </div>

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Artist visual — product in use context */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div
              className="relative aspect-[4/5] overflow-hidden rounded-2xl"
              style={{
                background: `linear-gradient(145deg, ${artist.accentColor}15 0%, ${artist.accentColor}25 40%, ${artist.accentColor}10 100%)`,
              }}
            >
              {/* Product showcase in the center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="relative h-[70%] w-[45%]"
                >
                  <Image
                    src={featuredProduct.image}
                    alt={`${artist.name}'s go-to: ${featuredProduct.shortName}`}
                    fill
                    className="object-contain drop-shadow-2xl"
                  />
                </motion.div>
              </div>
              {/* Artist name watermark */}
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-serif text-sm uppercase tracking-wider text-foreground/20">
                  {artist.name}&apos;s Pick
                </p>
              </div>
            </div>
          </motion.div>

          {/* Artist info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-lg"
          >
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
              {artist.specialty}
            </p>
            <h3 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">
              {artist.name}
            </h3>
            <p className="mt-2 text-lg font-light text-muted-foreground">
              {artist.title}
            </p>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              {artist.bio}
            </p>
            <div className="mt-6">
              <Button variant="outline" size="lg" className="h-11 px-8 text-sm tracking-wider uppercase" render={<Link href={`/artist-spotlights/${artist.slug}`} />}>
                View Profile
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
