"use client";

import { useState } from "react";
import Link from "next/link";
import { Minus, Plus, X, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { products } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, itemCount } = useCart();
  const [discountCode, setDiscountCode] = useState("");

  const shippingEstimate = subtotal >= 40 ? 0 : 5.95;
  const total = subtotal + shippingEstimate;

  // Pick 3 products not already in the cart for recommendations
  const cartProductIds = new Set(items.map((i) => i.productId));
  const recommendations = products
    .filter((p) => !cartProductIds.has(p.id))
    .slice(0, 3);

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-4 text-center">
        <ShoppingBag className="h-14 w-14 text-neutral-300" />
        <div>
          <h1 className="text-2xl font-medium tracking-tight mb-2">
            Your Cart is Empty
          </h1>
          <p className="text-sm text-neutral-500 max-w-sm">
            Looks like you haven&apos;t added anything yet. Explore our
            collection and find your perfect setting spray.
          </p>
        </div>
        <Button render={<Link href="/shop" />} className="mt-2 px-6 h-10 bg-black text-white hover:bg-neutral-800">
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl md:text-3xl font-medium tracking-tight">
          Your Cart
        </h1>
        <span className="text-sm text-neutral-500">
          {itemCount} {itemCount === 1 ? "item" : "items"}
        </span>
      </div>

      <div className="lg:grid lg:grid-cols-[1fr_380px] lg:gap-12">
        {/* Cart Items */}
        <div>
          {/* Column Headers (desktop) */}
          <div className="hidden md:grid md:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 pb-3 border-b border-neutral-200 text-xs uppercase tracking-[0.1em] text-neutral-500">
            <span>Product</span>
            <span>Price</span>
            <span>Quantity</span>
            <span className="text-right">Total</span>
            <span className="w-8" />
          </div>

          <div className="divide-y divide-neutral-100">
            {items.map((item) => {
              const lineTotal = item.size.price * item.quantity;
              return (
                <div
                  key={`${item.productId}-${item.size.label}`}
                  className="py-5 md:grid md:grid-cols-[2fr_1fr_1fr_1fr_auto] md:gap-4 md:items-center"
                >
                  {/* Product info */}
                  <div className="flex items-center gap-4">
                    <div
                      className="w-16 h-20 md:w-20 md:h-24 rounded-sm flex-shrink-0 flex items-center justify-center"
                      style={{ backgroundColor: item.product.accentColor + "18" }}
                    >
                      <div
                        className="w-6 h-10 rounded-full"
                        style={{ backgroundColor: item.product.accentColor }}
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium leading-tight">
                        {item.product.shortName}
                      </p>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        {item.size.label} &middot; {item.size.oz}
                      </p>
                      {/* Mobile-only price & qty */}
                      <div className="md:hidden flex items-center gap-4 mt-3">
                        <span className="text-sm">
                          ${item.size.price.toFixed(2)}
                        </span>
                        <div className="flex items-center border border-neutral-200 rounded-sm">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.size.label,
                                item.quantity - 1
                              )
                            }
                            className="p-1.5 hover:bg-neutral-50 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-xs w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.size.label,
                                item.quantity + 1
                              )
                            }
                            className="p-1.5 hover:bg-neutral-50 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="text-sm font-medium ml-auto">
                          ${lineTotal.toFixed(2)}
                        </span>
                        <button
                          onClick={() =>
                            removeItem(item.productId, item.size.label)
                          }
                          className="p-1 text-neutral-400 hover:text-red-500 transition-colors"
                          aria-label="Remove item"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Desktop price */}
                  <span className="hidden md:block text-sm">
                    ${item.size.price.toFixed(2)}
                  </span>

                  {/* Desktop quantity */}
                  <div className="hidden md:flex items-center border border-neutral-200 rounded-sm w-fit">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.productId,
                          item.size.label,
                          item.quantity - 1
                        )
                      }
                      className="p-2 hover:bg-neutral-50 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="text-sm w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.productId,
                          item.size.label,
                          item.quantity + 1
                        )
                      }
                      className="p-2 hover:bg-neutral-50 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>

                  {/* Desktop line total */}
                  <span className="hidden md:block text-sm font-medium text-right">
                    ${lineTotal.toFixed(2)}
                  </span>

                  {/* Desktop remove */}
                  <button
                    onClick={() =>
                      removeItem(item.productId, item.size.label)
                    }
                    className="hidden md:flex p-1.5 text-neutral-400 hover:text-red-500 transition-colors"
                    aria-label="Remove item"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Discount Code */}
          <div className="mt-6 pt-6 border-t border-neutral-200">
            <label className="text-xs uppercase tracking-[0.1em] text-neutral-500 mb-2 block">
              Discount Code
            </label>
            <div className="flex gap-2 max-w-sm">
              <Input
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                placeholder="Enter code"
                className="h-10"
              />
              <Button
                variant="outline"
                className="h-10 px-5 border-black text-black hover:bg-black hover:text-white transition-colors"
              >
                Apply
              </Button>
            </div>
          </div>

          {/* Continue Shopping */}
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 mt-6 text-sm text-neutral-500 hover:text-black transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>
        </div>

        {/* Order Summary Sidebar */}
        <div className="mt-10 lg:mt-0">
          <div className="bg-neutral-50 rounded-lg p-6 sticky top-28">
            <h2 className="text-sm uppercase tracking-[0.1em] font-medium mb-5">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-600">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Estimated Shipping</span>
                <span>
                  {shippingEstimate === 0 ? (
                    <span className="text-green-600 font-medium">Free</span>
                  ) : (
                    `$${shippingEstimate.toFixed(2)}`
                  )}
                </span>
              </div>
              {subtotal < 40 && subtotal > 0 && (
                <p className="text-xs text-neutral-500">
                  Add ${(40 - subtotal).toFixed(2)} more for free shipping
                </p>
              )}
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between text-sm font-medium">
              <span>Total</span>
              <span className="text-base">${total.toFixed(2)}</span>
            </div>

            <Button
              render={<Link href="/checkout" />}
              className="w-full mt-6 h-11 bg-black text-white text-sm uppercase tracking-[0.1em] hover:bg-neutral-800"
            >
              Proceed to Checkout
            </Button>

            <p className="text-xs text-neutral-400 text-center mt-3">
              Taxes calculated at checkout
            </p>
          </div>
        </div>
      </div>

      {/* You May Also Like */}
      {recommendations.length > 0 && (
        <section className="mt-16 pt-12 border-t border-neutral-200">
          <h2 className="text-lg font-medium tracking-tight mb-6">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {recommendations.map((product) => (
              <Link
                key={product.id}
                href={`/shop/${product.slug}`}
                className="group"
              >
                <div
                  className="aspect-[3/4] rounded-lg flex items-center justify-center mb-3 transition-transform group-hover:scale-[1.02]"
                  style={{
                    backgroundColor: product.accentColor + "14",
                  }}
                >
                  <div
                    className="w-10 h-16 rounded-full"
                    style={{ backgroundColor: product.accentColor }}
                  />
                </div>
                <p className="text-sm font-medium group-hover:underline underline-offset-4">
                  {product.shortName}
                </p>
                <p className="text-sm text-neutral-500 mt-0.5">
                  From ${product.defaultPrice.toFixed(2)}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
