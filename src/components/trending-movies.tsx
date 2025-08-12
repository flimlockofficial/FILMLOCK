"use client";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
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
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {trendingMovies.map((movie) => (
            <CarouselItem key={movie.id} className="pl-4 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
              <MovieCard movie={movie} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-16 text-primary hover:bg-primary hover:text-primary-foreground disabled:text-muted-foreground" />
        <CarouselNext className="mr-16 text-primary hover:bg-primary hover:text-primary-foreground disabled:text-muted-foreground" />
      </Carousel>
    </section>
  );
}
