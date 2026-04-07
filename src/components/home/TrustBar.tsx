import { Award, Star, Users, FlaskConical, Leaf, Heart } from "lucide-react";

const trustItems = [
  { icon: Star, label: "50,000+ Five-Star Reviews", color: "text-amber-500", bg: "bg-amber-50" },
  { icon: Users, label: "10,000+ Pro Artists", color: "text-blue-500", bg: "bg-blue-50" },
  { icon: FlaskConical, label: "Patented Technology", color: "text-sky-500", bg: "bg-sky-50" },
  { icon: Award, label: "Allure Best of Beauty", color: "text-pink-500", bg: "bg-pink-50" },
  { icon: Leaf, label: "Vegan & Cruelty-Free", color: "text-emerald-500", bg: "bg-emerald-50" },
  { icon: Heart, label: "Made in USA", color: "text-red-500", bg: "bg-red-50" },
];

export function TrustBar() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2.5 lg:gap-x-6">
          {trustItems.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div className={`flex h-6 w-6 items-center justify-center rounded-full ${item.bg}`}>
                <item.icon className={`h-3 w-3 ${item.color}`} strokeWidth={2} />
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-foreground/70">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
