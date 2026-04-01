import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-b from-white to-stone-50">
      <div className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Text content */}
          <div className="max-w-xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Patented Setting Technology
            </p>
            <h1 className="text-balance text-4xl font-light leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              When You Need to Pull an{" "}
              <span className="font-semibold">ALL NIGHTER</span> —{" "}
              <span className="italic">Skindinavia Will Be There</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
              Patented. Trusted. Since 2005. The World&apos;s #1 Makeup Setting
              Spray Formula.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button size="lg" className="h-12 px-8 text-sm tracking-wide" render={<Link href="/shop" />}>
                Shop Bestsellers
              </Button>
              <Button variant="outline" size="lg" className="h-12 px-8 text-sm tracking-wide" render={<Link href="/about-us" />}>
                Our Story
              </Button>
            </div>
          </div>

          {/* Product placeholder — spray bottle silhouette */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative h-[520px] w-[220px] sm:h-[580px] sm:w-[240px]">
              {/* Bottle body */}
              <div className="absolute bottom-0 left-1/2 h-[380px] w-[140px] -translate-x-1/2 rounded-[20px] bg-gradient-to-b from-stone-100 to-stone-200 shadow-[inset_0_2px_20px_rgba(0,0,0,0.04)]">
                {/* Label area */}
                <div className="absolute inset-x-4 top-16 bottom-16 rounded-xl bg-gradient-to-b from-stone-50/80 to-white/60 shadow-[inset_0_1px_8px_rgba(0,0,0,0.03)]" />
                {/* Brand text on label */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-stone-400">
                    Skindinavia
                  </p>
                  <p className="mt-1 text-[8px] uppercase tracking-[0.15em] text-stone-300">
                    Setting Spray
                  </p>
                </div>
              </div>
              {/* Bottle neck */}
              <div className="absolute bottom-[380px] left-1/2 h-[60px] w-[40px] -translate-x-1/2 rounded-t-lg bg-gradient-to-b from-stone-200 to-stone-150 bg-stone-200" />
              {/* Spray cap */}
              <div className="absolute bottom-[430px] left-1/2 h-[80px] w-[80px] -translate-x-1/2">
                {/* Cap base */}
                <div className="absolute bottom-0 left-1/2 h-[40px] w-[70px] -translate-x-1/2 rounded-t-xl bg-gradient-to-b from-stone-300 to-stone-200" />
                {/* Nozzle */}
                <div className="absolute bottom-[36px] left-1/2 h-[30px] w-[20px] -translate-x-1/2 rounded-t-lg bg-stone-300" />
                {/* Spray arm */}
                <div className="absolute bottom-[50px] left-1/2 h-[8px] w-[50px] -translate-x-1/4 rounded-full bg-stone-300" />
              </div>
              {/* Subtle glow behind bottle */}
              <div className="absolute inset-0 -z-10 scale-125 rounded-full bg-gradient-radial from-stone-100/80 to-transparent blur-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="pointer-events-none absolute -top-40 right-0 h-[600px] w-[600px] rounded-full bg-gradient-to-bl from-stone-100/50 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-stone-100/30 to-transparent blur-3xl" />
    </section>
  );
}
