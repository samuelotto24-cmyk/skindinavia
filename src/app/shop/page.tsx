"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { getProductsByCategory, getCategoryLabel } from "@/lib/mock-data";
import { ProductCard } from "@/components/product/ProductCard";

const categories = [
  "finishing-sprays",
  "primer-sprays",
  "kits",
  "individual",
  "bulk-kits",
] as const;

export default function ShopPage() {
  return (
    <>
      {/* Hero — lineup banner */}
      <section className="relative border-b border-border/50">
        <Image
          src="/product-lineup.png"
          alt="The complete Skindinavia collection"
          width={1920}
          height={480}
          className="w-full h-auto"
          sizes="100vw"
          priority
        />
      </section>

      {/* Quick nav */}
      <nav className="sticky top-0 z-20 border-b border-border/50 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl gap-6 overflow-x-auto px-6 lg:px-8">
          {categories.map((cat) => (
            <a
              key={cat}
              href={`#${cat}`}
              className="shrink-0 border-b-2 border-transparent py-3.5 text-sm font-medium text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
            >
              {getCategoryLabel(cat)}
            </a>
          ))}
        </div>
      </nav>

      {/* Category sections */}
      {categories.map((cat) => {
        const catProducts = getProductsByCategory(cat);
        if (catProducts.length === 0) return null;
        return (
          <section key={cat} id={cat} className="py-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="flex items-end justify-between">
                <div>
                  <h2 className="text-2xl font-light tracking-tight sm:text-3xl">
                    {getCategoryLabel(cat)}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {catProducts.length}{" "}
                    {catProducts.length === 1 ? "product" : "products"}
                  </p>
                </div>
                <Link
                  href={`/shop/${cat}`}
                  className="text-sm font-medium underline underline-offset-4 transition-colors hover:text-muted-foreground"
                >
                  View All
                </Link>
              </div>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.08 } },
                }}
                className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
              >
                {catProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          type: "spring",
                          stiffness: 200,
                          damping: 25,
                        },
                      },
                    }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        );
      })}
    </>
  );
}
