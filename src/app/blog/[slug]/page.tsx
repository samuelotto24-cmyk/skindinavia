import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

const articleContent: Record<string, string[]> = {
  "how-setting-spray-actually-works": [
    "Most people think of setting spray as a simple finishing step — a quick mist and you're out the door. But the science behind why Skindinavia's formula works for 16+ hours while others fail after a few is rooted in real temperature physics, not marketing hype.",
    "When you apply Skindinavia, the patented cooling technology rapidly lowers the surface temperature of your makeup. This temperature drop triggers a micro-fusion process where pigment particles bond directly to the skin's surface at a molecular level. Think of it like tempering chocolate — the controlled cooling creates a structure that's far more stable than what you'd get at room temperature.",
    "Conventional setting sprays rely primarily on film-forming polymers that sit on top of your makeup like a layer of shrink wrap. This approach works initially, but as your skin produces oil and sweat throughout the day, that film breaks down and your makeup goes with it. Skindinavia's approach is fundamentally different because the makeup itself becomes the bond — there's no separate layer to degrade.",
    "The result is wear that survives sweat, humidity, tears, and even physical contact. It's why our formula has become the standard for professionals working in the most demanding environments — from Broadway stages to tropical wedding ceremonies to 14-hour film sets.",
    "Understanding this science also explains why application technique matters. Holding the bottle 10-12 inches away and misting in an X and T motion ensures even, consistent cooling across your entire face. Too close, and you get uneven saturation. Too far, and the cooling effect dissipates before reaching your makeup.",
  ],
  "bridal-makeup-timeline": [
    "Your wedding day is the single most photographed day of your life. Every moment — from getting ready shots to the last dance — will be captured and preserved forever. That's why a strategic makeup timeline isn't optional; it's essential for ensuring you look flawless from first look to final farewell.",
    "Start your makeup 90 minutes before your first photo opportunity. This gives your artist time to work without rushing and, critically, allows each layer to set properly before the next is applied. Skincare goes on first, followed by a 10-minute wait for full absorption. Then mist on the Skindinavia Primer Spray and wait 60 seconds before touching your skin with any product.",
    "Foundation, concealer, powder, eyes, brows, lips — your artist will layer these in their preferred order. The key is allowing the Primer Spray to create that smooth, bonded base layer first. Once the full look is complete, close your eyes and let your artist apply the Bridal Finishing Spray in the signature X and T motion. For maximum wedding-day wear, we recommend two light coats with 60 seconds of dry time between each.",
    "A common mistake is touching your face between Primer and Finishing Spray application. Let the products do their work. Once that final coat of Bridal Finishing Spray is dry, your makeup is locked in for up to 24 hours — through tears, hugs, summer heat, and hours of dancing.",
    "Pro tip from celebrity bridal MUA Kim Weber: do a full trial run at least three weeks before the wedding. Apply the complete look with the same timeline and products, then live your day normally. Take photos at the 4-hour, 8-hour, and 12-hour marks. This gives you and your artist real data on how the look holds up on your specific skin type.",
  ],
  "oily-skin-summer-guide": [
    "If you have oily skin, summer can feel like a losing battle. Higher temperatures trigger increased sebum production, humidity prevents that oil from evaporating, and your beautifully applied morning makeup slowly dissolves into a shiny, patchy mess by lunchtime. Sound familiar?",
    "The good news is that with the right prep-and-set strategy, oily skin can maintain a matte, fresh look even in peak summer conditions. It starts before you apply a single product. After cleansing, use a lightweight, oil-free moisturizer — skipping moisturizer actually signals your skin to produce more oil, making things worse. Then mist on Skindinavia's Oil Control Primer Spray and wait a full 60 seconds.",
    "When choosing your foundation, opt for oil-free, matte formulas and apply with a damp beauty sponge rather than a brush. The sponge presses product into skin rather than sitting it on top, which improves adhesion. Set your T-zone with a light dusting of translucent powder, but avoid over-powdering — too much powder can actually mix with oil throughout the day and create a cakey texture.",
    "The final and most important step is your setting spray. Skindinavia's Oil Control Finishing Spray is specifically formulated with oil-absorbing technology that continues working throughout the day. Unlike mattifying powders that stop working once they've absorbed their capacity, our spray formula creates an ongoing shield against excess sebum.",
    "For truly extreme conditions — outdoor weddings, music festivals, beach vacations — layer both the Oil Control Primer Spray and the Oil Control Finishing Spray for our most powerful matte system. And keep a travel-size Finishing Spray in your bag for a midday refresh mist if needed.",
  ],
  "setting-spray-mistakes": [
    "Setting spray seems simple — point, mist, done. But after two decades of watching people use our products (and hearing feedback from thousands of professional MUAs), we've identified five common mistakes that dramatically reduce effectiveness. Fix these and you'll notice an immediate difference in your makeup longevity.",
    "Mistake #1: Holding the bottle too close. This is by far the most common error. When you mist from just a few inches away, you're concentrating product in one area rather than distributing it evenly. This leads to uneven drying, visible wet spots, and can actually push your makeup around. The correct distance is 10-12 inches — roughly the length from your elbow to your wrist. Practice in a mirror until this distance feels natural.",
    "Mistake #2: Applying too much in a single coat. More is not better. One even, light mist is all you need for everyday wear. If you're going for maximum longevity (weddings, events, long workdays), apply two thin coats with a 60-second dry time between them rather than one heavy coat. Heavy application can oversaturate your makeup and cause it to slide.",
    "Mistake #3: Skipping the X and T motion. Random misting creates uneven coverage. The X and T technique ensures your entire face gets consistent coverage: mist in an X from forehead to opposite cheek, then in a T across the forehead and down the nose. This pattern has been tested and refined by professional MUAs for optimal distribution.",
    "Mistake #4: Touching your face before the spray dries. After misting, you need to wait 30-60 seconds for the cooling technology to complete its micro-fusion process. Touching, blotting, or fanning your face during this window disrupts the bond. Just be patient — it dries faster than you think. Mistake #5: Using setting spray as a substitute for good prep. Setting spray locks in your makeup, but it can't fix a foundation that's sliding off un-primed skin. For the best results, use a primer (we recommend our Primer Spray) as the first step after skincare, then finish with the setting spray after your full look is complete.",
  ],
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  const paragraphs = articleContent[post.slug] ?? [];

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
      <Button
        variant="ghost"
        size="sm"
        className="mb-8"
        render={<Link href="/blog" />}
      >
        &larr; Back to Blog
      </Button>

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

      <h1 className="mt-4 font-serif text-3xl tracking-tight lg:text-4xl">
        {post.title}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">By {post.author}</p>

      <Separator className="my-10" />

      {/* Featured image */}
      <div className="relative mb-10 h-64 overflow-hidden rounded-2xl sm:h-80">
        <Image
          src={post.image}
          alt={post.title}
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
