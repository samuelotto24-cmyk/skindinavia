import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

const bodyContent: Record<string, string[]> = {
  "makeup-under-masks": [
    "When face masks became a daily reality for healthcare workers and performers, makeup longevity was put to the ultimate test. Traditional setting sprays couldn't withstand the constant friction, moisture, and heat trapped beneath PPE and cloth masks.",
    "Skindinavia's patented cooling technology proved uniquely suited to this challenge. By lowering the temperature of makeup and fusing it directly to skin, the formula created a bond that resisted the mechanical abrasion of mask wear far better than conventional alternatives.",
    "We partnered with three hospital systems and two theatre companies to test our formulas under real-world mask conditions. The results were striking: nurses reported 85% less makeup transfer onto N95 masks after a 12-hour shift, and performers maintained stage-quality looks through full masked performances.",
    "This case study reinforced what we've always believed — Skindinavia isn't just a beauty product. It's a confidence tool for professionals who need their appearance to hold up under pressure, no matter what the world throws at them.",
  ],
  "broadway-under-lights": [
    "Broadway stages present one of the most punishing environments for makeup. Performers endure intense overhead lighting that generates significant heat, physically demanding choreography, quick costume changes, and — in an eight-show week — almost no recovery time between performances.",
    "We spent six months embedded with makeup departments across three major Broadway productions to understand how Skindinavia performs under these extreme conditions. Lead MUA Marcus Allen explained that the cooling micro-fusion technology is critical: it bonds makeup to skin in a way that survives sweat, stage combat, and even tears during emotional scenes.",
    "The data spoke for itself. Productions using Skindinavia reported a 60% reduction in mid-show touch-ups and significant cost savings on product usage over a season. Performers noted that the lightweight, breathable formula didn't interfere with their comfort during physically demanding numbers.",
    "Today, Skindinavia is the official setting spray for over a dozen Broadway productions, and the brand has become a standard kit item for theatre MUAs across the country.",
  ],
  "destination-wedding-heat": [
    "Destination weddings in tropical climates are a dream for couples — and a nightmare for bridal makeup. Temperatures exceeding 100 degrees Fahrenheit, direct sun exposure, and high humidity can destroy even the most carefully applied look within hours.",
    "We followed five bridal MUAs across 20 destination weddings in Mexico, Thailand, Hawaii, and the Caribbean over a single wedding season. Each artist used the Skindinavia Bridal formula as the final step in their makeup application, and we documented results from ceremony through last dance — an average span of 10 hours.",
    "The results were remarkable. In 95% of cases, bridal makeup required zero touch-ups through the ceremony and first look photos. Even by the reception's end — after hours of dancing in tropical heat — 88% of brides showed minimal to no makeup degradation. Photographers consistently reported that late-evening portraits were nearly indistinguishable from morning shots.",
    "Celebrity bridal artist Kim Weber, who participated in the study, noted that the Bridal formula's 24-hour engineered wear time provides a margin of safety that gives both the artist and the bride confidence on the most photographed day of their lives.",
  ],
  "sfx-makeup-longevity": [
    "Special effects and prosthetic makeup for film and television represents the most demanding use case in the beauty industry. Silicone appliances, foam latex pieces, and multi-layered paint jobs must maintain continuity across 14+ hour shoot days — often in uncontrolled outdoor environments.",
    "We collaborated with SFX departments on three independent film productions to test Skindinavia's effectiveness on prosthetic and special effects work. Lead SFX artist Yuki Tanaka integrated our original formula into her standard application workflow, using it as a final seal over completed prosthetic blends and paint jobs.",
    "Over 45 shoot days, the production teams documented a 70% reduction in prosthetic edge lifting and a 50% decrease in the time spent on continuity touch-ups between takes. For the productions, this translated directly into faster shooting schedules and lower makeup department costs.",
    "Tanaka explained that Skindinavia's cooling technology is uniquely effective on prosthetics because it lowers the surface temperature of the appliance, reducing the expansion and contraction caused by body heat that typically causes edges to lift and paint to crack over long wear periods.",
  ],
};

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);

  if (!study) notFound();

  const paragraphs = bodyContent[study.slug] ?? [];

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
      <Button
        variant="ghost"
        size="sm"
        className="mb-8"
        render={<Link href="/case-studies" />}
      >
        &larr; Back to Case Studies
      </Button>

      <Badge variant="secondary">{study.category}</Badge>
      <h1 className="mt-4 font-serif text-3xl tracking-tight lg:text-4xl">
        {study.title}
      </h1>
      <p className="mt-3 text-lg text-muted-foreground">{study.excerpt}</p>

      <Separator className="my-10" />

      {/* Case study featured image */}
      <div className="relative mb-10 h-64 overflow-hidden rounded-2xl sm:h-80">
        <Image
          src={study.image}
          alt={study.title}
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      <div className="space-y-6 text-[15px] leading-relaxed text-muted-foreground">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </div>
  );
}
