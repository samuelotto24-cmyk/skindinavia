import Link from "next/link";
import { blogPosts } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";

const latestPosts = blogPosts.slice(0, 3);

export function BlogPreview() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Tips, Tutorials & Science
          </p>
          <h2 className="mt-3 text-3xl font-light tracking-tight sm:text-4xl">
            From the Blog
          </h2>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group"
            >
              <article className="flex h-full flex-col rounded-2xl border border-border/50 bg-card p-8 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-stone-200/50">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">
                    {post.category}
                  </Badge>
                  <time
                    dateTime={post.date}
                    className="text-xs text-muted-foreground"
                  >
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                </div>
                <h3 className="mt-4 text-lg font-medium leading-snug tracking-tight text-foreground">
                  {post.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                  {post.excerpt}
                </p>
                <span className="mt-6 inline-flex text-sm font-medium text-foreground underline-offset-4 transition-all group-hover:underline">
                  Read More
                </span>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
