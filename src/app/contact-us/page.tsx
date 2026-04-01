import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Contact Us — Skindinavia",
  description:
    "Have a question, comment, or press inquiry? Get in touch with the Skindinavia team.",
};

export default function ContactUsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 lg:py-24">
      <div className="text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Get in Touch
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight lg:text-5xl">
          Contact Us
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Have a question about our products, your order, or a partnership
          opportunity? We&apos;d love to hear from you.
        </p>
      </div>

      <Separator className="my-14" />

      <div className="grid gap-14 lg:grid-cols-2">
        {/* Form */}
        <form action="#" className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block text-sm font-medium"
            >
              Name
            </label>
            <Input id="name" placeholder="Your full name" />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium"
            >
              Email
            </label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>

          <div>
            <label
              htmlFor="subject"
              className="mb-1.5 block text-sm font-medium"
            >
              Subject
            </label>
            <select
              id="subject"
              className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              defaultValue=""
            >
              <option value="" disabled>
                Select a subject...
              </option>
              <option>Product Question</option>
              <option>Order Support</option>
              <option>Wholesale Inquiry</option>
              <option>Press / Media</option>
              <option>Partnership</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-1.5 block text-sm font-medium"
            >
              Message
            </label>
            <Textarea
              id="message"
              placeholder="How can we help?"
              className="min-h-32"
            />
          </div>

          <Button type="submit" size="lg">
            Send Message
          </Button>
        </form>

        {/* Contact Info */}
        <div className="space-y-10 lg:pl-8">
          <div>
            <h2 className="text-lg font-semibold">Customer Support</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Questions about your order, product usage, or returns? Our support
              team typically responds within 24 hours.
            </p>
            <a
              href="mailto:support@skindinavia.com"
              className="mt-2 inline-block text-sm font-medium underline underline-offset-4"
            >
              support@skindinavia.com
            </a>
          </div>

          <div>
            <h2 className="text-lg font-semibold">Press &amp; Media</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              For press kits, product samples, and media inquiries, please
              reach out to our PR team.
            </p>
            <a
              href="mailto:press@skindinavia.com"
              className="mt-2 inline-block text-sm font-medium underline underline-offset-4"
            >
              press@skindinavia.com
            </a>
          </div>

          <div>
            <h2 className="text-lg font-semibold">Wholesale &amp; Pro</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Makeup artists, studios, and retailers — contact us for wholesale
              pricing and bulk order information.
            </p>
            <a
              href="mailto:support@skindinavia.com"
              className="mt-2 inline-block text-sm font-medium underline underline-offset-4"
            >
              support@skindinavia.com
            </a>
          </div>

          <div className="rounded-2xl bg-neutral-50 p-6">
            <h3 className="text-sm font-semibold">Business Hours</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Monday &ndash; Friday: 9:00 AM &ndash; 5:00 PM PST
              <br />
              Saturday &ndash; Sunday: Closed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
