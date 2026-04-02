"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { products, blogPosts, artists } from "@/lib/mock-data";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

type SearchResult = {
  type: "product" | "blog" | "artist" | "page";
  title: string;
  subtitle: string;
  href: string;
  image?: string;
};

const staticPages: SearchResult[] = [
  { type: "page", title: "About Us", subtitle: "Our story and mission", href: "/about-us" },
  { type: "page", title: "Shop All Products", subtitle: "Browse the full collection", href: "/shop" },
  { type: "page", title: "FAQ", subtitle: "Frequently asked questions", href: "/faq" },
  { type: "page", title: "Contact Us", subtitle: "Get in touch", href: "/contact-us" },
  { type: "page", title: "Shipping & Returns", subtitle: "Delivery and return policy", href: "/shipping-returns" },
];

function getAllResults(): SearchResult[] {
  const productResults: SearchResult[] = products.map((p) => ({
    type: "product",
    title: p.name,
    subtitle: `$${p.defaultPrice} — ${p.categoryLabel}`,
    href: `/products/${p.slug}`,
    image: p.image,
  }));

  const blogResults: SearchResult[] = blogPosts.map((p) => ({
    type: "blog",
    title: p.title,
    subtitle: p.category,
    href: `/blog/${p.slug}`,
    image: p.image,
  }));

  const artistResults: SearchResult[] = artists.map((a) => ({
    type: "artist",
    title: a.name,
    subtitle: a.title,
    href: `/artist-spotlights/${a.slug}`,
    image: a.image,
  }));

  return [...productResults, ...blogResults, ...artistResults, ...staticPages];
}

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const allResults = getAllResults();

  const filtered = query.length > 0
    ? allResults.filter((r) =>
        r.title.toLowerCase().includes(query.toLowerCase()) ||
        r.subtitle.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
    : [];

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />

          {/* Search panel */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 right-0 z-50 mx-auto max-w-2xl px-4 pt-20"
          >
            <div className="overflow-hidden rounded-2xl bg-background shadow-2xl border border-border/50">
              {/* Search input */}
              <div className="flex items-center gap-3 border-b border-border/50 px-5 py-4">
                <Search className="h-5 w-5 text-muted-foreground shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products, articles, artists..."
                  className="flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground/50"
                />
                <button onClick={onClose} className="p-1 rounded-full hover:bg-muted transition-colors">
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>

              {/* Results */}
              {query.length > 0 && (
                <div className="max-h-[400px] overflow-y-auto py-2">
                  {filtered.length > 0 ? (
                    filtered.map((result, i) => (
                      <Link
                        key={`${result.href}-${i}`}
                        href={result.href}
                        onClick={onClose}
                        className="flex items-center gap-3 px-5 py-3 hover:bg-muted/50 transition-colors"
                      >
                        {result.image ? (
                          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-muted">
                            <Image
                              src={result.image}
                              alt=""
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                        ) : (
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                            <Search className="h-4 w-4 text-muted-foreground/50" />
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium truncate">{result.title}</p>
                          <p className="text-xs text-muted-foreground truncate">{result.subtitle}</p>
                        </div>
                        <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-muted-foreground">
                          {result.type}
                        </span>
                      </Link>
                    ))
                  ) : (
                    <div className="px-5 py-8 text-center">
                      <p className="text-sm text-muted-foreground">No results for &ldquo;{query}&rdquo;</p>
                      <p className="mt-1 text-xs text-muted-foreground/50">Try searching for a product, article, or artist</p>
                    </div>
                  )}
                </div>
              )}

              {/* Quick links when empty */}
              {query.length === 0 && (
                <div className="px-5 py-4">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground mb-3">Popular</p>
                  <div className="flex flex-wrap gap-2">
                    {["Bridal Spray", "Oil Control", "Setting Spray", "Artist Kits"].map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="rounded-full border border-border/60 px-3 py-1 text-xs text-muted-foreground hover:border-foreground/30 hover:text-foreground transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
