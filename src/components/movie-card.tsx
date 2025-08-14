
"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import type { Movie } from "@/types";
import Image from "next/image";

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link href={`/movies/${movie.id}`}>
      <Card className="group overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20">
        <CardContent className="relative flex aspect-[2/3] items-end bg-muted p-0 text-center">
          {movie.posterUrl ? (
             <Image
              src={movie.posterUrl}
              alt={movie.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-secondary p-4">
              <h3 className="font-headline text-lg font-bold text-secondary-foreground">
                {movie.title}
              </h3>
            </div>
          )}
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
           <div className="relative z-10 w-full p-4">
             <h3 className="font-headline text-lg font-bold text-white group-hover:text-primary">
              {movie.title}
            </h3>
           </div>
        </CardContent>
      </Card>
    </Link>
  );
}
