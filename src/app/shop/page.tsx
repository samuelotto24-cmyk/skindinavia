import type { Metadata } from "next";
import Link from "next/link";
import { products, getProductsByCategory, getCategoryLabel } from "@/lib/mock-data";
import { ProductCard } from "@/components/product/ProductCard";

export const metadata: Metadata = {
  title: "Shop All Products — Skindinavia",
  description:
    "Browse the full Skindinavia collection. Setting sprays, primer sprays, kits, and professional bulk options trusted by makeup artists worldwide.",
};

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
      {/* Hero */}
      <section className="border-b border-border/50 bg-gradient-to-b from-stone-50 to-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            The Collection
          </p>
          <h1 className="mt-3 text-4xl font-light tracking-tight sm:text-5xl">
            Shop All Products
          </h1>
          <p className="mt-4 max-w-xl text-base text-muted-foreground">
            Professional-grade setting sprays, primers, and kits trusted by
            makeup artists on Broadway, in Hollywood, and at weddings worldwide.
          </p>
        </div>
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

              <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {catProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
