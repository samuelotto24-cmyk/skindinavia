"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { products } from "@/lib/mock-data";

const moments = [
  {
    title: "Your Wedding Day",
    subtitle: "Cry-proof. Dance-proof. Perfect.",
    description: "Don't let the biggest day of your life end with a touch-up.",
    product: products.find((p) => p.id === "2")!,
    href: "/products/the-makeup-finishing-spray-bridal",
    lifestyle: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2022/09/bride-makeup-trends-in-2022-1200x798.jpg",
    cta: "Shop Bridal",
  },
  {
    title: "Your Longest Days",
    subtitle: "From 6 AM to midnight.",
    description: "12-hour shifts. Back-to-back meetings. Dinner after. Still flawless.",
    product: products.find((p) => p.id === "1")!,
    href: "/products/the-makeup-finishing-spray",
    lifestyle: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2022/09/minimal-makeup-skindinavia-1200x1653.jpg",
    cta: "Shop Original",
  },
  {
    title: "Shine-Free All Day",
    subtitle: "Matte. All day. No touch-ups.",
    description: "Heat, humidity, and oil — controlled from morning to night.",
    product: products.find((p) => p.id === "3")!,
    href: "/products/the-makeup-finishing-spray-oil-control",
    lifestyle: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2022/10/skindinavia_301654740_843255973747273_6612108819761506876_n.jpg",
    cta: "Shop Oil Control",
  },
];

export function ShopByMoment() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} className="py-14 lg:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground"
          >
            Find Your Formula
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-4 font-serif text-3xl tracking-tight sm:text-4xl lg:text-5xl"
          >
            Shop by Moment
          </motion.h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {moments.map((moment, i) => (
            <motion.div
              key={moment.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.12 }}
            >
              <Link href={moment.href} className="group block">
                <div className="relative overflow-hidden rounded-2xl transition-all duration-500 hover:shadow-lg hover:shadow-stone-200/50">
                  {/* Lifestyle photo background */}
                  <div className="relative h-[380px] sm:h-[420px]">
                    <Image
                      src={moment.lifestyle}
                      alt={moment.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      unoptimized
                    />
                    {/* Dark gradient for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Text overlay at bottom */}
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
                        {moment.subtitle}
                      </p>
                      <h3 className="mt-1 font-serif text-2xl tracking-tight text-white">
                        {moment.title}
                      </h3>
                      <p className="mt-1 text-sm text-white/70">
                        {moment.description}
                      </p>
                    </div>

                    {/* Product bottle floating on the right */}
                    <div className="absolute right-3 bottom-16 h-[160px] w-[55px] sm:h-[190px] sm:w-[65px] transition-transform duration-500 group-hover:translate-y-[-4px]">
                      <Image
                        src={moment.product.image}
                        alt={moment.product.name}
                        fill
                        className="object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.4)]"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between px-1">
                  <p className="text-sm text-muted-foreground">
                    From <span className="font-medium text-foreground">${moment.product.defaultPrice}</span>
                  </p>
                  <span className="text-sm font-medium underline-offset-4 transition-all group-hover:underline">
                    {moment.cta}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
