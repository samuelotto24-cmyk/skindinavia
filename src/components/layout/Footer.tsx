import Link from "next/link";
import { ExternalLink } from "lucide-react";

const shopLinks = [
  { label: "Finishing Sprays", href: "/shop/finishing-sprays" },
  { label: "Primer Sprays", href: "/shop/primer-sprays" },
  { label: "Artist Kits", href: "/shop/kits" },
  { label: "All Products", href: "/shop" },
];

const companyLinks = [
  { label: "About Us", href: "/about-us" },
  { label: "Artist Spotlights", href: "/artist-spotlights" },
  { label: "Blog", href: "/blog" },
  { label: "Case Studies", href: "/case-studies" },
];

const supportLinks = [
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Shipping & Returns", href: "/shipping-returns" },
  { label: "Privacy Policy", href: "/privacy" },
];

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/skindinavia" },
  { label: "Facebook", href: "https://facebook.com/skindinavia" },
  { label: "YouTube", href: "https://youtube.com/skindinavia" },
  { label: "Twitter / X", href: "https://twitter.com/skindinavia" },
];

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-white">
      {/* Newsletter */}
      <div className="border-b border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 text-center">
          <h3 className="text-sm tracking-[0.2em] uppercase mb-2">
            Join the Community
          </h3>
          <p className="text-neutral-400 text-sm mb-6 max-w-md mx-auto">
            Get exclusive offers, beauty tips, and be the first to know about new
            launches.
          </p>
          <form
            className="flex max-w-md mx-auto gap-0"
            action="#"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-neutral-900 border border-neutral-700 px-4 py-2.5 text-sm placeholder:text-neutral-500 focus:outline-none focus:border-neutral-500"
              aria-label="Email address"
            />
            <button
              type="submit"
              className="bg-white text-black px-6 py-2.5 text-sm tracking-wide uppercase font-medium hover:bg-neutral-200 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Link columns */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-xs tracking-[0.15em] uppercase font-medium mb-4">
              Shop
            </h4>
            <ul className="space-y-2.5">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.15em] uppercase font-medium mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.15em] uppercase font-medium mb-4">
              Support
            </h4>
            <ul className="space-y-2.5">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.15em] uppercase font-medium mb-4">
              Follow Us
            </h4>
            <ul className="space-y-2.5">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-neutral-400 hover:text-white transition-colors inline-flex items-center gap-2"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-neutral-500">
          <p>&copy; {new Date().getFullYear()} Skindinavia. All rights reserved.</p>
          <p className="tracking-wide">Patented. Trusted. Since 2005.</p>
        </div>
      </div>
    </footer>
  );
}
