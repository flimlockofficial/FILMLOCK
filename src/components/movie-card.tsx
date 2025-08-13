
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
        <CardContent className="relative p-0">
          <div className="aspect-[2/3] bg-muted flex items-center justify-center p-4">
            <h3 className="font-headline text-lg text-center font-bold text-muted-foreground">
              {movie.title}
            </h3>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
