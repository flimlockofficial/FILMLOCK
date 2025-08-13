
"use client";

import { MovieCard } from "./movie-card";
import { useMovies } from "@/providers/movie-provider";

export function AnimeMovies() {
  const { animeMovies } = useMovies();

  if (animeMovies.length === 0) return (
     <div className="text-center py-16 text-muted-foreground col-span-full">
        <p>No Anime movies have been added yet.</p>
      </div>
  );

  return (
    <section>
      <h2 className="mb-8 font-headline text-4xl font-bold">Anime</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {animeMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
