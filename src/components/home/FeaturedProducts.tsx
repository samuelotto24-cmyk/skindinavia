"use client";

import { products } from "@/lib/mock-data";
import { ProductCard } from "@/components/product/ProductCard";
import { SpringEntrance } from "@/components/animation/SpringEntrance";

const featuredIds = ["2", "3", "6"];
const featured = products.filter((p) => featuredIds.includes(p.id));

export function FeaturedProducts() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Customer Favorites
          </p>
          <h2 className="mt-3 text-3xl font-light tracking-tight sm:text-4xl">
            Featured Products
          </h2>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product, i) => (
            <SpringEntrance key={product.id} delay={i * 0.1}>
              <ProductCard product={product} />
            </SpringEntrance>
          ))}
        </div>
      </div>
    </section>
  );
}
