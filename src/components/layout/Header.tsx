"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { SearchOverlay } from "@/components/layout/SearchOverlay";

const shopDropdown = [
  { label: "Finishing Sprays", href: "/shop/finishing-sprays" },
  { label: "Primer Sprays", href: "/shop/primer-sprays" },
  { label: "Artist Kits", href: "/shop/kits" },
];

const navLinks = [
  { label: "About Us", href: "/about-us" },
  { label: "Artist Spotlights", href: "/artist-spotlights" },
  { label: "Blog", href: "/blog" },
];

export default function Header() {
  const { openCart, itemCount } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 bg-background border-b border-border/50 transition-shadow duration-200 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 h-16">
        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 -ml-2"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Logo */}
        <Link
          href="/"
          className="font-serif text-xl tracking-[0.15em]"
        >
          Skindinavia
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {/* Shop dropdown */}
          <div className="group relative">
            <Link
              href="/shop"
              className="text-sm tracking-wide uppercase hover:text-neutral-500 transition-colors py-5"
            >
              Shop
            </Link>
            <div className="absolute top-full left-0 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="bg-white border border-neutral-200 shadow-lg rounded-sm min-w-[200px] py-2">
                {shopDropdown.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-5 py-2.5 text-sm hover:bg-neutral-50 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="border-t border-neutral-100 mt-1 pt-1">
                  <Link
                    href="/shop"
                    className="block px-5 py-2.5 text-sm font-medium hover:bg-neutral-50 transition-colors"
                  >
                    Shop All
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm tracking-wide uppercase hover:text-neutral-500 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-1.5 rounded-full border border-border/60 px-3 py-1.5 text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
            aria-label="Search"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="text-xs hidden sm:inline">Search</span>
          </button>
          <button
            className="p-2 relative"
            onClick={openCart}
            aria-label="Open cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-black text-white text-[10px] font-medium rounded-full h-4 w-4 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu sheet */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-[300px] p-0">
          <SheetHeader className="border-b border-neutral-200 px-5 py-4">
            <SheetTitle className="font-serif text-base tracking-[0.15em]">
              Skindinavia
            </SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col py-4">
            <Link
              href="/shop"
              className="px-5 py-3 text-sm tracking-wide uppercase font-medium"
              onClick={() => setMobileOpen(false)}
            >
              Shop
            </Link>
            {shopDropdown.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-8 py-2.5 text-sm text-neutral-600"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="border-t border-neutral-100 my-2" />
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-5 py-3 text-sm tracking-wide uppercase"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
