import Link from "next/link";
import type { Product } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} className="group">
      <div className="overflow-hidden rounded-2xl border border-border/50 bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-stone-200/50">
        {/* Product image placeholder */}
        <div
          className="relative flex h-80 items-end justify-center overflow-hidden"
          style={{
            background: `linear-gradient(165deg, ${product.accentColor}08 0%, ${product.accentColor}18 50%, ${product.accentColor}10 100%)`,
          }}
        >
          <div className="mb-8 flex flex-col items-center">
            <div
              className="h-6 w-3 rounded-t-sm"
              style={{ backgroundColor: `${product.accentColor}30` }}
            />
            <div
              className="h-40 w-20 rounded-xl shadow-sm"
              style={{
                background: `linear-gradient(to bottom, ${product.accentColor}20, ${product.accentColor}12)`,
                boxShadow: `inset 0 2px 12px ${product.accentColor}10`,
              }}
            />
          </div>
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

        {/* Card content */}
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
  );
}
