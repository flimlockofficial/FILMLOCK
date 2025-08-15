
"use client";

import { MovieCard } from "./movie-card";
import { useMovies } from "@/providers/movie-provider";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from "react";

export function BollywoodMovies() {
  const { bollywoodMovies } = useMovies();

  const AutoplayPlugin = () => Autoplay({ delay: 4000, stopOnInteraction: false });

  if (bollywoodMovies.length === 0) return (
     <div className="text-center py-16 text-muted-foreground col-span-full">
        <p>No Bollywood movies have been added yet.</p>
      </div>
  );

  return (
    <section>
      <h2 className="mb-8 font-headline text-4xl font-bold">Bollywood</h2>
       <Carousel
        plugins={[AutoplayPlugin()]}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {bollywoodMovies.map((movie) => (
            <CarouselItem key={movie.id} className="min-w-0 shrink-0 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 pl-4">
              <MovieCard movie={movie} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
