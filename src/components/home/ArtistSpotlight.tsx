import Link from "next/link";
import { artists } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";

const artist = artists[0];

export function ArtistSpotlight() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Pro Artists Trust Skindinavia
          </p>
          <h2 className="mt-3 text-3xl font-light tracking-tight sm:text-4xl">
            Artist Spotlight
          </h2>
        </div>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Artist photo placeholder */}
          <div
            className="relative aspect-[4/5] overflow-hidden rounded-2xl"
            style={{
              background: `linear-gradient(145deg, ${artist.accentColor}12 0%, ${artist.accentColor}22 40%, ${artist.accentColor}08 100%)`,
            }}
          >
            <div className="absolute inset-0 shadow-[inset_0_2px_30px_rgba(0,0,0,0.04)]" />
            {/* Decorative initials */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="text-8xl font-extralight tracking-wider opacity-[0.08]"
                style={{ color: artist.accentColor }}
              >
                {artist.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            {/* Bottom gradient for text legibility */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/5 to-transparent" />
          </div>

          {/* Artist info */}
          <div className="max-w-lg">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {artist.specialty}
            </p>
            <h3 className="mt-3 text-3xl font-light tracking-tight sm:text-4xl">
              {artist.name}
            </h3>
            <p className="mt-2 text-lg font-light text-muted-foreground">
              {artist.title}
            </p>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              {artist.bio}
            </p>
            <div className="mt-8">
              <Button variant="outline" size="lg" className="h-11 px-6 text-sm tracking-wide" render={<Link href={`/artist-spotlights/${artist.slug}`} />}>
                View Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
