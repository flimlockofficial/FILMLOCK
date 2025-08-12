"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useWatchlist } from "@/hooks/use-watchlist";
import { useToast } from "@/hooks/use-toast";
import type { Movie } from "@/types";
import { cn } from "@/lib/utils";

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const { toggleWatchlist, isInWatchlist, isLoaded } = useWatchlist();
  const { toast } = useToast();
  
  const isLocked = isInWatchlist(movie.id);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWatchlist(movie);
    toast({
      title: isLocked ? "Unlocked from Watchlist" : "Locked in Watchlist",
      description: `${movie.title} has been ${isLocked ? "removed from" : "added to"} your watchlist.`,
    });
  };

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
        {isLoaded && (
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-2 top-2 h-10 w-10 rounded-full bg-black/50 text-white backdrop-blur-sm transition-all hover:bg-primary/80 hover:text-primary-foreground group-hover:opacity-100 md:opacity-0"
            onClick={handleToggle}
            aria-label={isLocked ? "Remove from watchlist" : "Add to watchlist"}
          >
            <Heart className={cn("h-5 w-5", isLocked && "fill-primary text-primary")} />
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
