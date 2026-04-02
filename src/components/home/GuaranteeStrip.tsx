import { ShieldCheck, Truck, RotateCcw } from "lucide-react";

const guarantees = [
  { icon: ShieldCheck, label: "30-Day Money-Back Guarantee" },
  { icon: Truck, label: "Free Shipping Over $40" },
  { icon: RotateCcw, label: "Hassle-Free Returns" },
];

export function GuaranteeStrip() {
  return (
    <section className="border-y border-border/40 bg-card/50 py-5">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {guarantees.map((item) => (
            <div key={item.label} className="flex items-center gap-2.5">
              <item.icon className="h-4 w-4 text-emerald-500" strokeWidth={1.5} />
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
