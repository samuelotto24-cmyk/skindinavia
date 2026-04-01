# Skindinavia — Animations & Real Product Images Design Spec

## Overview

Upgrade the Skindinavia website from static placeholder mockup to a polished, animation-rich demo with real product photography. The goal is to showcase Sam's visual/animation craft while remaining appropriate for the target audience (30+ women, beauty enthusiasts, moms).

**Guiding principle:** Every animation should feel luxurious and tactile — enhancing the shopping experience, never distracting from it. Think Drunk Elephant / Tatcha level polish, not agency portfolio theatrics.

## Animation Stack

- **GSAP (v3)** — Timeline-based entrance sequences, magnetic cursor, morphing SVG blobs, 3D transforms
- **Framer Motion** — Spring physics for component transitions, page transitions (AnimatePresence), layout animations, elastic hover effects

Both libraries installed as dependencies. GSAP used via `useGSAP` hook (from `@gsap/react`). Framer Motion used declaratively on components.

## Focus Pages

Only three pages get the full animation treatment:

1. **Homepage** — Hero, featured products, press logos, reviews
2. **Product Detail** (`/products/[slug]`) — Product showcase, add-to-cart interaction
3. **Shop** (`/shop` and `/shop/[category]`) — Product grid with interactive cards

All other pages remain clean with no added animation beyond standard CSS transitions already in place.

## Real Product Images

Replace all CSS gradient placeholders with actual product photography from skindinavia.com. Images are served from their WordPress CDN (`skindinavia.wpenginepowered.com`).

### Product Image Map

| Product | Image URL |
|---------|-----------|
| Finishing Spray (Original) | `wp-content/uploads/2014/03/MFS-4oz__93457.1681396511.570.570.png` |
| Finishing Spray — Bridal | `wp-content/uploads/2014/11/MFSBridal-4oz__49822.1681396994.570.570.png` |
| Finishing Spray — Oil Control | `wp-content/uploads/2014/03/MFSOil-4oz__12722.1681400833.570.570.png` |
| Primer Spray | `wp-content/uploads/2014/03/Primer-4oz__94106.1681398713.570.570.png` |
| Primer Spray — Oil Control | `wp-content/uploads/2014/03/PrepSetKitOil-4oz__71375.1681400000.570.570.png` |
| Prep and Set Kit | `wp-content/uploads/2014/03/Prep_Set_4oz_front__45711.1623870869.570.570.jpg` |
| Prep, Set and Remove | `wp-content/uploads/2017/01/kit__66659.1706023513.570.570.png` |
| Makeup Remover Spray | `wp-content/uploads/2019/09/Remover_4oz_front__97154.1613750224.570.570.jpg` |
| Hero bottles group | `wp-content/uploads/2025/07/bottles-image-home.png` |
| All bottles square | `wp-content/uploads/2025/07/bottles-image.png` |

Base URL: `https://skindinavia.wpenginepowered.com/`

### Lifestyle / Editorial Images

| Image | URL |
|-------|-----|
| Bridal lifestyle | `wp-content/uploads/2025/04/brides2.png` |
| Bridal product shot | `wp-content/uploads/2025/04/brides.png` |
| Fashionista hero | `wp-content/uploads/2024/12/fashionista-hero-scaled-1-scaled.jpg` |
| Artist spotlight | `wp-content/uploads/2022/08/Untitled-design.png` |
| Makeup under masks | `wp-content/uploads/2021/10/shutterstock_1756040273-scaled.jpg` |
| SFX case study | `wp-content/uploads/2021/09/shutterstock_223600444-scaled.jpg` |
| Elite Daily feature | `wp-content/uploads/2022/02/Elite-Daily-Feature-Skindinavia.png` |

### Press Logo Images

All at base `https://skindinavia.wpenginepowered.com/wp-content/uploads/`:

- Vogue: `2021/09/vogue-logo-300x89.png`
- Allure: `2021/09/allure-magazine-logo-300x87.png`
- Byrdie: `2021/12/BYRDIE-300x59.png`
- PopSugar: `2022/04/popsugar-logo-300x53.jpg`
- Essence: `2021/10/essence-logo.png`
- Shape: `2021/09/shape-magazine-logo.png`
- Nylon: `2021/09/nylon-logo-300x51.png`
- Brides: `2021/10/brides-mag-logo.png`
- Glamour: `2021/10/glamour-logo.png`
- Marie Claire: `2021/10/marie-glaire-logo.png`
- New Beauty: `2021/10/new-beauty-magazine.png`
- US Weekly: `2021/10/us-weekly-logo.png`
- Self: `2021/10/self-magazine-logo.png`
- HuffPost: `2021/09/huff-post-logo-300x116.png`
- Refinery29: `2021/09/refinery29-logo-png-1-300x211-1.png`
- Teen Vogue: `2021/10/teen-vogue-logo.png`
- Martha Stewart: `2021/09/martha-stewart-living-logo.jpg`
- People: `2021/10/people-magazine-logo.png`
- InTouch: `2021/10/intouche-magazine-logo.png`

### Brand Logo

- Header logo: `wp-content/uploads/2021/06/SKIN_LG_BK_R.png`
- Dark bg logo: `wp-content/uploads/2021/07/Skindinavia-Logo-Black-Background-2.png`

### Instagram Content

- `wp-content/uploads/2022/10/skindinavia_301654740_843255973747273_6612108819761506876_n.jpg`
- `wp-content/uploads/2022/10/skindinavia_306708562_625611635878669_1448671653329314283_n.jpg`
- `wp-content/uploads/2022/10/skindinavia_298772197_180775021098109_8376872377899932744_n.jpg`
- `wp-content/uploads/2022/10/skindinavia_291508262_170947788739315_3938528357252074175_n.jpg`

## Implementation: next/image Configuration

Add `skindinavia.wpenginepowered.com` and `skindinavia.com` to `next.config.ts` remote image patterns. Use `next/image` for all product and editorial photos for optimization. Press logos can use `<img>` since they're small PNGs.

## Homepage Animations

### Hero (Split Layout — Option B)

**Layout:** Two-column split. Left: headline + CTAs. Right: single product spotlight.

**Left column:**
- Headline enters with Framer Motion spring from below (`y: 40 → 0`, spring stiffness ~120, damping ~15)
- "Patented. Trusted. Since 2005." tagline enters 200ms after headline
- CTA buttons enter 400ms after headline with slight scale spring (`scale: 0.9 → 1`)

**Right column:**
- Hero product (Bridal — bestseller) enters from right with spring physics
- **3D tilt effect:** Product image follows cursor with `perspective(800px) rotateX/rotateY` — max 8° rotation. Implemented via GSAP `quickTo` for smooth interpolation
- **Morphing blob:** SVG blob behind product with GSAP morphSVG-style animation (or CSS `border-radius` animation on a large div with gradient). Slow, organic, 8-10 second loop
- **Glow shadow:** Box-shadow shifts position based on cursor, matching the tilt direction
- **Product rotation:** Every 5 seconds, product cross-fades to next featured product (Bridal → Oil Control → Original → repeat). Framer Motion AnimatePresence for the swap

**Background:** Subtle warm gradient (`#faf5f0` to white), no hard color blocks.

### Featured Products Section

- Product cards enter with Framer Motion staggered spring (`staggerChildren: 0.1`)
- Each card has **elastic hover**: `scale: 1.03` with spring physics on hover, `scale: 0.98` on press
- Product image within card has **3D tilt** on hover (same cursor-following technique as hero, but subtler — max 5°)
- "Shop Now" link has **magnetic effect**: link text shifts toward cursor when cursor is within 60px radius

### Press Logos Section

- Logos use a smooth infinite horizontal scroll animation (CSS `@keyframes` or GSAP horizontal tween)
- On hover over the row: scroll pauses
- Individual logos have subtle opacity shift on hover (`0.5 → 1`)

### Reviews Carousel

- Review cards transition with Framer Motion `AnimatePresence` — outgoing card slides left with opacity fade, incoming slides from right
- Spring physics on the transition (not linear easing)

### Newsletter Section

- Input field has a subtle **elastic focus** animation — border expands with spring physics on focus
- Submit button has **magnetic hover** effect

## Product Detail Page Animations

### Product Gallery

- Main product image has **3D tilt** following cursor (same as hero, max 8°)
- Shadow beneath product shifts with tilt to maintain realism
- Thumbnail selection: clicked thumbnail springs to selected state (`scale: 1.05`, ring appears with spring), main image cross-fades with Framer Motion

### Size Selector

- Size buttons: selected state transitions with **spring scale** (`scale: 1.05`) and background color fill animation
- Unselected buttons spring back to default

### Add to Cart Button

- **Magnetic hover** effect — button shifts toward cursor within 40px radius
- On click: button does a quick **elastic squeeze** animation (`scaleX: 0.95, scaleY: 1.05` then springs back) as confirmation
- Success state: brief checkmark icon appears with spring scale-in, then fades

### Tabbed Content

- Tab underline indicator slides between tabs with spring physics (Framer Motion `layoutId`)
- Tab content cross-fades with `AnimatePresence`

### Related Products

- Same elastic hover cards as homepage featured products section

## Shop Page Animations

### Product Grid

- Cards enter with staggered spring animation on page load (`staggerChildren: 0.08`, spring from `y: 20, opacity: 0`)
- Each card has **elastic hover** (scale spring) + **3D tilt** on the product image
- Badge (e.g., "Bestseller") has a subtle pulse animation on entrance

### Category Navigation

- Active category indicator slides with spring physics between options (Framer Motion `layoutId`)

## Shared Animation Components

Create reusable animation components/hooks:

### `useMagneticHover(ref, options)`
- Hook that adds magnetic pull effect to any element
- Options: `radius` (default 50px), `strength` (default 0.3)
- Uses GSAP `quickTo` for smooth cursor tracking
- Returns: attach to any button or link

### `use3DTilt(ref, options)`
- Hook that adds perspective tilt following cursor
- Options: `maxRotation` (default 8°), `perspective` (default 800px), `scale` (default 1.02)
- Uses GSAP for interpolation
- Includes matching shadow shift

### `<MorphingBlob />`
- Component rendering an animated SVG/div blob
- Props: `color`, `size`, `speed` (default 10s loop)
- Pure CSS animation (border-radius morphing on a gradient div)

### `<SpringEntrance />`
- Framer Motion wrapper for entrance animations
- Props: `delay`, `direction` (up/down/left/right), `spring` config
- Uses `motion.div` with `initial`/`animate` and spring transition

### `<ElasticCard />`
- Wraps any card with elastic hover (scale spring) + optional 3D tilt on child image
- Props: `tilt` (boolean), `scale` (default 1.03)

### `<PageTransition />`
- Framer Motion `AnimatePresence` wrapper in the root layout
- Cross-fade with subtle slide on route changes
- Spring physics on the transition

## Dependencies to Add

```json
{
  "gsap": "^3.12",
  "@gsap/react": "^2.1",
  "framer-motion": "^11"
}
```

## next.config.ts Changes

```ts
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'skindinavia.wpenginepowered.com',
    },
    {
      protocol: 'https',
      hostname: 'skindinavia.com',
    },
  ],
}
```

## Mock Data Changes

Add image URLs to each product in `mock-data.ts`:

```ts
export type Product = {
  // ... existing fields
  image: string;        // primary product image URL
  images: string[];     // gallery images (primary + alternates)
  heroImage?: string;   // optional larger hero-quality image
};
```

## What NOT to Animate

- Text content on informational pages (About, FAQ, Blog, Terms, etc.)
- Footer
- Announcement bar (already has rotation)
- Form inputs beyond the newsletter elastic focus
- Mobile — all cursor-based effects (magnetic, 3D tilt) are desktop-only. Mobile gets spring entrances and elastic hovers via touch.
