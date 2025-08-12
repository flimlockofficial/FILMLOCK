import { HeroSection } from "@/components/hero-section";
import { TrendingMovies } from "@/components/trending-movies";
import { NewlyReleased } from "@/components/upcoming-releases";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrendingMovies />
      <NewlyReleased />
    </>
  );
}
