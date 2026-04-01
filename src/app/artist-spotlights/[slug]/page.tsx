import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { artists } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function generateStaticParams() {
  return artists.map((artist) => ({ slug: artist.slug }));
}

export default async function ArtistDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const artist = artists.find((a) => a.slug === slug);

  if (!artist) notFound();

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 lg:py-24">
      <Button
        variant="ghost"
        size="sm"
        className="mb-8"
        render={<Link href="/artist-spotlights" />}
      >
        &larr; Back to All Artists
      </Button>

      <div className="grid gap-10 md:grid-cols-2">
        {/* Artist photo */}
        <div className="relative h-80 overflow-hidden rounded-2xl md:h-full md:min-h-[400px]">
          <Image
            src={artist.image}
            alt={artist.name}
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        {/* Info */}
        <div>
          <Badge variant="secondary">{artist.specialty}</Badge>
          <h1 className="mt-3 text-3xl font-bold tracking-tight lg:text-4xl">
            {artist.name}
          </h1>
          <p className="mt-1 text-lg text-muted-foreground">{artist.title}</p>

          <Separator className="my-6" />

          <p className="leading-relaxed text-muted-foreground">{artist.bio}</p>

          {/* Social Links */}
          {artist.socialLinks.length > 0 && (
            <div className="mt-8">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Follow {artist.name.split(" ")[0]}
              </h3>
              <div className="mt-3 flex gap-3">
                {artist.socialLinks.map((link) => (
                  <Button
                    key={link.platform}
                    variant="outline"
                    size="sm"
                    render={
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      />
                    }
                  >
                    {link.platform}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
