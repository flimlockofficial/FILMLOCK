
"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { Search, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverAnchor } from "@/components/ui/popover";
import { useMovies } from "@/providers/movie-provider";
import type { Movie } from "@/types";
import { AdScript } from "./ad-script";

export function HeroSection() {
  const { getAllMovies } = useMovies();
  const allMovies = useMemo(() => getAllMovies(), [getAllMovies]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Movie[]>([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const filteredMovies = allMovies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5); // Limit suggestions to 5
      setSuggestions(filteredMovies);
      setIsPopoverOpen(filteredMovies.length > 0);
    } else {
      setSuggestions([]);
      setIsPopoverOpen(false);
    }
  }, [searchQuery, allMovies]);
  
  const handleSuggestionClick = () => {
    setSearchQuery("");
    setIsPopoverOpen(false);
  };

  return (
    <section className="relative min-h-[450px] w-full pt-24 pb-4">
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
      <div
        className="absolute inset-0 bg-gradient-to-br from-background via-slate-900 to-black"
        data-ai-hint="dark cinematic"
      />
      <div className="relative z-20 flex h-full flex-col items-center justify-center text-center text-white p-4">
        <div className="mt-8 w-full max-w-2xl">
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverAnchor asChild>
              <div className="flex w-full items-center gap-2">
                <Input
                  ref={inputRef}
                  type="search"
                  placeholder="Search for a movie..."
                  className="h-14 flex-1 border-2 border-border bg-background/80 text-lg text-foreground placeholder:text-muted-foreground focus:bg-background focus:ring-primary"
                  aria-label="Search for a movie"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoComplete="off"
                />
                <Button type="submit" size="lg" className="h-14 bg-primary px-8 text-primary-foreground hover:bg-primary/90">
                  <Search className="mr-2 h-6 w-6" />
                  Search
                </Button>
              </div>
            </PopoverAnchor>
            <PopoverContent 
              className="w-[--radix-popover-trigger-width] max-h-60 overflow-y-auto"
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              <div className="flex flex-col space-y-2">
                {suggestions.length > 0 ? (
                  suggestions.map((movie) => (
                    <Link
                      key={movie.id}
                      href={`/movies/${movie.id}`}
                      className="p-2 -m-2 rounded-md hover:bg-accent"
                      onClick={handleSuggestionClick}
                    >
                      {movie.title}
                    </Link>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No results found.</p>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="mt-6">
          <AdScript />
        </div>

         <div className="mt-8">
            <Button asChild size="lg" variant="outline" className="border-2">
              <Link href="https://t.me/flimlock" target="_blank" rel="noopener noreferrer">
                <Send className="mr-2 h-5 w-5" />
                Join for latest update
              </Link>
            </Button>
          </div>
      </div>
    </section>
  );
}
