
"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import type { Movie } from "@/types";

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link href={`/movies/${movie.id}`}>
      <Card className="group overflow-hidden rounded-lg border bg-card shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20">
        <CardContent className="flex h-32 items-center justify-center p-4 text-center">
          <h3 className="font-headline text-lg font-bold text-muted-foreground group-hover:text-primary">
            {movie.title}
          </h3>
        </CardContent>
      </Card>
    </Link>
  );
}
