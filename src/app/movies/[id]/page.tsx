"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import { trendingMovies, upcomingMovies } from "@/lib/mock-data";
import { Star, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MovieDetailsPage({ params }: { params: { id: string } }) {
  const allMovies = [...trendingMovies, ...upcomingMovies];
  // The 'id' parameter is directly available on `params` in client components.
  // The error message might be misleading if it's incorrectly identifying this as a server component context.
  // We will access it directly as this is a client component.
  const movie = allMovies.find((m) => m.id.toString() === params.id);

  if (!movie) {
    notFound();
  }

  const handleDownload = async () => {
    try {
      const response = await fetch(movie.posterUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      // Truncate the title to a reasonable length for the filename
      const fileName = `${movie.title.substring(0, 50).replace(/ /g, '_')}_poster.jpg`;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download poster:", error);
      // You could add a user-facing error message here, e.g., using a toast
    }
  };

  return (
    <div className="container mx-auto max-w-screen-2xl py-16">
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="w-full md:w-1/3">
          <Image
            src={movie.posterUrl}
            alt={`Poster for ${movie.title}`}
            width={500}
            height={750}
            className="w-full rounded-lg object-cover"
            data-ai-hint="movie poster"
            crossOrigin="anonymous" // Required for fetching image from a different origin
          />
        </div>
        <div className="w-full md:w-2/3">
          <h1 className="font-headline text-5xl font-bold">{movie.title}</h1>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-muted-foreground">5.0 (1 Review)</span>
          </div>
          <p className="mt-6 text-lg text-muted-foreground">
            A full description of the movie will be available soon. For now, enjoy this placeholder text about the exciting story, talented cast, and acclaimed director. This film promises to be a cinematic experience you won't want to miss.
          </p>
          {movie.releaseDate && (
            <p className="mt-4 text-lg">
              <strong>Release Date:</strong> {movie.releaseDate}
            </p>
          )}
           <Button onClick={handleDownload} className="mt-8">
            <Download className="mr-2 h-5 w-5" />
            Download Poster
          </Button>
        </div>
      </div>
    </div>
  );
}
