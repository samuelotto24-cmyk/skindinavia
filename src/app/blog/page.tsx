import Link from "next/link";
import { blogPosts } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Blog — Skindinavia",
  description:
    "Tips, tutorials, and the science behind long-lasting makeup from the Skindinavia team and our artist community.",
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 lg:py-24">
      <div className="text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Journal
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight lg:text-5xl">
          The Skindinavia Blog
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Tips, tutorials, and the science behind long-lasting makeup.
        </p>
      </div>

      <div className="mt-14 grid gap-8 sm:grid-cols-2">
        {blogPosts.map((post) => (
          <article
            key={post.id}
            className="group flex flex-col rounded-2xl border border-border bg-background transition-shadow hover:shadow-lg"
          >
            {/* Thumbnail placeholder */}
            <div className="flex h-48 items-center justify-center rounded-t-2xl bg-neutral-100 text-sm font-medium text-neutral-400">
              Blog Thumbnail
            </div>
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center gap-3">
                <Badge variant="secondary">{post.category}</Badge>
                <time className="text-xs text-muted-foreground">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              </div>
              <h2 className="mt-3 text-lg font-semibold leading-snug">
                {post.title}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {post.excerpt}
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-5 w-fit"
                render={<Link href={`/blog/${post.slug}`} />}
              >
                Read More
              </Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
