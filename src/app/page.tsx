import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { PressLogos } from "@/components/home/PressLogos";
import { ShopByMoment } from "@/components/home/ShopByMoment";
import { GuaranteeStrip } from "@/components/home/GuaranteeStrip";
import { BeforeAfter } from "@/components/home/BeforeAfter";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ComparisonTable } from "@/components/home/ComparisonTable";
import { FounderStory } from "@/components/home/FounderStory";
import { ArtistSpotlight } from "@/components/home/ArtistSpotlight";
import { CaseStudyCards } from "@/components/home/CaseStudyCards";
import { ReviewsCarousel } from "@/components/home/ReviewsCarousel";
import { InstagramFeed } from "@/components/home/InstagramFeed";
import { ShopBanner } from "@/components/home/ShopBanner";
import { GradientDivider } from "@/components/animation/GradientDivider";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <TrustBar />
      <PressLogos />
      <GradientDivider />
      <ShopByMoment />
      <GuaranteeStrip />
      <BeforeAfter />
      <HowItWorks />
      <ComparisonTable />
      <FounderStory />
      <ArtistSpotlight />
      <GradientDivider />
      <CaseStudyCards />
      <ReviewsCarousel />
      <GradientDivider />
      <ShopBanner />
      <InstagramFeed />
    </main>
  );
}
