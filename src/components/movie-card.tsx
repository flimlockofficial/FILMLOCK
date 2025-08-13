
"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import type { Movie } from "@/types";
import { Clapperboard } from "lucide-react";

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link href={`/movies/${movie.id}`}>
      <Card className="group overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20">
        <CardContent className="relative aspect-[2/3] p-0">
          {movie.posterUrl ? (
            <Image
              src={movie.posterUrl}
              alt={movie.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
            />
          ) : (
             <div className="flex h-full w-full flex-col items-center justify-center bg-muted p-4 text-center">
              <Clapperboard className="h-12 w-12 text-muted-foreground" />
            </div>
          )}
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
           <div className="absolute bottom-0 left-0 right-0 p-4">
             <h3 className="font-headline text-lg font-bold text-white group-hover:text-primary">
              {movie.title}
            </h3>
           </div>
        </CardContent>
      </Card>
    </Link>
  );
}
