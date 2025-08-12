"use client";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { MovieCard } from "./movie-card";
import { trendingMovies } from "@/lib/mock-data";

export function TrendingMovies() {
  return (
    <section className="container mx-auto max-w-screen-2xl py-16">
      <h2 className="mb-8 font-headline text-4xl font-bold">Trending Now</h2>
      <Carousel
        opts={{
          align: "start",
          loop: true,
          dragFree: true,
        }}
        className="w-full group"
      >
        <CarouselContent className="-ml-4">
          {trendingMovies.map((movie) => (
            <CarouselItem key={movie.id} className="pl-4 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
              <MovieCard movie={movie} />
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* The parent div of CarouselContent has overflow-hidden, so we need a sibling for the scrollbar track */}
        <div className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 w-2/3 h-2 rounded-full bg-secondary/40">
           {/* Custom glowing scrollbar thumb - this is a decorative element as embla-carousel handles the actual scrolling */}
        </div>
      </Carousel>
    </section>
  );
}
