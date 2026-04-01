import { Hero } from "@/components/home/Hero";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { PressLogos } from "@/components/home/PressLogos";
import { ArtistSpotlight } from "@/components/home/ArtistSpotlight";
import { CaseStudyCards } from "@/components/home/CaseStudyCards";
import { ReviewsCarousel } from "@/components/home/ReviewsCarousel";
import { BlogPreview } from "@/components/home/BlogPreview";
import { Newsletter } from "@/components/home/Newsletter";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <PressLogos />
      <ArtistSpotlight />
      <CaseStudyCards />
      <ReviewsCarousel />
      <BlogPreview />
      <Newsletter />
    </main>
  );
}
