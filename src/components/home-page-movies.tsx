
import { HollywoodMovies } from "./hollywood-movies";
import { BollywoodMovies } from "./bollywood-movies";
import { AnimeMovies } from "./anime-movies";
import { SouthIndianMovies } from "./south-indian-movies";

export function HomePageMovies() {
  return (
    <div className="container mx-auto max-w-screen-2xl py-16 space-y-16">
      <HollywoodMovies />
      <BollywoodMovies />
      <AnimeMovies />
      <SouthIndianMovies />
    </div>
  );
}
