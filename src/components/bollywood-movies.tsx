
"use client";

import { MovieCard } from "./movie-card";
import { useMovies } from "@/providers/movie-provider";

export function BollywoodMovies() {
  const { bollywoodMovies } = useMovies();

  if (bollywoodMovies.length === 0) return null;

  return (
    <section className="container mx-auto max-w-screen-2xl py-16">
      <h2 className="mb-8 font-headline text-4xl font-bold">Bollywood</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {bollywoodMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
