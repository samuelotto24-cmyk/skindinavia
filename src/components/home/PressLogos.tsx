import { pressLogos } from "@/lib/mock-data";
import { Separator } from "@/components/ui/separator";

export function PressLogos() {
  return (
    <section className="border-y border-border/50 py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          As Featured In
        </p>

        {/* Desktop: wrapped grid */}
        <div className="mt-10 hidden flex-wrap items-center justify-center gap-x-2 gap-y-4 md:flex">
          {pressLogos.map((name, i) => (
            <div key={name} className="flex items-center gap-2">
              <span className="text-sm font-medium uppercase tracking-[0.15em] text-muted-foreground/70 transition-colors hover:text-foreground">
                {name}
              </span>
              {i < pressLogos.length - 1 && (
                <Separator orientation="vertical" className="!h-4" />
              )}
            </div>
          ))}
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="mt-10 flex gap-6 overflow-x-auto pb-2 scrollbar-none md:hidden">
          {pressLogos.map((name) => (
            <span
              key={name}
              className="shrink-0 text-sm font-medium uppercase tracking-[0.15em] text-muted-foreground/70"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
