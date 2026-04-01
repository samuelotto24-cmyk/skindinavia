import Link from "next/link";
import { caseStudies } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Case Studies — Skindinavia",
  description:
    "Real-world results from professionals who rely on Skindinavia in the most demanding conditions.",
};

export default function CaseStudiesPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 lg:py-24">
      <div className="text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Results
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight lg:text-5xl">
          Case Studies
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Real-world results from professionals who rely on Skindinavia in the
          most demanding conditions.
        </p>
      </div>

      <div className="mt-14 grid gap-8 sm:grid-cols-2">
        {caseStudies.map((study) => (
          <div
            key={study.id}
            className="group flex flex-col rounded-2xl border border-border bg-background p-8 transition-shadow hover:shadow-lg"
          >
            <Badge variant="secondary" className="w-fit">
              {study.category}
            </Badge>
            <h2 className="mt-4 text-xl font-semibold">{study.title}</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
              {study.excerpt}
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-6 w-fit"
              render={<Link href={`/case-studies/${study.slug}`} />}
            >
              Read Case Study
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
