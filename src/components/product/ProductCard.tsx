"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { ElasticCard } from "@/components/animation/ElasticCard";
import { use3DTilt } from "@/hooks/use-3d-tilt";

export function ProductCard({ product }: { product: Product }) {
  const tiltRef = use3DTilt<HTMLDivElement>({ maxRotation: 5, scale: 1 });

  return (
    <ElasticCard>
      <Link href={`/products/${product.slug}`} className="group block">
        <div className="overflow-hidden rounded-2xl border border-border/50 bg-card">
          <div
            ref={tiltRef}
            className="relative flex h-80 items-center justify-center overflow-hidden"
            style={{
              background: `linear-gradient(165deg, ${product.accentColor}06 0%, ${product.accentColor}12 50%, ${product.accentColor}06 100%)`,
            }}
          >
            <Image
              src={product.image}
              alt={product.name}
              width={280}
              height={280}
              className="h-auto max-h-[260px] w-auto object-contain transition-transform duration-500 group-hover:scale-105"
            />
            {product.badge && (
              <div className="absolute top-4 left-4">
                <Badge
                  variant="secondary"
                  className="text-[10px] uppercase tracking-wider"
                >
                  {product.badge}
                </Badge>
              </div>
            )}
          </div>

          <div className="p-6">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {product.categoryLabel}
            </p>
            <h3 className="mt-2 text-lg font-medium tracking-tight text-foreground">
              {product.name}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
              {product.description}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-lg font-medium">
                {product.sizes.length > 1
                  ? `From $${product.sizes[0].price}`
                  : `$${product.defaultPrice}`}
              </span>
              <span className="text-sm font-medium text-foreground underline-offset-4 transition-all group-hover:underline">
                Shop Now
              </span>
            </div>
          </div>
        </div>
      </Link>
    </ElasticCard>
  );
}
