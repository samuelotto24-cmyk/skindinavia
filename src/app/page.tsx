import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { ShopByMoment } from "@/components/home/ShopByMoment";
import { PressLogos } from "@/components/home/PressLogos";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ArtistSpotlight } from "@/components/home/ArtistSpotlight";
import { FounderStory } from "@/components/home/FounderStory";
import { CaseStudyCards } from "@/components/home/CaseStudyCards";
import { ReviewsCarousel } from "@/components/home/ReviewsCarousel";
import { BlogPreview } from "@/components/home/BlogPreview";
import { Newsletter } from "@/components/home/Newsletter";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <TrustBar />
      <PressLogos />
      <ShopByMoment />
      <HowItWorks />
      <FounderStory />
      <ArtistSpotlight />
      <CaseStudyCards />
      <ReviewsCarousel />
      <BlogPreview />
      <Newsletter />
    </main>
  );
}
