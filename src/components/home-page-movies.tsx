
"use client";

import { MovieCard } from "./movie-card";
import { useMovies } from "@/providers/movie-provider";

export function HomePageMovies() {
    const { newlyReleasedMovies, hollywoodMovies, bollywoodMovies, animeMovies, southIndianMovies } = useMovies();

  return (
    <div className="container mx-auto max-w-screen-2xl py-16 space-y-16">
      {newlyReleasedMovies.length === 0 && 
        hollywoodMovies.length === 0 && 
        bollywoodMovies.length === 0 && 
        animeMovies.length === 0 && 
        southIndianMovies.length === 0 && (
        <div className="text-center py-16 text-muted-foreground col-span-full">
            <p>No movies have been added yet.</p>
        </div>
      )}

      {hollywoodMovies.length > 0 && (
        <section>
          <h2 className="mb-8 font-headline text-4xl font-bold">Hollywood</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {hollywoodMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      )}
      
      {bollywoodMovies.length > 0 && (
        <section>
          <h2 className="mb-8 font-headline text-4xl font-bold">Bollywood</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {bollywoodMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      )}

      {animeMovies.length > 0 && (
        <section>
          <h2 className="mb-8 font-headline text-4xl font-bold">Anime</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {animeMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      )}

      {southIndianMovies.length > 0 && (
        <section>
          <h2 className="mb-8 font-headline text-4xl font-bold">South Indian Hindi Dubbed</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {southIndianMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
