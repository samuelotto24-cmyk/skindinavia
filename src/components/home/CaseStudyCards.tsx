import Link from "next/link";
import { caseStudies } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";

export function CaseStudyCards() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-stone-50/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Proven Performance
          </p>
          <h2 className="mt-3 text-3xl font-light tracking-tight sm:text-4xl">
            Real Results, Real Stories
          </h2>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {caseStudies.map((study) => (
            <Link
              key={study.id}
              href={`/case-studies/${study.slug}`}
              className="group"
            >
              <div className="flex h-full flex-col rounded-2xl border border-border/50 bg-card p-8 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-stone-200/50">
                <Badge variant="secondary" className="mb-4 w-fit text-[10px] uppercase tracking-wider">
                  {study.category}
                </Badge>
                <h3 className="text-xl font-medium tracking-tight text-foreground">
                  {study.title}
                </h3>
                <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">
                  {study.excerpt}
                </p>
                <span className="mt-6 inline-flex text-sm font-medium text-foreground underline-offset-4 transition-all group-hover:underline">
                  Read More
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
