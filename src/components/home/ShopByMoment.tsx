"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { products } from "@/lib/mock-data";

const moments = [
  {
    title: "Your Wedding Day",
    subtitle: "Cry-proof. Dance-proof. Perfect.",
    description: "Engineered for the most important day of your life.",
    product: products.find((p) => p.id === "2")!,
    href: "/products/the-makeup-finishing-spray-bridal",
    gradient: "from-rose-50/80 to-pink-50/40",
    cta: "Shop Bridal",
  },
  {
    title: "Your Longest Days",
    subtitle: "From 6 AM to midnight.",
    description: "The original 16-hour formula for everything life throws at you.",
    product: products.find((p) => p.id === "1")!,
    href: "/products/the-makeup-finishing-spray",
    gradient: "from-blue-50/60 to-sky-50/30",
    cta: "Shop Original",
  },
  {
    title: "Your Oiliest Moments",
    subtitle: "Matte. All day. No touch-ups.",
    description: "Oil-absorbing technology that controls shine through heat and humidity.",
    product: products.find((p) => p.id === "3")!,
    href: "/products/the-makeup-finishing-spray-oil-control",
    gradient: "from-emerald-50/50 to-teal-50/30",
    cta: "Shop Oil Control",
  },
];

export function ShopByMoment() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} className="py-32">
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

        <div className="mt-20 grid gap-8 lg:grid-cols-3">
          {moments.map((moment, i) => (
            <motion.div
              key={moment.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.12 }}
            >
              <Link href={moment.href} className="group block">
                <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${moment.gradient} p-8 pb-0 transition-all duration-500 hover:shadow-lg hover:shadow-stone-200/50`}>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    {moment.subtitle}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl tracking-tight">
                    {moment.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {moment.description}
                  </p>

                  <div className="mt-6 flex justify-center">
                    <div className="relative h-[280px] w-[180px] transition-transform duration-500 group-hover:scale-105">
                      <Image
                        src={moment.product.image}
                        alt={moment.product.name}
                        fill
                        className="object-contain drop-shadow-lg"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between px-1">
                  <p className="text-sm text-muted-foreground">
                    From <span className="font-medium text-foreground">${moment.product.sizes[0].price}</span>
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
