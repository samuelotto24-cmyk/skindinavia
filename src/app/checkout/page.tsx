"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, Lock, ArrowLeft } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const shippingCost = subtotal >= 40 ? 0 : 5.95;
  const total = subtotal + shippingCost;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setShowConfirmation(true);
  }

  function handleContinueShopping() {
    clearCart();
    setShowConfirmation(false);
    router.push("/shop");
  }

  // Redirect to cart if empty (and not showing confirmation)
  if (items.length === 0 && !showConfirmation) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-4 text-center">
        <div>
          <h1 className="text-2xl font-medium tracking-tight mb-2">
            Nothing to Check Out
          </h1>
          <p className="text-sm text-neutral-500 max-w-sm">
            Your cart is empty. Add some products before checking out.
          </p>
        </div>
        <Button
          render={<Link href="/shop" />}
          className="mt-2 px-6 h-10 bg-black text-white hover:bg-neutral-800"
        >
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-16">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <Link
          href="/cart"
          className="text-neutral-400 hover:text-black transition-colors"
          aria-label="Back to cart"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl md:text-3xl font-medium tracking-tight">
          Checkout
        </h1>
      </div>

      <div className="lg:grid lg:grid-cols-[1fr_400px] lg:gap-16">
        {/* Form */}
        <form onSubmit={handleSubmit} id="checkout-form">
          {/* Shipping Information */}
          <section>
            <h2 className="text-sm uppercase tracking-[0.1em] font-medium mb-5">
              Shipping Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-xs text-neutral-500 mb-1.5"
                >
                  First Name
                </label>
                <Input
                  id="firstName"
                  name="firstName"
                  required
                  autoComplete="given-name"
                  className="h-10"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-xs text-neutral-500 mb-1.5"
                >
                  Last Name
                </label>
                <Input
                  id="lastName"
                  name="lastName"
                  required
                  autoComplete="family-name"
                  className="h-10"
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block text-xs text-neutral-500 mb-1.5"
                >
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="h-10"
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="address"
                  className="block text-xs text-neutral-500 mb-1.5"
                >
                  Address
                </label>
                <Input
                  id="address"
                  name="address"
                  required
                  autoComplete="street-address"
                  className="h-10"
                />
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="block text-xs text-neutral-500 mb-1.5"
                >
                  City
                </label>
                <Input
                  id="city"
                  name="city"
                  required
                  autoComplete="address-level2"
                  className="h-10"
                />
              </div>
              <div>
                <label
                  htmlFor="state"
                  className="block text-xs text-neutral-500 mb-1.5"
                >
                  State
                </label>
                <Input
                  id="state"
                  name="state"
                  required
                  autoComplete="address-level1"
                  className="h-10"
                />
              </div>
              <div>
                <label
                  htmlFor="zip"
                  className="block text-xs text-neutral-500 mb-1.5"
                >
                  ZIP Code
                </label>
                <Input
                  id="zip"
                  name="zip"
                  required
                  autoComplete="postal-code"
                  className="h-10"
                />
              </div>
              <div>
                <label
                  htmlFor="country"
                  className="block text-xs text-neutral-500 mb-1.5"
                >
                  Country
                </label>
                <Input
                  id="country"
                  name="country"
                  required
                  autoComplete="country-name"
                  defaultValue="United States"
                  className="h-10"
                />
              </div>
            </div>
          </section>

          <Separator className="my-8" />

          {/* Payment Information */}
          <section>
            <div className="flex items-center gap-2 mb-5">
              <h2 className="text-sm uppercase tracking-[0.1em] font-medium">
                Payment Information
              </h2>
              <Lock className="h-3.5 w-3.5 text-neutral-400" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label
                  htmlFor="cardNumber"
                  className="block text-xs text-neutral-500 mb-1.5"
                >
                  Card Number
                </label>
                <Input
                  id="cardNumber"
                  name="cardNumber"
                  required
                  placeholder="1234 5678 9012 3456"
                  autoComplete="cc-number"
                  className="h-10"
                />
              </div>
              <div>
                <label
                  htmlFor="expiration"
                  className="block text-xs text-neutral-500 mb-1.5"
                >
                  Expiration
                </label>
                <Input
                  id="expiration"
                  name="expiration"
                  required
                  placeholder="MM / YY"
                  autoComplete="cc-exp"
                  className="h-10"
                />
              </div>
              <div>
                <label
                  htmlFor="cvv"
                  className="block text-xs text-neutral-500 mb-1.5"
                >
                  CVV
                </label>
                <Input
                  id="cvv"
                  name="cvv"
                  required
                  placeholder="123"
                  autoComplete="cc-csc"
                  className="h-10"
                />
              </div>
            </div>

            <p className="text-xs text-neutral-400 mt-3">
              This is a demo checkout. No real payment will be processed.
            </p>
          </section>

          {/* Place Order (mobile only — desktop uses sidebar button) */}
          <Button
            type="submit"
            className="w-full mt-8 h-12 bg-black text-white text-sm uppercase tracking-[0.1em] hover:bg-neutral-800 lg:hidden"
          >
            Place Order &mdash; ${total.toFixed(2)}
          </Button>
        </form>

        {/* Order Summary Sidebar */}
        <div className="mt-10 lg:mt-0">
          <div className="bg-neutral-50 rounded-lg p-6 sticky top-28">
            <h2 className="text-sm uppercase tracking-[0.1em] font-medium mb-5">
              Order Summary
            </h2>

            <div className="space-y-4 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.size.label}`}
                  className="flex items-center gap-3"
                >
                  <div
                    className="w-12 h-14 rounded-sm flex-shrink-0 flex items-center justify-center"
                    style={{
                      backgroundColor: item.product.accentColor + "18",
                    }}
                  >
                    <div
                      className="w-4 h-7 rounded-full"
                      style={{ backgroundColor: item.product.accentColor }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-tight truncate">
                      {item.product.shortName}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {item.size.label} &times; {item.quantity}
                    </p>
                  </div>
                  <span className="text-sm font-medium">
                    ${(item.size.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-600">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Shipping</span>
                <span>
                  {shippingCost === 0 ? (
                    <span className="text-green-600 font-medium">Free</span>
                  ) : (
                    `$${shippingCost.toFixed(2)}`
                  )}
                </span>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span className="text-base">${total.toFixed(2)}</span>
            </div>

            {/* Desktop place order button */}
            <Button
              type="submit"
              form="checkout-form"
              className="hidden lg:flex w-full mt-6 h-11 bg-black text-white text-sm uppercase tracking-[0.1em] hover:bg-neutral-800"
            >
              Place Order
            </Button>
          </div>
        </div>
      </div>

      {/* Order Confirmation Dialog */}
      <Dialog open={showConfirmation}>
        <DialogContent showCloseButton={false} className="sm:max-w-md text-center">
          <DialogHeader className="items-center">
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-2">
              <Check className="h-7 w-7 text-green-600" />
            </div>
            <DialogTitle className="text-xl">
              Thank You for Your Order!
            </DialogTitle>
            <DialogDescription>
              Your order <span className="font-medium text-foreground">
                #SK-12345
              </span> has been placed successfully. We&apos;ll send a
              confirmation email with tracking details shortly.
            </DialogDescription>
          </DialogHeader>

          <Separator className="my-2" />

          <div className="text-sm text-neutral-600 space-y-1">
            <div className="flex justify-between">
              <span>Order Total</span>
              <span className="font-medium text-foreground">
                ${total.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Delivery</span>
              <span className="font-medium text-foreground">3-5 business days</span>
            </div>
          </div>

          <Button
            onClick={handleContinueShopping}
            className="w-full mt-4 h-11 bg-black text-white text-sm uppercase tracking-[0.1em] hover:bg-neutral-800"
          >
            Continue Shopping
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
