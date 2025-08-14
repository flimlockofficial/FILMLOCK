
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
      <div className="embla__container flex space-x-4 pb-4 -ml-4 pl-4">
        {hollywoodMovies.map((movie) => (
          <div key={movie.id} className="min-w-0 shrink-0 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </section>
  );
}
