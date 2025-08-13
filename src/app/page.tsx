import { HeroSection } from "@/components/hero-section";
import { NewlyReleased } from "@/components/upcoming-releases";
import { BollywoodMovies } from "@/components/bollywood-movies";
import { HollywoodMovies } from "@/components/hollywood-movies";
import { AnimeMovies } from "@/components/anime-movies";

export default function Home() {
  return (
    <>
      <HeroSection />
      <NewlyReleased />
      <BollywoodMovies />
      <HollywoodMovies />
      <AnimeMovies />
    </>
  );
}
