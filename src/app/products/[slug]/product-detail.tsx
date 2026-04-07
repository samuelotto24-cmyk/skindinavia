"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  type Product,
  type ProductSize,
  products,
  reviews,
} from "@/lib/mock-data";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ProductCard } from "@/components/product/ProductCard";
import { use3DTilt } from "@/hooks/use-3d-tilt";
import { useMagneticHover } from "@/hooks/use-magnetic-hover";
import { SpringEntrance } from "@/components/animation/SpringEntrance";

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      className={`h-4 w-4 ${filled ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"}`}
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon key={i} filled={i < Math.round(rating)} />
      ))}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

export function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<ProductSize>(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const tiltRef = use3DTilt<HTMLDivElement>({ maxRotation: 8, scale: 1.02 });
  const addToCartRef = useMagneticHover<HTMLDivElement>({ radius: 40, strength: 0.2 });

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);
  const moreRelated =
    related.length < 3
      ? products
          .filter((p) => p.id !== product.id && !related.find((r) => r.id === p.id))
          .slice(0, 3 - related.length)
      : [];
  const allRelated = [...related, ...moreRelated];

  function handleAddToCart() {
    addItem(product, selectedSize, quantity);
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-border/50">
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/shop" className="transition-colors hover:text-foreground">Shop</Link>
            <span aria-hidden="true">/</span>
            <Link href={`/shop/${product.category}`} className="transition-colors hover:text-foreground">
              {product.categoryLabel}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-foreground">{product.shortName}</span>
          </nav>
        </div>
      </div>

      {/* Main product section */}
      <section className="py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Gallery with 3D tilt */}
            <SpringEntrance direction="left" delay={0.1}>
              <div
                ref={tiltRef}
                className="relative aspect-[3/4] overflow-hidden rounded-2xl"
                style={{
                  background: `linear-gradient(165deg, ${product.accentColor}06 0%, ${product.accentColor}14 50%, ${product.accentColor}06 100%)`,
                }}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-8 drop-shadow-xl"
                  priority
                />
              </div>
            </SpringEntrance>

            {/* Product Info */}
            <div className="flex flex-col">
              <SpringEntrance delay={0.15}>
                {product.badge && (
                  <Badge variant="secondary" className="mb-4 w-fit text-[10px] uppercase tracking-wider">
                    {product.badge}
                  </Badge>
                )}
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {product.categoryLabel}
                </p>
                <h1 className="mt-2 text-3xl font-light tracking-tight sm:text-4xl">
                  {product.name}
                </h1>
              </SpringEntrance>

              <SpringEntrance delay={0.25}>
                <div className="mt-3 flex items-center gap-3">
                  <Stars rating={product.rating} />
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviewCount.toLocaleString()} reviews)
                  </span>
                </div>

                <p className="mt-6 text-3xl font-medium tracking-tight">
                  ${selectedSize.price}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {product.description}
                </p>
              </SpringEntrance>

              <Separator className="my-6" />

              {/* Size selector */}
              {product.sizes.length > 1 && (
                <div>
                  <p className="text-sm font-medium">
                    Size:{" "}
                    <span className="font-normal text-muted-foreground">
                      {selectedSize.label} ({selectedSize.oz})
                    </span>
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <motion.button
                        key={size.label}
                        onClick={() => setSelectedSize(size)}
                        whileTap={{ scale: 0.95 }}
                        className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
                          selectedSize.label === size.label
                            ? "border-foreground bg-foreground text-background"
                            : "border-border bg-background text-foreground hover:border-foreground/50"
                        }`}
                      >
                        {size.label}
                        <span className="ml-1.5 text-xs opacity-60">{size.oz}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mt-6">
                <p className="text-sm font-medium">Quantity</p>
                <div className="mt-3 inline-flex items-center rounded-lg border border-border">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="flex h-10 w-10 items-center justify-center text-lg transition-colors hover:bg-muted"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="flex h-10 w-12 items-center justify-center border-x border-border text-sm font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="flex h-10 w-10 items-center justify-center text-lg transition-colors hover:bg-muted"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart with magnetic hover */}
              <div ref={addToCartRef} className="mt-8">
                <motion.div whileTap={{ scale: 0.97 }}>
                  <Button
                    onClick={handleAddToCart}
                    className="h-12 w-full text-base font-medium tracking-wide"
                  >
                    Add to Cart &mdash; ${(selectedSize.price * quantity).toFixed(2)}
                  </Button>
                </motion.div>
              </div>

              {/* Features */}
              <ul className="mt-8 space-y-2.5">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm">
                    <CheckIcon />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tabbed content */}
      <section className="border-t border-border/50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Tabs defaultValue="description">
            <TabsList variant="line" className="w-full justify-start">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="how-to-use">How to Use</TabsTrigger>
              <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
            </TabsList>
            <AnimatePresence mode="wait">
              <TabsContent value="description" className="mt-8">
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="prose prose-stone max-w-2xl"
                >
                  {product.longDescription.split("\n\n").map((paragraph, i) => (
                    <p key={i} className="text-sm leading-relaxed text-muted-foreground [&:not(:first-child)]:mt-4">
                      {paragraph}
                    </p>
                  ))}
                </motion.div>
              </TabsContent>
              <TabsContent value="how-to-use" className="mt-8">
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="max-w-2xl text-sm leading-relaxed text-muted-foreground"
                >
                  {product.howToUse}
                </motion.p>
              </TabsContent>
              <TabsContent value="ingredients" className="mt-8">
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="max-w-2xl text-sm leading-relaxed text-muted-foreground"
                >
                  {product.ingredients}
                </motion.p>
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </div>
      </section>

      {/* Reviews */}
      <section className="border-t border-border/50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-light tracking-tight">Customer Reviews</h2>
              <div className="mt-2 flex items-center gap-3">
                <Stars rating={product.rating} />
                <span className="text-sm text-muted-foreground">
                  Based on {product.reviewCount.toLocaleString()} reviews
                </span>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {reviews.map((review) => (
              <div key={review.id} className="rounded-xl border border-border/50 bg-card p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <Stars rating={review.rating} />
                    <h3 className="mt-2 text-sm font-semibold">{review.title}</h3>
                  </div>
                  {review.verified && (
                    <Badge variant="outline" className="text-[10px]">Verified</Badge>
                  )}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{review.body}</p>
                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">{review.author}</span>
                  <span aria-hidden="true">&middot;</span>
                  <span>
                    {new Date(review.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* You May Also Like */}
      {allRelated.length > 0 && (
        <section className="border-t border-border/50 py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-2xl font-light tracking-tight">You May Also Like</h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {allRelated.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
