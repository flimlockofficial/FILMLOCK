
'use client'

import { useParams } from "next/navigation";
import Image from "next/image";
import { Star } from "lucide-react";
import { MovieDetailsClient } from "./movie-details-client";
import { useMovies } from "@/providers/movie-provider";
import { useEffect, useState } from "react";
import type { Movie } from "@/types";

export default function MovieDetailsPage() {
  const params = useParams();
  const { getMovieById } = useMovies();
  const id = params.id ? parseInt(params.id as string, 10) : NaN;
  
  const [movie, setMovie] = useState<Movie | null | undefined>(undefined);

  useEffect(() => {
    if (!isNaN(id)) {
      const foundMovie = getMovieById(id);
      setMovie(foundMovie || null);
    } else {
      setMovie(null); // Explicitly set to null if id is not a number
    }
  }, [id, getMovieById]);
  
  if (movie === undefined) {
    // Still loading
    return (
      <div className="container mx-auto flex min-h-[calc(100vh-14rem)] max-w-screen-2xl items-center justify-center py-16 text-center">
        <div>
          <h1 className="font-headline text-5xl font-bold">Loading...</h1>
        </div>
      </div>
    );
  }

  if (movie === null) {
    // Finished loading, but movie not found
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
        <div className="w-full md:w-1/3">
          <Image
            src={movie.posterUrl}
            alt={`Poster for ${movie.title}`}
            width={500}
            height={750}
            className="w-full rounded-lg object-cover"
            data-ai-hint="movie poster" 
          />
        </div>
        <div className="w-full md:w-2/3">
          <h1 className="font-headline text-5xl font-bold">{movie.title}</h1>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-muted-foreground">5.0 (1 Review)</span>
          </div>
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
