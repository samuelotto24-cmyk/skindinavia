import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { PressLogos } from "@/components/home/PressLogos";
import { ProductLineup } from "@/components/home/ProductLineup";
import { ShopByMoment } from "@/components/home/ShopByMoment";
import { BeforeAfter } from "@/components/home/BeforeAfter";
import { ProductMarble } from "@/components/home/ProductMarble";
import { HowItWorks } from "@/components/home/HowItWorks";
import { FounderStory } from "@/components/home/FounderStory";
import { ArtistSpotlight } from "@/components/home/ArtistSpotlight";
import { ReviewsCarousel } from "@/components/home/ReviewsCarousel";
import { InstagramFeed } from "@/components/home/InstagramFeed";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <TrustBar />
      <PressLogos />
      <ProductLineup />
      <ShopByMoment />
      <BeforeAfter />
      <ProductMarble />
      <HowItWorks />
      <FounderStory />
      <ArtistSpotlight />
      <ReviewsCarousel />
      <InstagramFeed />
    </main>
  );
}
