"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/lib/mock-data";

const quickProducts = [
  products.find((p) => p.id === "1")!,
  products.find((p) => p.id === "2")!,
  products.find((p) => p.id === "3")!,
];

export function QuickShopBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      // Show after scrolling past hero (~500px)
      setVisible(window.scrollY > 500);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-16 left-0 right-0 z-30 border-b border-border/30 bg-background/90 backdrop-blur-md"
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6">
            <p className="hidden sm:block text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Quick Shop
            </p>
            <div className="flex items-center gap-4 sm:gap-6">
              {quickProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="group flex items-center gap-2.5"
                >
                  <div className="relative h-8 w-5 shrink-0">
                    <Image
                      src={product.image}
                      alt=""
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="hidden md:block">
                    <p className="text-xs font-medium leading-tight group-hover:underline underline-offset-2">
                      {product.shortName}
                    </p>
                    <p className="text-[10px] text-muted-foreground">${product.defaultPrice}</p>
                  </div>
                </Link>
              ))}
            </div>
            <Link
              href="/shop"
              className="rounded-full bg-foreground px-4 py-1.5 text-[10px] font-medium uppercase tracking-wider text-background transition-opacity hover:opacity-80"
            >
              Shop All
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
