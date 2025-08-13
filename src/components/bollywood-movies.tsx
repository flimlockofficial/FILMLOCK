
"use client";

import { MovieCard } from "./movie-card";
import { useMovies } from "@/providers/movie-provider";

export function BollywoodMovies() {
  const { bollywoodMovies } = useMovies();

  if (bollywoodMovies.length === 0) return (
     <div className="text-center py-16 text-muted-foreground col-span-full">
        <p>No Bollywood movies have been added yet.</p>
      </div>
  );

  return (
    <section>
      <h2 className="mb-8 font-headline text-4xl font-bold">Bollywood</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {bollywoodMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
