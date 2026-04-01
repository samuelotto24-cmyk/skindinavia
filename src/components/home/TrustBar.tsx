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
