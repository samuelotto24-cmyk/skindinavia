"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/mock-data";
import { use3DTilt } from "@/hooks/use-3d-tilt";
import { useMagneticHover } from "@/hooks/use-magnetic-hover";
import { TextReveal } from "@/components/animation/TextReveal";
import { CountUp } from "@/components/animation/CountUp";

const heroProduct = products.find((p) => p.id === "1")!;

export function Hero() {
  const tiltRef = use3DTilt<HTMLDivElement>({ maxRotation: 8, scale: 1.03 });
  const ctaRef = useMagneticHover<HTMLDivElement>({ radius: 60, strength: 0.2 });

  return (
    <section className="relative overflow-hidden" style={{ minHeight: "calc(100svh - 3.5rem)" }}>
      <div className="absolute inset-0 bg-gradient-to-br from-[#f8f3ed] via-[#faf7f3] to-[#f5eff0]" />

      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

      {/* Ghost product — oversized background element */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
        className="absolute right-[-8%] top-1/2 -translate-y-1/2 hidden lg:block pointer-events-none h-[110svh] w-[110svh]"
      >
        <Image
          src={heroProduct.image}
          alt=""
          fill
          sizes="110svh"
          className="object-contain opacity-[0.05]"
          aria-hidden
        />
      </motion.div>

      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8 flex items-center" style={{ minHeight: "calc(100svh - 3.5rem)" }}>
        <div className="grid items-center gap-4 lg:grid-cols-[1fr_1.2fr] lg:gap-0 w-full py-10 lg:py-0">
          {/* Text */}
          <div className="max-w-lg relative z-10">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground"
            >
              The Original Formula
            </motion.p>

            <h1 className="font-serif text-3xl leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
              <TextReveal delay={0.2}>
                Your Makeup Is Gone
              </TextReveal>
              <br />
              <TextReveal delay={0.45}>
                by 3 PM.
              </TextReveal>
              <br />
              <span className="italic">
                <TextReveal delay={0.7}>
                  Ours Isn't.
                </TextReveal>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.0 }}
              className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base"
            >
              The patented cooling spray that locks your look in for 16+ hours —
              through work, workouts, weddings, and everything in between.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.1 }}
              ref={ctaRef}
              className="mt-6 flex flex-wrap gap-3"
            >
              <Button
                size="lg"
                className="h-11 px-8 text-sm tracking-wider uppercase"
                render={<Link href="/shop" />}
              >
                Shop Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-11 px-8 text-sm tracking-wider uppercase"
                render={<Link href="/about-us" />}
              >
                Our Story
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="mt-8 flex gap-8"
            >
              <div>
                <p className="font-serif text-xl font-medium tracking-tight">
                  <CountUp end={16} suffix="+" duration={1.5} />
                </p>
                <p className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">Hour Wear</p>
              </div>
              <div>
                <p className="font-serif text-xl font-medium tracking-tight">
                  <CountUp end={50} suffix="K+" duration={2} />
                </p>
                <p className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">Five-Star Reviews</p>
              </div>
              <div>
                <p className="font-serif text-xl font-medium tracking-tight">
                  <CountUp end={20} duration={1.8} />
                </p>
                <p className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">Years Trusted</p>
              </div>
            </motion.div>
          </div>

          {/* Product — dominant hero shot */}
          <div className="flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
              className="relative"
            >
              <Link href={`/products/${heroProduct.slug}`}>
                <div
                  ref={tiltRef}
                  className="relative z-10 h-[55svh] w-[55svh] sm:h-[65svh] sm:w-[65svh] lg:h-[80svh] lg:w-[80svh] cursor-pointer"
                >
                  <Image
                    src={heroProduct.image}
                    alt={heroProduct.name}
                    fill
                    sizes="(max-width: 640px) 55svh, (max-width: 1024px) 65svh, 80svh"
                    className="object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.18)]"
                    priority
                  />
                </div>
              </Link>

              {/* Product name + price */}
              <div className="mt-1 text-center">
                <Link href={`/products/${heroProduct.slug}`} className="group inline-block">
                  <p className="text-sm font-medium tracking-wide group-hover:underline underline-offset-2">
                    {heroProduct.shortName}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    From ${heroProduct.defaultPrice}
                  </p>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
