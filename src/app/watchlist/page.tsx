"use client";

import { useWatchlist } from "@/hooks/use-watchlist";
import { MovieCard } from "@/components/movie-card";
import { Lock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function WatchlistPage() {
  const { watchlist, isLoaded } = useWatchlist();

  return (
    <div className="container mx-auto min-h-[calc(100vh-14rem)] max-w-screen-2xl py-16">
      <h1 className="mb-8 font-headline text-5xl font-bold">Your Watchlist</h1>
      {isLoaded && watchlist.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border py-20 text-center">
            <Lock className="mb-4 h-16 w-16 text-muted-foreground" />
            <h2 className="font-headline text-2xl font-semibold">Your Watchlist is Empty</h2>
            <p className="mt-2 text-muted-foreground">
              Go 'Lock' some movies to see them here!
            </p>
        </div>
      )}
      {isLoaded && watchlist.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {watchlist.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
      {!isLoaded && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[2/3] w-full rounded-lg" />
          ))}
        </div>
      )}
    </div>
  );
}
