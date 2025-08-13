
'use client'

import { useParams } from "next/navigation";
import { Star } from "lucide-react";
import { MovieDetailsClient } from "./movie-details-client";
import { useMovies } from "@/providers/movie-provider";

export default function MovieDetailsPage() {
  const params = useParams();
  const { getMovieById } = useMovies();
  const id = params.id ? parseInt(params.id as string, 10) : NaN;
  
  const movie = isNaN(id) ? null : getMovieById(id);
  
  if (movie === undefined) {
    return (
      <div className="container mx-auto flex min-h-[calc(100vh-14rem)] max-w-screen-2xl items-center justify-center py-16 text-center">
        <div>
          <h1 className="font-headline text-5xl font-bold">Loading...</h1>
        </div>
      </div>
    );
  }

  if (movie === null) {
     return (
        <div className="container mx-auto flex min-h-[calc(100vh-14rem)] max-w-screen-2xl items-center justify-center py-16 text-center">
          <div>
            <h1 className="font-headline text-5xl font-bold">404 - Movie Not Found</h1>
            <p className="mt-4 text-lg text-muted-foreground">The movie you are looking for does not exist.</p>
          </div>
        </div>
      );
  }

  return (
    <div className="container mx-auto max-w-screen-2xl py-16">
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="w-full">
          <h1 className="font-headline text-5xl font-bold">{movie.title}</h1>
          <p className="mt-6 text-lg text-muted-foreground">
            A full description of the movie will be available soon. For now, enjoy this placeholder text about the exciting story, talented cast, and acclaimed director. This film promises to be a cinematic experience you won't want to miss.
          </p>
          {movie.releaseDate && (
            <p className="mt-4 text-lg">
              <strong>Release Date:</strong> {movie.releaseDate}
            </p>
          )}
          <MovieDetailsClient movie={movie} />
        </div>
      </div>
    </div>
  );
}
