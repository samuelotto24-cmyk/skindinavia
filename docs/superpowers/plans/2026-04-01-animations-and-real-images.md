# Animations & Real Product Images Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add GSAP + Framer Motion animations and real product photography to the Skindinavia website's Homepage, Product Detail, and Shop pages.

**Architecture:** Install GSAP and Framer Motion. Create reusable animation hooks (`useMagneticHover`, `use3DTilt`) and wrapper components (`MorphingBlob`, `SpringEntrance`, `ElasticCard`). Add image URLs to mock data. Update next.config.ts for remote images. Then rewrite the three focus pages' components to use real images and animations.

**Tech Stack:** GSAP 3 + @gsap/react, Framer Motion 11, next/image for optimized product photos

---

### Task 1: Install Dependencies & Configure next.config.ts

**Files:**
- Modify: `package.json` (via npm install)
- Modify: `next.config.ts`

- [ ] **Step 1: Install GSAP, @gsap/react, and Framer Motion**

```bash
cd /Users/samotto/skindinavia && npm install gsap @gsap/react framer-motion
```

- [ ] **Step 2: Update next.config.ts with remote image patterns**

Replace the contents of `next.config.ts` with:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "skindinavia.wpenginepowered.com",
      },
      {
        protocol: "https",
        hostname: "skindinavia.com",
      },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 3: Verify build still passes**

```bash
cd /Users/samotto/skindinavia && npx next build 2>&1 | tail -5
```

Expected: `✓ Generating static pages` with no errors.

- [ ] **Step 4: Commit**

```bash
cd /Users/samotto/skindinavia && git add package.json package-lock.json next.config.ts && git commit -m "chore: add gsap, framer-motion, configure remote images"
```

---

### Task 2: Add Image URLs to Mock Data

**Files:**
- Modify: `src/lib/mock-data.ts`

- [ ] **Step 1: Add image fields to the Product type**

In `src/lib/mock-data.ts`, update the `Product` type to add these fields after `accentColor`:

```ts
  image: string;
  images: string[];
```

- [ ] **Step 2: Add image URLs to every product in the products array**

The base URL for all images is `https://skindinavia.wpenginepowered.com/wp-content/uploads/`. Add these fields to each product object:

Product id "1" (Original Finishing Spray):
```ts
    image: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2014/03/MFS-4oz__93457.1681396511.570.570.png",
    images: ["https://skindinavia.wpenginepowered.com/wp-content/uploads/2014/03/MFS-4oz__93457.1681396511.570.570.png"],
```

Product id "2" (Bridal):
```ts
    image: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2014/11/MFSBridal-4oz__49822.1681396994.570.570.png",
    images: ["https://skindinavia.wpenginepowered.com/wp-content/uploads/2014/11/MFSBridal-4oz__49822.1681396994.570.570.png"],
```

Product id "3" (Oil Control):
```ts
    image: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2014/03/MFSOil-4oz__12722.1681400833.570.570.png",
    images: ["https://skindinavia.wpenginepowered.com/wp-content/uploads/2014/03/MFSOil-4oz__12722.1681400833.570.570.png"],
```

Product id "4" (Primer Spray):
```ts
    image: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2014/03/Primer-4oz__94106.1681398713.570.570.png",
    images: ["https://skindinavia.wpenginepowered.com/wp-content/uploads/2014/03/Primer-4oz__94106.1681398713.570.570.png"],
```

Product id "5" (Primer Oil Control) — reuse the oil control kit image since no standalone image was found:
```ts
    image: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2014/03/PrepSetKitOil-4oz__71375.1681400000.570.570.png",
    images: ["https://skindinavia.wpenginepowered.com/wp-content/uploads/2014/03/PrepSetKitOil-4oz__71375.1681400000.570.570.png"],
```

Product id "6" (Prep and Set Kit):
```ts
    image: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2014/03/Prep_Set_4oz_front__45711.1623870869.570.570.jpg",
    images: ["https://skindinavia.wpenginepowered.com/wp-content/uploads/2014/03/Prep_Set_4oz_front__45711.1623870869.570.570.jpg"],
```

Product id "7" (Oil Control Kit) — same image as id 5:
```ts
    image: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2014/03/PrepSetKitOil-4oz__71375.1681400000.570.570.png",
    images: ["https://skindinavia.wpenginepowered.com/wp-content/uploads/2014/03/PrepSetKitOil-4oz__71375.1681400000.570.570.png"],
```

Product id "8" (Prep, Set and Remove):
```ts
    image: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2017/01/kit__66659.1706023513.570.570.png",
    images: ["https://skindinavia.wpenginepowered.com/wp-content/uploads/2017/01/kit__66659.1706023513.570.570.png"],
```

Product id "9" (Remover Spray):
```ts
    image: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2019/09/Remover_4oz_front__97154.1613750224.570.570.jpg",
    images: ["https://skindinavia.wpenginepowered.com/wp-content/uploads/2019/09/Remover_4oz_front__97154.1613750224.570.570.jpg"],
```

Product id "10" (Bulk Kit) — use the bottles group image:
```ts
    image: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2025/07/bottles-image.png",
    images: ["https://skindinavia.wpenginepowered.com/wp-content/uploads/2025/07/bottles-image.png"],
```

- [ ] **Step 3: Add press logo image map**

Add this export after the `pressLogos` string array:

```ts
export const pressLogoImages: Record<string, string> = {
  Vogue: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2021/09/vogue-logo-300x89.png",
  Allure: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2021/09/allure-magazine-logo-300x87.png",
  Glamour: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2021/10/glamour-logo.png",
  Byrdie: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2021/12/BYRDIE-300x59.png",
  PopSugar: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2022/04/popsugar-logo-300x53.jpg",
  "Marie Claire": "https://skindinavia.wpenginepowered.com/wp-content/uploads/2021/10/marie-glaire-logo.png",
  People: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2021/10/people-magazine-logo.png",
  "Teen Vogue": "https://skindinavia.wpenginepowered.com/wp-content/uploads/2021/10/teen-vogue-logo.png",
  Shape: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2021/09/shape-magazine-logo.png",
  Essence: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2021/10/essence-logo.png",
  Nylon: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2021/09/nylon-logo-300x51.png",
  Brides: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2021/10/brides-mag-logo.png",
  HuffPost: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2021/09/huff-post-logo-300x116.png",
  Refinery29: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2021/09/refinery29-logo-png-1-300x211-1.png",
  "Elite Daily": "https://skindinavia.wpenginepowered.com/wp-content/uploads/2022/02/Elite-Daily-Feature-Skindinavia.png",
  "US Weekly": "https://skindinavia.wpenginepowered.com/wp-content/uploads/2021/10/us-weekly-logo.png",
  Self: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2021/10/self-magazine-logo.png",
  "Martha Stewart": "https://skindinavia.wpenginepowered.com/wp-content/uploads/2021/09/martha-stewart-living-logo.jpg",
  "In Touch": "https://skindinavia.wpenginepowered.com/wp-content/uploads/2021/10/intouche-magazine-logo.png",
  "New Beauty": "https://skindinavia.wpenginepowered.com/wp-content/uploads/2021/10/new-beauty-magazine.png",
};
```

- [ ] **Step 4: Add lifestyle/hero image constants**

Add after the press logo map:

```ts
export const heroImages = {
  bottlesGroup: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2025/07/bottles-image-home.png",
  bridalLifestyle: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2025/04/brides2.png",
  fashionista: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2024/12/fashionista-hero-scaled-1-scaled.jpg",
  artistSpotlight: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2022/08/Untitled-design.png",
  makeupUnderMasks: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2021/10/shutterstock_1756040273-scaled.jpg",
  sfxCaseStudy: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2021/09/shutterstock_223600444-scaled.jpg",
};

export const instagramImages = [
  "https://skindinavia.wpenginepowered.com/wp-content/uploads/2022/10/skindinavia_301654740_843255973747273_6612108819761506876_n.jpg",
  "https://skindinavia.wpenginepowered.com/wp-content/uploads/2022/10/skindinavia_306708562_625611635878669_1448671653329314283_n.jpg",
  "https://skindinavia.wpenginepowered.com/wp-content/uploads/2022/10/skindinavia_298772197_180775021098109_8376872377899932744_n.jpg",
  "https://skindinavia.wpenginepowered.com/wp-content/uploads/2022/10/skindinavia_291508262_170947788739315_3938528357252074175_n.jpg",
];

export const brandLogo = "https://skindinavia.wpenginepowered.com/wp-content/uploads/2021/06/SKIN_LG_BK_R.png";
```

- [ ] **Step 5: Verify build**

```bash
cd /Users/samotto/skindinavia && npx next build 2>&1 | tail -5
```

- [ ] **Step 6: Commit**

```bash
cd /Users/samotto/skindinavia && git add src/lib/mock-data.ts && git commit -m "feat: add real product image URLs and press logo images to mock data"
```

---

### Task 3: Create Reusable Animation Hooks

**Files:**
- Create: `src/hooks/use-magnetic-hover.ts`
- Create: `src/hooks/use-3d-tilt.ts`

- [ ] **Step 1: Create useMagneticHover hook**

Create `src/hooks/use-magnetic-hover.ts`:

```ts
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type MagneticOptions = {
  radius?: number;
  strength?: number;
};

export function useMagneticHover<T extends HTMLElement>(
  options: MagneticOptions = {}
) {
  const ref = useRef<T>(null);
  const { radius = 50, strength = 0.3 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Only enable on devices with fine pointer (desktop)
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

    function handleMouseMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const dist = Math.sqrt(distX * distX + distY * distY);

      if (dist < radius) {
        xTo(distX * strength);
        yTo(distY * strength);
      }
    }

    function handleMouseLeave() {
      xTo(0);
      yTo(0);
    }

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [radius, strength]);

  return ref;
}
```

- [ ] **Step 2: Create use3DTilt hook**

Create `src/hooks/use-3d-tilt.ts`:

```ts
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type TiltOptions = {
  maxRotation?: number;
  perspective?: number;
  scale?: number;
};

export function use3DTilt<T extends HTMLElement>(options: TiltOptions = {}) {
  const ref = useRef<T>(null);
  const { maxRotation = 8, perspective = 800, scale = 1.02 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!window.matchMedia("(pointer: fine)").matches) return;

    const rotateXTo = gsap.quickTo(el, "rotateX", {
      duration: 0.4,
      ease: "power2.out",
    });
    const rotateYTo = gsap.quickTo(el, "rotateY", {
      duration: 0.4,
      ease: "power2.out",
    });

    gsap.set(el, { transformPerspective: perspective });

    function handleMouseMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      rotateYTo((x - 0.5) * maxRotation * 2);
      rotateXTo((0.5 - y) * maxRotation * 2);
    }

    function handleMouseEnter() {
      gsap.to(el, { scale, duration: 0.3, ease: "power2.out" });
    }

    function handleMouseLeave() {
      rotateXTo(0);
      rotateYTo(0);
      gsap.to(el, { scale: 1, duration: 0.4, ease: "power2.out" });
    }

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [maxRotation, perspective, scale]);

  return ref;
}
```

- [ ] **Step 3: Verify build**

```bash
cd /Users/samotto/skindinavia && npx next build 2>&1 | tail -5
```

- [ ] **Step 4: Commit**

```bash
cd /Users/samotto/skindinavia && git add src/hooks/ && git commit -m "feat: add useMagneticHover and use3DTilt animation hooks"
```

---

### Task 4: Create Reusable Animation Components

**Files:**
- Create: `src/components/animation/MorphingBlob.tsx`
- Create: `src/components/animation/SpringEntrance.tsx`
- Create: `src/components/animation/ElasticCard.tsx`
- Create: `src/components/animation/PageTransition.tsx`

- [ ] **Step 1: Create MorphingBlob component**

Create `src/components/animation/MorphingBlob.tsx`:

```tsx
"use client";

export function MorphingBlob({
  color = "rgba(236,72,153,0.12)",
  size = 400,
  className = "",
}: {
  color?: string;
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(ellipse at center, ${color} 0%, transparent 70%)`,
        borderRadius: "60% 40% 50% 50% / 50% 60% 40% 50%",
        animation: "morphBlob 10s ease-in-out infinite",
      }}
    >
      <style jsx>{`
        @keyframes morphBlob {
          0%,
          100% {
            border-radius: 60% 40% 50% 50% / 50% 60% 40% 50%;
            transform: rotate(0deg) scale(1);
          }
          25% {
            border-radius: 40% 60% 50% 50% / 60% 40% 50% 50%;
            transform: rotate(5deg) scale(1.05);
          }
          50% {
            border-radius: 50% 50% 40% 60% / 40% 50% 60% 50%;
            transform: rotate(-3deg) scale(0.97);
          }
          75% {
            border-radius: 45% 55% 60% 40% / 55% 45% 45% 55%;
            transform: rotate(4deg) scale(1.03);
          }
        }
      `}</style>
    </div>
  );
}
```

- [ ] **Step 2: Create SpringEntrance component**

Create `src/components/animation/SpringEntrance.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right";

const directionOffsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 40 },
  down: { x: 0, y: -40 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
};

export function SpringEntrance({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
  className?: string;
}) {
  const offset = directionOffsets[direction];

  return (
    <motion.div
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 15,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 3: Create ElasticCard component**

Create `src/components/animation/ElasticCard.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function ElasticCard({
  children,
  className = "",
  scale = 1.03,
}: {
  children: ReactNode;
  className?: string;
  scale?: number;
}) {
  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 4: Create PageTransition component**

Create `src/components/animation/PageTransition.tsx`:

```tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ type: "spring", stiffness: 200, damping: 25, duration: 0.25 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

- [ ] **Step 5: Verify build**

```bash
cd /Users/samotto/skindinavia && npx next build 2>&1 | tail -5
```

- [ ] **Step 6: Commit**

```bash
cd /Users/samotto/skindinavia && git add src/components/animation/ && git commit -m "feat: add MorphingBlob, SpringEntrance, ElasticCard, PageTransition components"
```

---

### Task 5: Wire PageTransition into Root Layout

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Add PageTransition wrapper around main children**

In `src/app/layout.tsx`, add the import at the top with other imports:

```ts
import { PageTransition } from "@/components/animation/PageTransition";
```

Then wrap the `{children}` in the `<main>` tag:

Change:
```tsx
<main className="flex-1">{children}</main>
```
To:
```tsx
<main className="flex-1">
  <PageTransition>{children}</PageTransition>
</main>
```

- [ ] **Step 2: Verify build**

```bash
cd /Users/samotto/skindinavia && npx next build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**

```bash
cd /Users/samotto/skindinavia && git add src/app/layout.tsx && git commit -m "feat: add page transitions to root layout"
```

---

### Task 6: Rewrite Homepage Hero with Real Images + Animations

**Files:**
- Modify: `src/components/home/Hero.tsx` (full rewrite)

- [ ] **Step 1: Rewrite Hero.tsx**

Replace the entire file `src/components/home/Hero.tsx` with:

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
import { SpringEntrance } from "@/components/animation/SpringEntrance";

const heroProducts = [
  products.find((p) => p.id === "2")!, // Bridal (bestseller)
  products.find((p) => p.id === "3")!, // Oil Control
  products.find((p) => p.id === "1")!, // Original
];

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tiltRef = use3DTilt<HTMLDivElement>({ maxRotation: 8, scale: 1.02 });
  const ctaRef = useMagneticHover<HTMLDivElement>({ radius: 60, strength: 0.25 });
  const activeProduct = heroProducts[activeIndex];

  // Auto-rotate products every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % heroProducts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-b from-[#faf5f0] to-white">
      <div className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Text content */}
          <div className="max-w-xl">
            <SpringEntrance delay={0}>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Patented. Trusted. Since 2005.
              </p>
            </SpringEntrance>

            <SpringEntrance delay={0.1}>
              <h1 className="text-balance text-4xl font-light leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                When You Need to Pull an{" "}
                <span className="font-semibold">ALL NIGHTER</span> —{" "}
                <span className="italic">Skindinavia Will Be There</span>
              </h1>
            </SpringEntrance>

            <SpringEntrance delay={0.2}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
                The World&apos;s #1 Makeup Setting Spray Formula. Locks in your look for 16+ hours with patented cooling technology.
              </p>
            </SpringEntrance>

            <SpringEntrance delay={0.4}>
              <div ref={ctaRef} className="mt-10 flex flex-wrap gap-4">
                <Button size="lg" className="h-12 px-8 text-sm tracking-wide" render={<Link href="/shop" />}>
                  Shop Bestsellers
                </Button>
                <Button variant="outline" size="lg" className="h-12 px-8 text-sm tracking-wide" render={<Link href="/about-us" />}>
                  Our Story
                </Button>
              </div>
            </SpringEntrance>
          </div>

          {/* Product spotlight */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Morphing blob behind product */}
              <MorphingBlob
                color={`${activeProduct.accentColor}15`}
                size={450}
                className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              />

              {/* Product image with 3D tilt */}
              <div ref={tiltRef} className="relative z-10 h-[480px] w-[300px] sm:h-[540px] sm:w-[340px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProduct.id}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ type: "spring", stiffness: 150, damping: 20 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Image
                      src={activeProduct.image}
                      alt={activeProduct.name}
                      width={340}
                      height={480}
                      className="h-auto max-h-[480px] w-auto object-contain drop-shadow-2xl"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Product indicator dots */}
              <div className="mt-6 flex justify-center gap-2">
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
    </section>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
cd /Users/samotto/skindinavia && npx next build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**

```bash
cd /Users/samotto/skindinavia && git add src/components/home/Hero.tsx && git commit -m "feat: rewrite hero with real product images, 3D tilt, morphing blob, spring entrances"
```

---

### Task 7: Update FeaturedProducts + ProductCard with Real Images + Elastic Hover

**Files:**
- Modify: `src/components/product/ProductCard.tsx` (full rewrite)
- Modify: `src/components/home/FeaturedProducts.tsx` (update to use real images)

- [ ] **Step 1: Rewrite ProductCard.tsx with real images and ElasticCard**

Replace the entire file `src/components/product/ProductCard.tsx` with:

```tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { ElasticCard } from "@/components/animation/ElasticCard";
import { use3DTilt } from "@/hooks/use-3d-tilt";

export function ProductCard({ product }: { product: Product }) {
  const tiltRef = use3DTilt<HTMLDivElement>({ maxRotation: 5, scale: 1 });

  return (
    <ElasticCard>
      <Link href={`/products/${product.slug}`} className="group block">
        <div className="overflow-hidden rounded-2xl border border-border/50 bg-card">
          {/* Product image */}
          <div
            ref={tiltRef}
            className="relative flex h-80 items-center justify-center overflow-hidden"
            style={{
              background: `linear-gradient(165deg, ${product.accentColor}06 0%, ${product.accentColor}12 50%, ${product.accentColor}06 100%)`,
            }}
          >
            <Image
              src={product.image}
              alt={product.name}
              width={280}
              height={280}
              className="h-auto max-h-[260px] w-auto object-contain transition-transform duration-500 group-hover:scale-105"
            />
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
    </ElasticCard>
  );
}
```

- [ ] **Step 2: Update FeaturedProducts.tsx — fix link path and add staggered entrance**

Replace the entire file `src/components/home/FeaturedProducts.tsx` with:

```tsx
"use client";

import { products } from "@/lib/mock-data";
import { ProductCard } from "@/components/product/ProductCard";
import { SpringEntrance } from "@/components/animation/SpringEntrance";

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
          {featured.map((product, i) => (
            <SpringEntrance key={product.id} delay={i * 0.1}>
              <ProductCard product={product} />
            </SpringEntrance>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
cd /Users/samotto/skindinavia && npx next build 2>&1 | tail -5
```

- [ ] **Step 4: Commit**

```bash
cd /Users/samotto/skindinavia && git add src/components/product/ProductCard.tsx src/components/home/FeaturedProducts.tsx && git commit -m "feat: add real product images and elastic hover to product cards"
```

---

### Task 8: Update PressLogos with Real Logo Images + Infinite Scroll

**Files:**
- Modify: `src/components/home/PressLogos.tsx` (full rewrite)

- [ ] **Step 1: Rewrite PressLogos.tsx**

Replace the entire file `src/components/home/PressLogos.tsx` with:

```tsx
"use client";

import Image from "next/image";
import { pressLogos, pressLogoImages } from "@/lib/mock-data";

// Double the array for seamless infinite scroll
const scrollLogos = [...pressLogos, ...pressLogos];

export function PressLogos() {
  return (
    <section className="border-y border-border/50 py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-10">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Recognized Globally — You Might Have Read About Us Somewhere
        </p>
      </div>

      {/* Infinite scrolling marquee */}
      <div className="relative group">
        <div className="flex animate-marquee items-center gap-16 group-hover:[animation-play-state:paused]">
          {scrollLogos.map((name, i) => {
            const logoUrl = pressLogoImages[name];
            if (!logoUrl) return null;
            return (
              <div
                key={`${name}-${i}`}
                className="shrink-0 opacity-40 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
              >
                <Image
                  src={logoUrl}
                  alt={name}
                  width={120}
                  height={40}
                  className="h-8 w-auto object-contain"
                  unoptimized
                />
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
          width: max-content;
        }
      `}</style>
    </section>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
cd /Users/samotto/skindinavia && npx next build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**

```bash
cd /Users/samotto/skindinavia && git add src/components/home/PressLogos.tsx && git commit -m "feat: replace text press logos with real logo images in infinite scroll marquee"
```

---

### Task 9: Update ReviewsCarousel with Framer Motion Transitions

**Files:**
- Modify: `src/components/home/ReviewsCarousel.tsx`

- [ ] **Step 1: Add Framer Motion transitions to review cards**

In `src/components/home/ReviewsCarousel.tsx`, add the import at the top:

```ts
import { motion, AnimatePresence } from "framer-motion";
```

Then replace the review cards grid (the `<div className="grid gap-6 md:grid-cols-3">` block, lines 51-101) with:

```tsx
          <div className="grid gap-6 md:grid-cols-3">
            <AnimatePresence mode="wait">
              {visibleReviews.map((review, i) => (
                <motion.div
                  key={`${review.id}-${currentIndex}-${i}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 25,
                    delay: i * 0.05,
                  }}
                  className={`rounded-2xl border border-border/50 bg-card p-8 ${
                    i > 0 ? "hidden md:block" : ""
                  }`}
                >
                  {/* Stars */}
                  <div className="flex gap-0.5 text-amber-400">
                    {Array.from({ length: 5 }, (_, s) => (
                      <span key={s} className="text-lg">
                        {s < review.rating ? "\u2605" : "\u2606"}
                      </span>
                    ))}
                  </div>
                  <h4 className="mt-4 font-medium tracking-tight">
                    {review.title}
                  </h4>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-4">
                    &ldquo;{review.body}&rdquo;
                  </p>
                  <div className="mt-6 flex items-center gap-2">
                    <span className="text-sm font-medium">{review.author}</span>
                    {review.verified && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="shrink-0">
                          <path d="M8.5 3L4.25 7.25 2 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Verified
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
```

- [ ] **Step 2: Verify build**

```bash
cd /Users/samotto/skindinavia && npx next build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**

```bash
cd /Users/samotto/skindinavia && git add src/components/home/ReviewsCarousel.tsx && git commit -m "feat: add spring transitions to reviews carousel"
```

---

### Task 10: Update Newsletter with Elastic Focus Animation

**Files:**
- Modify: `src/components/home/Newsletter.tsx`

- [ ] **Step 1: Add Framer Motion to the Newsletter form**

In `src/components/home/Newsletter.tsx`, add the import:

```ts
import { motion } from "framer-motion";
```

Add the magnetic hover hook import:

```ts
import { useMagneticHover } from "@/hooks/use-magnetic-hover";
```

Inside the `Newsletter` component, add:

```ts
const btnRef = useMagneticHover<HTMLDivElement>({ radius: 40, strength: 0.2 });
```

Wrap the submit Button in the form with:

```tsx
<div ref={btnRef}>
  <Button type="submit" size="lg" className="h-11 rounded-xl px-8 text-sm tracking-wide">
    Subscribe
  </Button>
</div>
```

And wrap the success confirmation in a motion.div:

Change the success `<div>` to:

```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ type: "spring", stiffness: 200, damping: 20 }}
  className="mt-10 rounded-2xl border border-border/50 bg-card px-8 py-6"
>
```

- [ ] **Step 2: Verify build**

```bash
cd /Users/samotto/skindinavia && npx next build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**

```bash
cd /Users/samotto/skindinavia && git add src/components/home/Newsletter.tsx && git commit -m "feat: add magnetic hover and spring animation to newsletter section"
```

---

### Task 11: Rewrite Product Detail Page with Real Images + Animations

**Files:**
- Modify: `src/app/products/[slug]/product-detail.tsx` (full rewrite)

- [ ] **Step 1: Rewrite product-detail.tsx**

Replace the entire file `src/app/products/[slug]/product-detail.tsx` with a version that:
- Uses `next/image` with `product.image` for the main gallery image
- Applies `use3DTilt` on the main product image container
- Uses `useMagneticHover` on the "Add to Cart" button
- Wraps size selector buttons with Framer Motion `layoutId` for the active indicator
- Uses `motion.div` with spring animation for Add to Cart button press feedback (whileTap scale)
- Uses Framer Motion `AnimatePresence` for tab content switching
- Uses `ElasticCard` wrapper on related product cards at the bottom
- Keeps all existing functionality (size selection, quantity, add to cart, tabs, reviews)

The key changes from the current file:
1. Add imports: `Image` from next/image, `motion`/`AnimatePresence` from framer-motion, `use3DTilt`, `useMagneticHover`, `ElasticCard`
2. Replace the gradient placeholder image with `<Image src={product.image} .../>` inside a `ref={tiltRef}` container
3. Replace thumbnail gradient placeholders with the same product image at different angles (or just reuse the image 3 times for now since we only have 1 image per product)
4. Add `whileTap={{ scale: 0.97 }}` to the Add to Cart button via `motion.button` or wrapping in `motion.div`
5. Wrap the magnetic ref around the Add to Cart button area

Write the complete file — it's the most important page. Keep all existing functionality intact (breadcrumb, size selector, quantity, tabs, reviews, related products). Only replace placeholder visuals with real images and add animation hooks.

- [ ] **Step 2: Verify build**

```bash
cd /Users/samotto/skindinavia && npx next build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**

```bash
cd /Users/samotto/skindinavia && git add src/app/products/[slug]/product-detail.tsx && git commit -m "feat: rewrite product detail with real images, 3D tilt, magnetic hover, spring animations"
```

---

### Task 12: Update Shop Page with Staggered Product Grid

**Files:**
- Modify: `src/app/shop/page.tsx`

- [ ] **Step 1: Make shop page a client component and add staggered entrance**

The shop page needs to become a client component to use Framer Motion. Replace the entire `src/app/shop/page.tsx` file.

Key changes:
1. Add `"use client";` directive at top
2. Remove the `export const metadata` (move to a `generateMetadata` export or just remove — metadata in client components isn't supported, but for a demo this is fine)
3. Import `motion` from framer-motion
4. Wrap each product grid in a `motion.div` with staggered children entrance
5. The `ProductCard` already has `ElasticCard` from Task 7, so the grid just needs staggered entrance

Add this wrapping pattern around each category's product grid:

```tsx
<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  }}
  className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
>
  {catProducts.map((product) => (
    <motion.div
      key={product.id}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { type: "spring", stiffness: 200, damping: 25 },
        },
      }}
    >
      <ProductCard product={product} />
    </motion.div>
  ))}
</motion.div>
```

- [ ] **Step 2: Verify build**

```bash
cd /Users/samotto/skindinavia && npx next build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**

```bash
cd /Users/samotto/skindinavia && git add src/app/shop/page.tsx && git commit -m "feat: add staggered spring entrance to shop product grid"
```

---

### Task 13: Final Build Verification + Deploy

**Files:** None (verification only)

- [ ] **Step 1: Full build check**

```bash
cd /Users/samotto/skindinavia && npx next build 2>&1 | tail -20
```

All 43 routes should generate without errors.

- [ ] **Step 2: Start dev server and visual smoke test**

```bash
cd /Users/samotto/skindinavia && npx next dev --port 3001
```

Open http://localhost:3001 and verify:
- Homepage: Hero shows real Bridal product photo with 3D tilt, morphing blob, product rotation, spring entrance on text/CTAs
- Homepage: Featured products show real images with elastic hover
- Homepage: Press logos show real publication logo images scrolling
- Homepage: Reviews carousel has spring transitions
- Shop: Product grid has staggered entrance with real images
- Product detail: Real product image with 3D tilt, magnetic Add to Cart button
- Page transitions: Smooth spring fade between pages

- [ ] **Step 3: Push and deploy**

```bash
cd /Users/samotto/skindinavia && git push
```

Vercel will auto-deploy from the GitHub push since the repo is connected.
