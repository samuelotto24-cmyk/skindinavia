"use client";

import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal } =
    useCart();

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent side="right" className="flex flex-col w-full sm:max-w-md p-0">
        <SheetHeader className="border-b border-neutral-200 px-5 py-4">
          <SheetTitle className="text-sm tracking-[0.15em] uppercase font-medium">
            Your Cart
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-5 text-center">
            <ShoppingBag className="h-10 w-10 text-neutral-300" />
            <div>
              <p className="text-sm font-medium mb-1">Your cart is empty</p>
              <p className="text-xs text-neutral-500">
                Add something beautiful to get started.
              </p>
            </div>
            <button
              onClick={closeCart}
              className="mt-2 text-sm underline underline-offset-4 hover:text-neutral-500 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.size.label}`}
                  className="flex gap-4 pb-4 border-b border-neutral-100 last:border-0"
                >
                  {/* Placeholder image area */}
                  <div className="w-16 h-20 bg-neutral-100 rounded-sm flex-shrink-0" />

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-tight truncate">
                      {item.product.shortName}
                    </p>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      {item.size.label} &middot; {item.size.oz}
                    </p>
                    <p className="text-sm mt-1">${item.size.price.toFixed(2)}</p>

                    <div className="flex items-center gap-3 mt-2">
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
                        <span className="text-xs w-6 text-center">
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

                      <button
                        onClick={() =>
                          removeItem(item.productId, item.size.label)
                        }
                        className="p-1.5 text-neutral-400 hover:text-red-500 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <SheetFooter className="border-t border-neutral-200 px-5 py-4 gap-3">
              <div className="flex items-center justify-between w-full mb-1">
                <span className="text-sm font-medium">Subtotal</span>
                <span className="text-sm font-medium">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-neutral-500 w-full">
                Shipping and taxes calculated at checkout.
              </p>
              <button
                onClick={closeCart}
                className="w-full border border-black py-2.5 text-sm tracking-wide uppercase hover:bg-neutral-50 transition-colors"
              >
                View Cart
              </button>
              <button className="w-full bg-black text-white py-2.5 text-sm tracking-wide uppercase hover:bg-neutral-800 transition-colors">
                Checkout
              </button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
