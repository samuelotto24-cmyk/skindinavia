import Link from "next/link";
import { products } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";

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
          {featured.map((product) => (
            <Link
              key={product.id}
              href={`/shop/${product.slug}`}
              className="group"
            >
              <div className="overflow-hidden rounded-2xl border border-border/50 bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-stone-200/50">
                {/* Product color placeholder */}
                <div
                  className="relative flex h-80 items-end justify-center overflow-hidden"
                  style={{
                    background: `linear-gradient(165deg, ${product.accentColor}08 0%, ${product.accentColor}18 50%, ${product.accentColor}10 100%)`,
                  }}
                >
                  {/* Mini bottle silhouette */}
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
                      <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">
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
                      ${product.defaultPrice}
                    </span>
                    <span className="text-sm font-medium text-foreground underline-offset-4 transition-all group-hover:underline">
                      Shop Now
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
