import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getProductsByCategory,
  getCategoryLabel,
  type Product,
} from "@/lib/mock-data";
import { ProductCard } from "@/components/product/ProductCard";

const validCategories = [
  "finishing-sprays",
  "primer-sprays",
  "kits",
  "individual",
  "bulk-kits",
] as const;

type CategorySlug = (typeof validCategories)[number];

function isValidCategory(value: string): value is CategorySlug {
  return (validCategories as readonly string[]).includes(value);
}

export function generateStaticParams() {
  return validCategories.map((category) => ({ category }));
}

const categoryDescriptions: Record<CategorySlug, string> = {
  "finishing-sprays":
    "Lock in your look for 16+ hours with our patented Temperature Control Technology. The original makeup setting sprays trusted by professionals since 2005.",
  "primer-sprays":
    "Prep your canvas in seconds with our weightless spray primers. No rubbing, no waiting — just smooth, even application every time.",
  kits:
    "Get more, save more. Our curated kits bundle our most popular products for a complete makeup routine at a better price.",
  individual:
    "Standalone products to complete your beauty toolkit. From removal to finishing, each product is formulated for professional results.",
  "bulk-kits":
    "Designed for professionals. Bulk pricing on our most popular formulas for makeup artists, studios, salons, and bridal teams.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  if (!isValidCategory(category)) return {};
  const label = getCategoryLabel(category);
  return {
    title: `${label} — Skindinavia`,
    description: categoryDescriptions[category],
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  if (!isValidCategory(category)) {
    notFound();
  }

  const label = getCategoryLabel(category);
  const categoryProducts = getProductsByCategory(
    category as Product["category"]
  );

  return (
    <>
      {/* Breadcrumb + Hero */}
      <section className="border-b border-border/50 bg-gradient-to-b from-stone-50 to-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
            <Link
              href="/shop"
              className="transition-colors hover:text-foreground"
            >
              Shop
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-foreground">{label}</span>
          </nav>

          <h1 className="text-4xl font-serif font-light tracking-tight sm:text-5xl">
            {label}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            {categoryDescriptions[category]}
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            {categoryProducts.length}{" "}
            {categoryProducts.length === 1 ? "product" : "products"}
          </p>
        </div>
      </section>

      {/* Products grid */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
