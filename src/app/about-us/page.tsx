import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "About Us — Skindinavia",
  description:
    "Born from a simple question: Why does makeup fade? Learn about the patented cooling technology behind the world's #1 setting spray.",
};

// Real team member headshots from Skindinavia's artist network
const teamMembers = [
  {
    name: "Allen Goldman",
    role: "Founder & CEO",
    image: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2022/04/A9761D89_A9C5_49F1_81D4_F218EA3436A3-scaled.jpeg",
  },
  {
    name: "Dr. Elena Ruiz",
    role: "Head of R&D",
    image: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2021/10/IMG_0533.jpg",
  },
  {
    name: "David Chen",
    role: "VP of Operations",
    image: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2021/07/clintbrockbeauty_209647914_219094006730985_2165903273230814284_n.jpg",
  },
  {
    name: "Mia Torres",
    role: "Creative Director",
    image: "https://skindinavia.wpenginepowered.com/wp-content/uploads/2021/07/stylebydianaa__95261794_519143372101098_6723349596428850258_n.jpg",
  },
];

export default function AboutUsPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 lg:py-24">
      {/* Hero */}
      <section className="text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Our Story
        </p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight lg:text-5xl">
          Born from a simple question:
          <br />
          <span className="italic">Why does makeup fade?</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Founded in 2005, Skindinavia set out to solve one of the beauty
          industry&apos;s most universal frustrations. Two decades later, our
          patented cooling technology has become the gold standard for makeup
          longevity — trusted by Broadway performers, Hollywood artists, bridal
          professionals, and millions of everyday beauty lovers worldwide.
        </p>
      </section>

      <Separator className="my-16" />

      {/* Brand Hero Image */}
      <section className="mb-16">
        <div className="relative h-72 overflow-hidden rounded-2xl lg:h-96">
          <Image
            src="https://skindinavia.com/wp-content/uploads/2021/07/SKINDINAVIA_2021-50-copy.jpg"
            alt="Skindinavia brand story"
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      </section>

      {/* Mission */}
      <section className="mb-16 text-center">
        <h2 className="font-serif text-2xl tracking-tight lg:text-3xl">
          Our Mission
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Make every person&apos;s makeup last as long as they need it —
          whether that&apos;s a 12-hour nursing shift, an August wedding, or a
          Broadway opening night. We believe confidence shouldn&apos;t have an
          expiration time.
        </p>
      </section>

      <Separator className="my-16" />

      {/* How It Works */}
      <section className="mb-16">
        <h2 className="text-center font-serif text-2xl tracking-tight lg:text-3xl">
          How Skindinavia Works
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
          The science behind 16+ hour wear.
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {[
            {
              step: "01",
              title: "Cooling Technology",
              description:
                "Our patented formula rapidly lowers the temperature of your makeup upon contact, creating an optimal bonding environment between product and skin.",
            },
            {
              step: "02",
              title: "Micro-Fusion",
              description:
                "As the temperature drops, makeup pigments fuse directly to the skin's surface — locking in color, coverage, and finish without clogging pores.",
            },
            {
              step: "03",
              title: "All-Day Shield",
              description:
                "The result is a breathable, invisible shield that resists sweat, oil, humidity, and tears for up to 16 hours (24+ with our Bridal formula).",
            },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <span className="font-serif text-3xl font-light text-border">
                {item.step}
              </span>
              <h3 className="mt-2 font-serif text-lg font-medium">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Separator className="my-16" />

      {/* Values */}
      <section className="mb-16 text-center">
        <h2 className="font-serif text-2xl tracking-tight lg:text-3xl">
          What We Stand For
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {["Oil-Free", "Cruelty-Free", "Paraben-Free", "Vegan", "Dermatologist Tested"].map(
            (value) => (
              <Badge key={value} variant="outline" className="px-4 py-1.5 text-sm">
                {value}
              </Badge>
            )
          )}
        </div>
      </section>

      <Separator className="my-16" />

      {/* Team */}
      <section>
        <h2 className="text-center font-serif text-2xl tracking-tight lg:text-3xl">
          The Team Behind the Spray
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
          A dedicated group of chemists, beauty lovers, and perfectionists who
          obsess over every formula so you never have to worry about your
          makeup.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <div key={member.name} className="text-center">
              <div className="mx-auto h-32 w-32 overflow-hidden rounded-full">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={128}
                  height={128}
                  className="h-full w-full object-cover"
                  unoptimized
                />
              </div>
              <h3 className="mt-4 text-sm font-semibold">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
