"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import type { Movie } from "@/types";

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Card className="group overflow-hidden rounded-lg border-0 bg-transparent shadow-none transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20">
      <CardContent className="relative p-0">
        <div className="aspect-[2/3] overflow-hidden">
          <Image
            src={movie.posterUrl}
            alt={`Poster for ${movie.title}`}
            width={400}
            height={600}
            className="h-full w-full object-cover transition-transform duration-300 ease-in-out"
            data-ai-hint="movie poster"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="font-headline text-lg font-bold text-white shadow-black [text-shadow:0_2px_4px_var(--tw-shadow-color)]">
            {movie.title}
          </h3>
        </div>
      </CardContent>
    </Card>
  );
}
