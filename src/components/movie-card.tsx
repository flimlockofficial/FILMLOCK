
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
        <CardContent className="relative p-0">
          {movie.posterUrl ? (
            <div className="aspect-[2/3] w-full overflow-hidden">
              <Image
                src={movie.posterUrl}
                alt={movie.title}
                width={400}
                height={600}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                data-ai-hint="movie poster"
              />
            </div>
          ) : (
             <div className="flex aspect-[2/3] w-full items-center justify-center bg-secondary p-4 text-center">
                <h3 className="font-headline text-lg font-bold text-secondary-foreground group-hover:text-primary">
                  {movie.title}
                </h3>
             </div>
          )}
           <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
            <h3 className="font-headline text-lg font-bold text-white group-hover:text-primary">
              {movie.title}
            </h3>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
