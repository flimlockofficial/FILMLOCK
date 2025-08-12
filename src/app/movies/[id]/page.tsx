import { notFound } from "next/navigation";
import Image from "next/image";
import { trendingMovies, newlyReleasedMovies } from "@/lib/mock-data";
import { Star } from "lucide-react";
import { MovieDetailsClient } from "./movie-details-client";
import React from "react";

// This is now a React Server Component
export default function MovieDetailsPage({ params }: { params: { id: string } }) {
  // `params` is a promise here, so we unwrap it.
  const resolvedParams = React.use(Promise.resolve({ id: params.id }));
  const allMovies = [...trendingMovies, ...newlyReleasedMovies];
  const movie = allMovies.find((m) => m.id.toString() === resolvedParams.id);

  if (!movie) {
    notFound();
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
            crossOrigin="anonymous" 
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
