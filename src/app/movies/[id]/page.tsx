
'use client'

import { useParams } from "next/navigation";
import { MovieDetailsClient } from "./movie-details-client";
import { useMovies } from "@/providers/movie-provider";
import Image from 'next/image';

const DetailItem = ({ label, value }: { label: string, value?: string | string[] | number }) => {
  if (!value) return null;

  const displayValue = Array.isArray(value) ? value.join(', ') : value;

  return (
    <p>
      <span className="font-semibold">{label}: </span>
      {displayValue}
    </p>
  );
};


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
      <div className="flex flex-col gap-8 md:flex-row md:gap-12">
        {movie.posterUrl && (
          <div className="w-full md:w-1/3 flex-shrink-0">
            <div className="aspect-[2/3] relative w-full overflow-hidden rounded-lg shadow-2xl">
              <Image
                src={movie.posterUrl}
                alt={movie.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>
        )}
        <div className="w-full">
          <h1 className="font-headline text-5xl font-bold">{movie.title}</h1>

          <div className="mt-6 space-y-4 text-muted-foreground">
            {movie.storyline && (
              <div>
                <h2 className="mb-2 text-2xl font-semibold text-foreground">Storyline</h2>
                <p className="text-lg">{movie.storyline}</p>
              </div>
            )}
            
            <div className="border-t border-border/40 pt-4">
              <h2 className="mb-2 text-2xl font-semibold text-foreground">Movie Details</h2>
              <div className="space-y-2">
                <DetailItem label="Language" value={movie.language} />
                <DetailItem label="Released Year" value={movie.year} />
                <DetailItem label="Quality" value={movie.quality} />
                <DetailItem label="Genres" value={movie.genres} />
                <DetailItem label="Cast" value={movie.cast} />
                <DetailItem label="Subtitle" value={movie.subtitle} />
              </div>
            </div>
          </div>
          
          <MovieDetailsClient movie={movie} />
        </div>
      </div>
    </div>
  );
}
