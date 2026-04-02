import { Award, Star, Users, FlaskConical, Leaf, Heart } from "lucide-react";

const trustItems = [
  { icon: Star, label: "50,000+ Five-Star Reviews" },
  { icon: Users, label: "10,000+ Pro Artists" },
  { icon: FlaskConical, label: "Patented Technology" },
  { icon: Award, label: "Allure Best of Beauty" },
  { icon: Leaf, label: "Vegan & Cruelty-Free" },
  { icon: Heart, label: "Made in USA" },
];

export function TrustBar() {
  return (
    <section className="border-y border-border/50 bg-card/50">
      <div className="mx-auto max-w-7xl px-6 py-5 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {trustItems.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <item.icon className="h-3.5 w-3.5 text-brand-gold" strokeWidth={1.5} />
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
