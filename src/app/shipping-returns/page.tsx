import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Shipping & Returns — Skindinavia",
  description:
    "Free shipping on orders over $40. 30-day satisfaction guarantee. Learn about our shipping options and return policy.",
};

export default function ShippingReturnsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
      <div className="text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Policies
        </p>
        <h1 className="mt-3 text-4xl font-serif tracking-tight lg:text-5xl">
          Shipping &amp; Returns
        </h1>
      </div>

      <Separator className="my-14" />

      {/* Shipping */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold tracking-tight">Shipping</h2>

        <div className="rounded-2xl border border-border p-6">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold">Free Standard Shipping</h3>
            <Badge variant="secondary">Orders $40+</Badge>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            All domestic orders over $40 qualify for free standard shipping.
            No coupon code required — the discount is applied automatically at
            checkout.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-border p-6">
            <h3 className="font-semibold">Standard Shipping</h3>
            <p className="mt-1 text-2xl font-bold">5&ndash;7 business days</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Free on orders over $40. Orders under $40 ship for a flat rate
              of $5.95.
            </p>
          </div>
          <div className="rounded-2xl border border-border p-6">
            <h3 className="font-semibold">Express Shipping</h3>
            <p className="mt-1 text-2xl font-bold">2&ndash;3 business days</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Available for $12.95 on all domestic orders. Select at checkout.
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-neutral-50 p-6">
          <h3 className="font-semibold">International Shipping</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            We ship internationally to over 100 countries. International
            shipping rates and delivery times are calculated at checkout based
            on your location. Please note that international orders may be
            subject to customs duties and taxes, which are the responsibility
            of the recipient.
          </p>
        </div>
      </section>

      <Separator className="my-14" />

      {/* Returns */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold tracking-tight">Returns</h2>

        <div className="rounded-2xl border border-border p-6">
          <h3 className="text-lg font-semibold">
            30-Day Satisfaction Guarantee
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            We stand behind every product we make. If you&apos;re not
            completely satisfied with your purchase, you can return it within
            30 days of delivery for a full refund or exchange — no questions
            asked.
          </p>
        </div>

        <div>
          <h3 className="font-semibold">How to Initiate a Return</h3>
          <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm text-muted-foreground">
            <li>
              Email our support team at{" "}
              <a
                href="mailto:support@skindinavia.com"
                className="font-medium text-foreground underline underline-offset-4"
              >
                support@skindinavia.com
              </a>{" "}
              with your order number and reason for return.
            </li>
            <li>
              Our team will respond within 24 hours with a prepaid return
              shipping label and instructions.
            </li>
            <li>
              Pack the product(s) securely and drop off the package at your
              nearest shipping location.
            </li>
            <li>
              Once we receive and inspect the return, your refund will be
              processed within 5&ndash;7 business days to your original
              payment method.
            </li>
          </ol>
        </div>

        <div className="rounded-2xl bg-neutral-50 p-6">
          <h3 className="font-semibold">Please Note</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            <li>
              Products must be returned in their original packaging.
            </li>
            <li>
              Opened products are eligible for return as long as at least 75%
              of the product remains.
            </li>
            <li>
              Gift sets and kits must be returned as complete sets.
            </li>
            <li>
              Sale items and gift cards are final sale and cannot be returned.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
