import Link from "next/link";
import { artists } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Artist Spotlights — Skindinavia",
  description:
    "Meet the professional makeup artists who trust Skindinavia on set, on stage, and on the biggest days of their clients' lives.",
};

export default function ArtistSpotlightsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 lg:py-24">
      <div className="text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Community
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight lg:text-5xl">
          Artist Spotlights
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          The professionals who trust Skindinavia on set, on stage, and on the
          biggest days of their clients&apos; lives.
        </p>
      </div>

      <div className="mt-14 grid gap-8 sm:grid-cols-2">
        {artists.map((artist) => (
          <div
            key={artist.id}
            className="group overflow-hidden rounded-2xl border border-border bg-background transition-shadow hover:shadow-lg"
          >
            <div
              className="flex h-56 items-center justify-center text-sm font-medium text-white/70"
              style={{ backgroundColor: artist.accentColor }}
            >
              Artist Photo
            </div>
            <div className="p-6">
              <Badge variant="secondary">{artist.specialty}</Badge>
              <h2 className="mt-3 text-xl font-semibold">{artist.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {artist.title}
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                render={<Link href={`/artist-spotlights/${artist.slug}`} />}
              >
                View Profile
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
