
"use client";

import { MovieCard } from "./movie-card";
import { useMovies } from "@/providers/movie-provider";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from "react";

export function HomePageMovies() {
    const { newlyReleasedMovies, hollywoodMovies, bollywoodMovies, animeMovies, southIndianMovies } = useMovies();
    const autoplayPlugin = React.useRef(
      Autoplay({ delay: 2000, stopOnInteraction: true })
    );

  return (
    <div className="container mx-auto max-w-screen-2xl py-16 space-y-16">
      {newlyReleasedMovies.length === 0 && 
        hollywoodMovies.length === 0 && 
        bollywoodMovies.length === 0 && 
        animeMovies.length === 0 && 
        southIndianMovies.length === 0 && (
        <div className="text-center py-16 text-muted-foreground col-span-full">
            <p>No movies have been added yet.</p>
        </div>
      )}

      {hollywoodMovies.length > 0 && (
        <section>
          <h2 className="mb-8 font-headline text-4xl font-bold">Hollywood</h2>
          <Carousel
            plugins={[autoplayPlugin.current]}
            onMouseEnter={autoplayPlugin.current.stop}
            onMouseLeave={autoplayPlugin.current.reset}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {hollywoodMovies.map((movie) => (
                <CarouselItem key={movie.id} className="min-w-0 shrink-0 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 pl-4">
                  <MovieCard movie={movie} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </section>
      )}
      
      {bollywoodMovies.length > 0 && (
        <section>
          <h2 className="mb-8 font-headline text-4xl font-bold">Bollywood</h2>
           <Carousel
            plugins={[autoplayPlugin.current]}
            onMouseEnter={autoplayPlugin.current.stop}
            onMouseLeave={autoplayPlugin.current.reset}
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
      )}

      {animeMovies.length > 0 && (
        <section>
          <h2 className="mb-8 font-headline text-4xl font-bold">Anime</h2>
           <Carousel
            plugins={[autoplayPlugin.current]}
            onMouseEnter={autoplayPlugin.current.stop}
            onMouseLeave={autoplayPlugin.current.reset}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {animeMovies.map((movie) => (
                <CarouselItem key={movie.id} className="min-w-0 shrink-0 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 pl-4">
                  <MovieCard movie={movie} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </section>
      )}

      {southIndianMovies.length > 0 && (
        <section>
          <h2 className="mb-8 font-headline text-4xl font-bold">South Indian Hindi Dubbed</h2>
           <Carousel
            plugins={[autoplayPlugin.current]}
            onMouseEnter={autoplayPlugin.current.stop}
            onMouseLeave={autoplayPlugin.current.reset}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {southIndianMovies.map((movie) => (
                <CarouselItem key={movie.id} className="min-w-0 shrink-0 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 pl-4">
                  <MovieCard movie={movie} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </section>
      )}
    </div>
  );
}
