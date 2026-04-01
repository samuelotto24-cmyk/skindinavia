# Skindinavia Premium Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the Skindinavia mock from a clean-but-generic e-commerce site into a premium beauty experience that will blow the client away — anchored in the "original formula" narrative, luxurious animations, and Tatcha/Chanel-level visual craft.

**Architecture:** 7-phase overhaul working bottom-up: design foundation (typography, colors) first, then hero redesign, then new sections (TrustBar, HowItWorks, ShopByMoment, FounderStory), then existing section upgrades, then animation polish. Each phase builds on the previous.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4 (OKLCH), Framer Motion 12, GSAP 3.14, shadcn/ui, Lucide icons

---

## Phase 1: Design Foundation

### Task 1: Typography — Add Serif Font for Headlines

The single biggest premium signal. Replace the all-sans-serif look with a serif/sans pairing: **Playfair Display** for headlines, keep **Geist** for body text.

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Add Playfair Display font to layout.tsx**

```tsx
// In src/app/layout.tsx, add the import:
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";

// Add the font instance after existing font declarations:
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

// Update the html className to include the new variable:
<html
  lang="en"
  className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
>
```

- [ ] **Step 2: Register the serif font in globals.css**

In `src/app/globals.css`, inside the `@theme inline` block, add:

```css
--font-serif: "Playfair Display", "Georgia", "Times New Roman", serif;
--font-heading: var(--font-serif);
```

This makes `font-serif` and `font-heading` available as Tailwind utilities (`font-serif`, `font-heading`).

- [ ] **Step 3: Verify fonts load**

Run `npm run dev` and inspect the page. Confirm the `--font-playfair` CSS variable is present on the `<html>` element. We haven't applied it to headings yet — that comes per-component.

---

### Task 2: Color System — Warm Cream & Charcoal

Replace pure white (#fff) background with warm cream, pure black text with charcoal. This single change shifts the entire perception from "generic" to "considered."

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Update the :root CSS variables**

In `src/app/globals.css`, replace the `:root` block with:

```css
:root {
  --background: oklch(0.985 0.003 80);      /* Warm cream — like Tatcha's #FAF9F6 */
  --foreground: oklch(0.15 0.005 285);       /* Charcoal — not pure black */
  --card: oklch(0.99 0.002 80);              /* Slightly warmer card */
  --card-foreground: oklch(0.15 0.005 285);
  --popover: oklch(0.99 0.002 80);
  --popover-foreground: oklch(0.15 0.005 285);
  --primary: oklch(0.18 0.005 285);          /* Dark charcoal for buttons */
  --primary-foreground: oklch(0.985 0.003 80);
  --secondary: oklch(0.965 0.004 80);        /* Warm light gray */
  --secondary-foreground: oklch(0.18 0.005 285);
  --muted: oklch(0.955 0.004 80);            /* Warm muted bg */
  --muted-foreground: oklch(0.45 0.01 285);  /* Medium warm gray */
  --accent: oklch(0.955 0.004 80);
  --accent-foreground: oklch(0.18 0.005 285);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.91 0.003 80);            /* Warm border */
  --input: oklch(0.91 0.003 80);
  --ring: oklch(0.18 0.005 285);
  --chart-1: oklch(0.87 0 0);
  --chart-2: oklch(0.556 0 0);
  --chart-3: oklch(0.439 0 0);
  --chart-4: oklch(0.371 0 0);
  --chart-5: oklch(0.269 0 0);
  --radius: 0.625rem;
  --sidebar: oklch(0.985 0.003 80);
  --sidebar-foreground: oklch(0.18 0.005 285);
  --sidebar-primary: oklch(0.18 0.005 285);
  --sidebar-primary-foreground: oklch(0.985 0.003 80);
  --sidebar-accent: oklch(0.955 0.004 80);
  --sidebar-accent-foreground: oklch(0.18 0.005 285);
  --sidebar-border: oklch(0.91 0.003 80);
  --sidebar-ring: oklch(0.708 0 0);
}
```

- [ ] **Step 2: Add a brand accent color variable**

Still in `:root`, add below the existing variables:

```css
  --brand-gold: oklch(0.75 0.08 75);         /* Warm gold accent */
  --brand-gold-light: oklch(0.92 0.03 75);   /* Light gold for backgrounds */
```

And in the `@theme inline` block, add:

```css
--color-brand-gold: var(--brand-gold);
--color-brand-gold-light: var(--brand-gold-light);
```

- [ ] **Step 3: Verify warm cream renders**

Run dev server. The entire page background should now be a barely-perceptible warm cream instead of stark white. Cards should be slightly warmer than the background. Text should be charcoal, not pure black.

---

### Task 3: Button System — Rounded Pill CTAs

Every premium beauty brand uses rounded pill buttons. Update the base button component.

**Files:**
- Modify: `src/components/ui/button.tsx`

- [ ] **Step 1: Update button border-radius and padding**

In `src/components/ui/button.tsx`, find the base variant styles. Update the base className to use `rounded-full` instead of the current radius. Increase horizontal padding. The key changes:

- Default variant: `rounded-full` 
- All size variants: increase `px` values
- Add `tracking-wide` for letter spacing on buttons

Find the `buttonVariants` definition and update the base styles:

```
// In the base className (applies to all variants), change:
// FROM: whatever border-radius is currently set
// TO: include rounded-full

// In the variants.size section, update:
default: "h-10 px-6 py-2 text-sm"    // was likely px-4
sm: "h-9 px-4 text-xs"               // was likely px-3  
lg: "h-12 px-10 py-2.5 text-sm"      // was likely px-8
icon: "h-10 w-10"                     // unchanged
```

Add `rounded-full` to the base styles that apply to all buttons (alongside the existing classes like `inline-flex`, `items-center`, etc.).

- [ ] **Step 2: Verify buttons render as pills**

Check the hero section. "Shop Bestsellers" and "Our Story" buttons should now be rounded pills with generous padding.

---

## Phase 2: Hero Transformation

### Task 4: Hero — Narrative-First Redesign

The hero should lead with emotion and the "original formula" story, not just product features. Full-width immersive experience.

**Files:**
- Modify: `src/components/home/Hero.tsx`

- [ ] **Step 1: Rewrite the Hero component**

Replace the entire content of `src/components/home/Hero.tsx` with a narrative-first hero:

```tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/mock-data";
import { use3DTilt } from "@/hooks/use-3d-tilt";
import { useMagneticHover } from "@/hooks/use-magnetic-hover";
import { MorphingBlob } from "@/components/animation/MorphingBlob";

const heroProducts = [
  products.find((p) => p.id === "2")!, // Bridal
  products.find((p) => p.id === "3")!, // Oil Control
  products.find((p) => p.id === "1")!, // Original
];

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tiltRef = use3DTilt<HTMLDivElement>({ maxRotation: 6, scale: 1.02 });
  const ctaRef = useMagneticHover<HTMLDivElement>({ radius: 60, strength: 0.2 });
  const activeProduct = heroProducts[activeIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % heroProducts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Warm gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f8f3ed] via-[#faf7f3] to-background" />
      
      {/* Subtle gold accent glow */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-brand-gold-light/30 blur-[120px]" />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-28 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Narrative text */}
          <div className="max-w-xl">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground"
            >
              The Original Formula
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-4xl leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.5rem]"
            >
              The Setting Spray Behind{" "}
              <span className="italic">50,000 Five-Star Reviews</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              Patented cooling technology that locks in your makeup for 16+ hours. 
              Invented in 2005. Trusted by professionals. Finally, under our own name.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              ref={ctaRef}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Button
                size="lg"
                className="h-12 px-10 text-sm tracking-wider uppercase"
                render={<Link href="/shop" />}
              >
                Shop Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-12 px-10 text-sm tracking-wider uppercase"
                render={<Link href="/about-us" />}
              >
                Our Story
              </Button>
            </motion.div>

            {/* Trust micro-stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-14 flex gap-10"
            >
              {[
                { stat: "16+", label: "Hour Wear" },
                { stat: "50K+", label: "Five-Star Reviews" },
                { stat: "20", label: "Years Trusted" },
              ].map((item) => (
                <div key={item.label}>
                  <p className="font-serif text-2xl font-medium tracking-tight">{item.stat}</p>
                  <p className="mt-0.5 text-xs uppercase tracking-wider text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Product showcase */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <MorphingBlob
                color={`${activeProduct.accentColor}12`}
                size={480}
                className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              />

              <div
                ref={tiltRef}
                className="relative z-10 h-[500px] w-[320px] sm:h-[560px] sm:w-[360px]"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProduct.id}
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ type: "spring", stiffness: 120, damping: 18 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Image
                      src={activeProduct.image}
                      alt={activeProduct.name}
                      width={360}
                      height={500}
                      className="h-auto max-h-[500px] w-auto object-contain drop-shadow-2xl"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Product name + dots */}
              <div className="mt-8 text-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeProduct.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-sm font-medium tracking-wide"
                  >
                    {activeProduct.shortName}
                  </motion.p>
                </AnimatePresence>
                <div className="mt-3 flex justify-center gap-2">
                  {heroProducts.map((p, i) => (
                    <button
                      key={p.id}
                      onClick={() => setActiveIndex(i)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === activeIndex ? "w-8 bg-foreground" : "w-2 bg-border"
                      }`}
                      aria-label={`Show ${p.shortName}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify hero renders**

Run dev server. The hero should now show serif headline text, warm gradient background, subtle gold glow, trust micro-stats below the CTA, and the product name beneath the rotating product image.

---

## Phase 3: New Sections

### Task 5: Trust Bar — Social Proof Strip Below Hero

A tight, high-impact strip of credentials between hero and products. Not a full section — a visual bridge.

**Files:**
- Create: `src/components/home/TrustBar.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create TrustBar component**

Create `src/components/home/TrustBar.tsx`:

```tsx
import { Award, Star, Users, FlaskConical } from "lucide-react";

const trustItems = [
  { icon: Star, label: "50,000+ Five-Star Reviews" },
  { icon: Users, label: "Trusted by 10,000+ MUA Pros" },
  { icon: FlaskConical, label: "Patented Cooling Technology" },
  { icon: Award, label: "Allure Best of Beauty" },
];

export function TrustBar() {
  return (
    <section className="border-y border-border/50 bg-card/50">
      <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {trustItems.map((item) => (
            <div key={item.label} className="flex items-center gap-2.5">
              <item.icon className="h-4 w-4 text-brand-gold" strokeWidth={1.5} />
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add TrustBar to page.tsx**

In `src/app/page.tsx`, add the import and place it right after `<Hero />`:

```tsx
import { TrustBar } from "@/components/home/TrustBar";

// In the return:
<Hero />
<TrustBar />
<FeaturedProducts />
// ... rest
```

- [ ] **Step 3: Verify TrustBar renders**

Should appear as a subtle horizontal strip with 4 credential items between the hero and featured products.

---

### Task 6: How It Works — Animated Technology Showcase

This is the killer section. Visualize the patented cooling technology with elegant animations. Makes the science feel premium, not clinical.

**Files:**
- Create: `src/components/home/HowItWorks.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create HowItWorks component**

Create `src/components/home/HowItWorks.tsx`:

```tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Mist",
    description:
      "A fine cooling mist blankets your makeup in thousands of micro-encapsulated temperature-control spheres.",
  },
  {
    number: "02",
    title: "Cool",
    description:
      "Our patented technology lowers the surface temperature of your makeup, fusing it to your skin — not sealing it on top.",
  },
  {
    number: "03",
    title: "Lock",
    description:
      "Spheres of varying sizes release active ingredients over 16+ hours, continuously cooling and controlling oil.",
  },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-32 bg-gradient-to-b from-background via-card to-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs font-medium uppercase tracking-[0.25em] text-brand-gold"
          >
            Patented Technology
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-4 font-serif text-3xl tracking-tight sm:text-4xl lg:text-5xl"
          >
            The Science of 16-Hour Wear
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto mt-4 max-w-xl text-muted-foreground"
          >
            Everyone else seals makeup on. We cool it in. That&apos;s the difference a patent makes.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="mt-20 grid gap-8 lg:grid-cols-3 lg:gap-12">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.15 }}
              className="relative text-center lg:text-left"
            >
              {/* Large step number */}
              <p className="font-serif text-6xl font-light text-border/80 lg:text-7xl">
                {step.number}
              </p>
              <h3 className="mt-4 font-serif text-2xl tracking-tight">
                {step.title}
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {step.description}
              </p>

              {/* Connector line (desktop only) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 -right-6 w-12 border-t border-dashed border-border" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-muted-foreground">
            U.S. Patent Protected &middot; Clinically Tested &middot; Made in USA
          </p>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add HowItWorks to page.tsx**

In `src/app/page.tsx`, add the import and place after PressLogos:

```tsx
import { HowItWorks } from "@/components/home/HowItWorks";

// In the return:
<PressLogos />
<HowItWorks />
<ArtistSpotlight />
```

- [ ] **Step 3: Verify section renders and animates on scroll**

Scroll down to the section. The step numbers, titles, and descriptions should fade/slide in with stagger. The large "01 02 03" numbers should feel editorial.

---

### Task 7: Shop by Moment — Occasion-Based Product Navigation

Replace the generic "Featured Products" with an emotionally-driven shopping experience organized by life moment.

**Files:**
- Create: `src/components/home/ShopByMoment.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create ShopByMoment component**

Create `src/components/home/ShopByMoment.tsx`:

```tsx
"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { products } from "@/lib/mock-data";

const moments = [
  {
    title: "Your Wedding Day",
    subtitle: "Cry-proof. Dance-proof. Perfect.",
    description: "Engineered for the most important day of your life.",
    product: products.find((p) => p.id === "2")!,
    href: "/products/the-makeup-finishing-spray-bridal",
    gradient: "from-rose-50/80 to-pink-50/40",
  },
  {
    title: "Your Longest Days",
    subtitle: "From 6 AM to midnight.",
    description: "The original 16-hour formula for everything life throws at you.",
    product: products.find((p) => p.id === "1")!,
    href: "/products/the-makeup-finishing-spray",
    gradient: "from-blue-50/60 to-sky-50/30",
  },
  {
    title: "Your Oiliest Moments",
    subtitle: "Matte. All day. No touch-ups.",
    description: "Oil-absorbing technology that controls shine through heat and humidity.",
    product: products.find((p) => p.id === "3")!,
    href: "/products/the-makeup-finishing-spray-oil-control",
    gradient: "from-emerald-50/50 to-teal-50/30",
  },
];

export function ShopByMoment() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} className="py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground"
          >
            Find Your Formula
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-4 font-serif text-3xl tracking-tight sm:text-4xl lg:text-5xl"
          >
            Shop by Moment
          </motion.h2>
        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-3">
          {moments.map((moment, i) => (
            <motion.div
              key={moment.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.12 }}
            >
              <Link href={moment.href} className="group block">
                <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${moment.gradient} p-8 pb-0 transition-all duration-500 hover:shadow-lg hover:shadow-stone-200/50`}>
                  {/* Text */}
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    {moment.subtitle}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl tracking-tight">
                    {moment.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {moment.description}
                  </p>

                  {/* Product image */}
                  <div className="mt-6 flex justify-center">
                    <div className="relative h-[280px] w-[180px] transition-transform duration-500 group-hover:scale-105">
                      <Image
                        src={moment.product.image}
                        alt={moment.product.name}
                        fill
                        className="object-contain drop-shadow-lg"
                      />
                    </div>
                  </div>
                </div>

                {/* Price + CTA below card */}
                <div className="mt-4 flex items-center justify-between px-1">
                  <p className="text-sm text-muted-foreground">
                    From <span className="font-medium text-foreground">${moment.product.sizes[0].price}</span>
                  </p>
                  <span className="text-sm font-medium underline-offset-4 transition-all group-hover:underline">
                    Shop Now
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Replace FeaturedProducts with ShopByMoment in page.tsx**

In `src/app/page.tsx`:
- Remove the `FeaturedProducts` import
- Add `import { ShopByMoment } from "@/components/home/ShopByMoment";`
- Replace `<FeaturedProducts />` with `<ShopByMoment />`

```tsx
import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { ShopByMoment } from "@/components/home/ShopByMoment";
import { PressLogos } from "@/components/home/PressLogos";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ArtistSpotlight } from "@/components/home/ArtistSpotlight";
import { CaseStudyCards } from "@/components/home/CaseStudyCards";
import { ReviewsCarousel } from "@/components/home/ReviewsCarousel";
import { BlogPreview } from "@/components/home/BlogPreview";
import { Newsletter } from "@/components/home/Newsletter";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <TrustBar />
      <ShopByMoment />
      <PressLogos />
      <HowItWorks />
      <ArtistSpotlight />
      <CaseStudyCards />
      <ReviewsCarousel />
      <BlogPreview />
      <Newsletter />
    </main>
  );
}
```

- [ ] **Step 3: Verify ShopByMoment renders**

Three tall cards with soft gradient backgrounds, product images that scale on hover, and serif headings. Each card should link to the correct product page.

---

### Task 8: Founder Story — Allen Goldman Narrative Section

This is the emotional anchor. The origin story that makes Skindinavia more than a product.

**Files:**
- Create: `src/components/home/FounderStory.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create FounderStory component**

Create `src/components/home/FounderStory.tsx`:

```tsx
"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";

export function FounderStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-32 bg-gradient-to-b from-background to-card">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Image / visual placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-[#f0ebe4] to-[#e8e0d6]">
              {/* Decorative quote */}
              <div className="absolute inset-0 flex items-center justify-center p-12">
                <p className="font-serif text-3xl italic leading-snug text-foreground/[0.07] sm:text-4xl lg:text-5xl">
                  &ldquo;Makeup isn&apos;t vanity — it&apos;s identity.&rdquo;
                </p>
              </div>
              {/* Founder initials */}
              <div className="absolute bottom-8 left-8">
                <p className="font-serif text-lg tracking-tight text-foreground/20">AG</p>
              </div>
            </div>
          </motion.div>

          {/* Story */}
          <div className="max-w-lg">
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xs font-medium uppercase tracking-[0.25em] text-brand-gold"
            >
              Our Origin
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-4 font-serif text-3xl tracking-tight sm:text-4xl"
            >
              One Night in Miami Changed Everything
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="mt-6 space-y-4 text-muted-foreground leading-relaxed"
            >
              <p>
                In 2005, founder Allen Goldman watched a woman&apos;s makeup melt under the 
                heat of a Miami nightclub. That moment sparked a question nobody in beauty 
                was asking: <em>what if you could cool makeup instead of sealing it?</em>
              </p>
              <p>
                Two years of R&D led to a patented formula built on micro-encapsulated 
                cooling spheres. The first customers weren&apos;t consumers — they were 
                Hollywood makeup artists and Broadway pros who needed absolute performance 
                under lights, sweat, and tears.
              </p>
              <p>
                For 15 years, a major beauty brand sold our formula as their own bestseller. 
                Now, Skindinavia stands on its own — the original, under our name, with the 
                technology that started it all.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-8"
            >
              <Button
                variant="outline"
                size="lg"
                className="h-12 px-10 text-sm tracking-wider uppercase"
                render={<Link href="/about-us" />}
              >
                Read the Full Story
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add FounderStory to page.tsx**

In `src/app/page.tsx`, add the import and place after ArtistSpotlight:

```tsx
import { FounderStory } from "@/components/home/FounderStory";

// In the return, after ArtistSpotlight:
<ArtistSpotlight />
<FounderStory />
<CaseStudyCards />
```

- [ ] **Step 3: Verify section renders**

The founder story should feel editorial — large serif heading, warm gradient placeholder image with the ghosted quote, and paragraph text that tells the story in 3 beats.

---

## Phase 4: Existing Section Upgrades

### Task 9: Upgrade Section Headers to Serif

Apply the serif font to ALL section headers across existing components for consistency.

**Files:**
- Modify: `src/components/home/PressLogos.tsx`
- Modify: `src/components/home/ArtistSpotlight.tsx`
- Modify: `src/components/home/CaseStudyCards.tsx`
- Modify: `src/components/home/ReviewsCarousel.tsx`
- Modify: `src/components/home/BlogPreview.tsx`
- Modify: `src/components/home/Newsletter.tsx`

- [ ] **Step 1: Update PressLogos header**

In `src/components/home/PressLogos.tsx`, change the `<p>` subtitle text to:

```tsx
<p className="text-center text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
  As Seen In
</p>
```

Shorter, more premium. "Recognized Globally" is too try-hard.

- [ ] **Step 2: Update ArtistSpotlight headers**

In `src/components/home/ArtistSpotlight.tsx`:

Change the section heading:
```tsx
<h2 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">
  Artist Spotlight
</h2>
```

Change the artist name heading:
```tsx
<h3 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">
  {artist.name}
</h3>
```

- [ ] **Step 3: Update CaseStudyCards headers**

In `src/components/home/CaseStudyCards.tsx`:

```tsx
<h2 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">
  Real Results, Real Stories
</h2>
```

Also update the `from-white` gradient to use the background variable — change the section className:
```tsx
<section className="py-24 bg-gradient-to-b from-background to-card/50">
```

- [ ] **Step 4: Update ReviewsCarousel headers**

In `src/components/home/ReviewsCarousel.tsx`:

```tsx
<h2 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">
  What Our Customers Say
</h2>
```

- [ ] **Step 5: Update BlogPreview headers**

In `src/components/home/BlogPreview.tsx`:

```tsx
<h2 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">
  From the Blog
</h2>
```

- [ ] **Step 6: Update Newsletter header**

In `src/components/home/Newsletter.tsx`:

```tsx
<h2 className="font-serif text-3xl tracking-tight sm:text-4xl">
  Join the Skindinavia Community
</h2>
```

- [ ] **Step 7: Verify all section headers are now serif**

Scroll through the full page. Every section heading should render in Playfair Display, creating a cohesive editorial feel.

---

### Task 10: Upgrade Header & Footer to Match Premium System

**Files:**
- Modify: `src/components/layout/Header.tsx`
- Modify: `src/components/layout/Footer.tsx`
- Modify: `src/components/layout/AnnouncementBar.tsx`

- [ ] **Step 1: Update Header logo to use serif font**

In `src/components/layout/Header.tsx`, update the logo Link:

```tsx
<Link
  href="/"
  className="font-serif text-xl tracking-[0.15em]"
>
  Skindinavia
</Link>
```

Change from all-caps `SKINDINAVIA` to title-case `Skindinavia` with serif — more premium and refined.

Also update the `bg-white` in the header to `bg-background`:
```tsx
className={`sticky top-0 z-40 bg-background border-b border-border/50 transition-shadow duration-200 ${
  scrolled ? "shadow-sm" : ""
}`}
```

And update the mobile menu SheetTitle similarly:
```tsx
<SheetTitle className="font-serif text-base tracking-[0.15em]">
  Skindinavia
</SheetTitle>
```

- [ ] **Step 2: Update AnnouncementBar colors**

In `src/components/layout/AnnouncementBar.tsx`, soften the announcement bar to match the warm palette:

```tsx
<div className="bg-foreground text-background text-center py-2.5 px-4">
```

This uses the charcoal foreground color instead of pure black, and the cream background color for text.

- [ ] **Step 3: Update Footer styling**

In `src/components/layout/Footer.tsx`:

Update the newsletter heading:
```tsx
<h3 className="font-serif text-lg tracking-wide mb-2">
  Join the Community
</h3>
```

Update the newsletter form input to match warm palette:
```tsx
<input
  type="email"
  placeholder="Enter your email"
  className="flex-1 bg-neutral-900 border border-neutral-800 rounded-l-full px-5 py-2.5 text-sm placeholder:text-neutral-500 focus:outline-none focus:border-neutral-600"
  aria-label="Email address"
/>
<button
  type="submit"
  className="bg-white text-black px-8 py-2.5 text-sm tracking-wider uppercase font-medium hover:bg-neutral-200 transition-colors rounded-r-full"
>
  Subscribe
</button>
```

Add `rounded-l-full` to the input and `rounded-r-full` to the button so they form a combined pill shape.

Update the tagline at the bottom:
```tsx
<p className="tracking-wider font-serif italic">Patented. Trusted. Since 2005.</p>
```

- [ ] **Step 4: Verify layout updates**

Check header: logo should be serif title-case, background should be warm cream. Check announcement bar: charcoal background. Check footer: serif headings, pill-shaped newsletter form.

---

### Task 11: Upgrade Reviews Section — Designed-In Social Proof

Make reviews feel like editorial content, not a bolted-on widget.

**Files:**
- Modify: `src/components/home/ReviewsCarousel.tsx`

- [ ] **Step 1: Enhance the review card styling**

In `src/components/home/ReviewsCarousel.tsx`, update the review card div to feel warmer:

Replace the card className:
```tsx
className={`rounded-2xl border border-border/30 bg-card p-10 ${
  i > 0 ? "hidden md:block" : ""
}`}
```

Update the star color to use brand gold:
```tsx
<div className="flex gap-0.5 text-brand-gold">
```

Update the title to use serif:
```tsx
<h4 className="mt-5 font-serif text-lg tracking-tight">
  {review.title}
</h4>
```

Increase the quote text size slightly:
```tsx
<p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-5">
```

- [ ] **Step 2: Verify reviews look more premium**

Review cards should have warmer borders, gold stars, serif titles, and more breathing room (p-10 vs p-8).

---

## Phase 5: Homepage Section Ordering

### Task 12: Final Page Composition

Set the definitive section order for maximum narrative flow.

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Set final section order**

Update `src/app/page.tsx` to this exact order:

```tsx
import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { PressLogos } from "@/components/home/PressLogos";
import { ShopByMoment } from "@/components/home/ShopByMoment";
import { HowItWorks } from "@/components/home/HowItWorks";
import { FounderStory } from "@/components/home/FounderStory";
import { ArtistSpotlight } from "@/components/home/ArtistSpotlight";
import { CaseStudyCards } from "@/components/home/CaseStudyCards";
import { ReviewsCarousel } from "@/components/home/ReviewsCarousel";
import { BlogPreview } from "@/components/home/BlogPreview";
import { Newsletter } from "@/components/home/Newsletter";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <TrustBar />
      <PressLogos />
      <ShopByMoment />
      <HowItWorks />
      <FounderStory />
      <ArtistSpotlight />
      <CaseStudyCards />
      <ReviewsCarousel />
      <BlogPreview />
      <Newsletter />
    </main>
  );
}
```

The flow is:
1. **Hero** — Emotion + product → "The Original Formula"
2. **TrustBar** — Credentials strip → instant legitimacy  
3. **PressLogos** — Media validation → "As Seen In"
4. **ShopByMoment** — Shop by occasion → "Find Your Formula"
5. **HowItWorks** — The science → "Why we're different"
6. **FounderStory** — The origin → emotional anchor
7. **ArtistSpotlight** — Pro endorsement → credibility
8. **CaseStudies** — Real-world proof → "it actually works"
9. **Reviews** — Customer voices → social proof
10. **Blog** — Authority content → "we know beauty"
11. **Newsletter** — Community → conversion

- [ ] **Step 2: Verify full page scroll**

Scroll the entire page top to bottom. Each section should flow naturally into the next, building a narrative arc from "who we are" → "what we make" → "why it works" → "who trusts us" → "join us."

---

## Phase 6: Animation Polish

### Task 13: Add Scroll-Triggered Section Entrances

Add subtle, consistent entrance animations to the sections that don't have them yet (PressLogos, CaseStudyCards, BlogPreview).

**Files:**
- Modify: `src/components/home/PressLogos.tsx`
- Modify: `src/components/home/CaseStudyCards.tsx`
- Modify: `src/components/home/BlogPreview.tsx`
- Modify: `src/components/home/Newsletter.tsx`

- [ ] **Step 1: Add scroll animation to PressLogos**

In `src/components/home/PressLogos.tsx`, add "use client" directive (if not present), add imports and a ref:

```tsx
"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { pressLogos, pressLogoImages } from "@/lib/mock-data";
```

Wrap the section with a ref and animate the subtitle:

```tsx
export function PressLogos() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="border-y border-border/50 py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-10">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground"
        >
          As Seen In
        </motion.p>
      </div>
      {/* ... rest unchanged */}
```

- [ ] **Step 2: Add scroll animation to CaseStudyCards**

Convert to client component (add "use client"), add ref/useInView, wrap each card in a motion.div with staggered entrance:

At the top of `src/components/home/CaseStudyCards.tsx`:
```tsx
"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { caseStudies } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";

export function CaseStudyCards() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
```

Wrap the section with `ref={ref}`, animate the heading, and wrap each card:

```tsx
{caseStudies.map((study, i) => (
  <motion.div
    key={study.id}
    initial={{ opacity: 0, y: 20 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6, delay: i * 0.1 }}
  >
    <Link href={`/case-studies/${study.slug}`} className="group">
      {/* ... existing card content unchanged ... */}
    </Link>
  </motion.div>
))}
```

- [ ] **Step 3: Add scroll animation to BlogPreview**

Same pattern — add "use client", ref, useInView, wrap each blog card in a motion.div:

At the top of `src/components/home/BlogPreview.tsx`:
```tsx
"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { blogPosts } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
```

Add ref/isInView in the component body, wrap each card with:
```tsx
<motion.div
  key={post.id}
  initial={{ opacity: 0, y: 20 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.6, delay: i * 0.1 }}
>
```

- [ ] **Step 4: Add scroll animation to Newsletter**

In `src/components/home/Newsletter.tsx`, add useRef/useInView and animate the heading and form:

```tsx
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
```

```tsx
const sectionRef = useRef<HTMLElement>(null);
const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
```

Add `ref={sectionRef}` to the section, wrap the h2 and p in motion.div:
```tsx
<motion.h2
  initial={{ opacity: 0, y: 15 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.8 }}
  className="font-serif text-3xl tracking-tight sm:text-4xl"
>
  Join the Skindinavia Community
</motion.h2>
```

- [ ] **Step 5: Verify all sections animate on scroll**

Scroll through the full page slowly. Every section should elegantly fade/slide into view as you reach it. Nothing should be static — everything has a subtle entrance.

---

## Phase 7: Final QA

### Task 14: Build Verification & Visual QA

**Files:** None (testing only)

- [ ] **Step 1: Run production build**

```bash
cd /Users/samotto/skindinavia && npm run build
```

Fix any TypeScript errors or build failures.

- [ ] **Step 2: Visual check — full page scroll (desktop)**

Open the dev server at full desktop width. Scroll top to bottom and verify:
- Warm cream background throughout (no pure white sections)
- All headings in Playfair Display serif
- All buttons are rounded pills
- Hero has narrative copy + trust micro-stats
- TrustBar appears between hero and press logos
- ShopByMoment cards have soft gradient backgrounds
- HowItWorks has the 01/02/03 editorial steps
- FounderStory has the Goldman narrative
- All sections animate on scroll
- Footer newsletter form is pill-shaped
- No visual regressions

- [ ] **Step 3: Visual check — mobile (375px)**

Resize to mobile width. Verify:
- Hero stacks vertically (text above product)
- ShopByMoment cards stack to single column
- All text is readable
- Buttons are full-width or appropriately sized
- No horizontal overflow
- Navigation hamburger works

- [ ] **Step 4: Commit all changes**

```bash
git add -A
git commit -m "feat: premium overhaul — serif typography, warm color system, narrative hero, new sections (TrustBar, HowItWorks, ShopByMoment, FounderStory), scroll animations, pill buttons"
```
