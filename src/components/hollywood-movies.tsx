
"use client";

import { MovieCard } from "./movie-card";
import { useMovies } from "@/providers/movie-provider";

export function HollywoodMovies() {
  const { hollywoodMovies } = useMovies();

  if (hollywoodMovies.length === 0) return (
     <div className="text-center py-16 text-muted-foreground col-span-full">
        <p>No Hollywood movies have been added yet.</p>
      </div>
  );

  return (
    <section>
      <h2 className="mb-8 font-headline text-4xl font-bold">Hollywood</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {hollywoodMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
