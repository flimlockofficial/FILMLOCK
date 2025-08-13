
'use client'

import { useParams } from "next/navigation";
import { useMovies } from "@/providers/movie-provider";
import { Button, buttonVariants } from "@/components/ui/button";
import { Download } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function MovieDownloadPage() {
  const params = useParams();
  const { getMovieById } = useMovies();
  const id = params.id ? parseInt(params.id as string, 10) : NaN;
  
  const movie = isNaN(id) ? null : getMovieById(id);
  
  if (movie === undefined) {
    return (
      <div className="container mx-auto flex min-h-[calc(100vh-14rem)] max-w-screen-2xl items-center justify-center py-16 text-center">
        <div>
          <h1 className="font-headline text-5xl font-bold">Loading...</h1>
        </div>
      </div>
    );
  }

  if (movie === null || !movie.movieUrl) {
     return (
        <div className="container mx-auto flex min-h-[calc(100vh-14rem)] max-w-screen-2xl items-center justify-center py-16 text-center">
          <div>
            <h1 className="font-headline text-5xl font-bold">404 - Download Not Found</h1>
            <p className="mt-4 text-lg text-muted-foreground">The download link for this movie is not available.</p>
          </div>
        </div>
      );
  }

  return (
    <div className="container mx-auto max-w-screen-2xl py-16 flex items-center justify-center min-h-[calc(100vh-14rem)]">
        <Card className="w-full max-w-lg">
            <CardHeader>
                <CardTitle className="text-center text-3xl font-headline">{movie.title}</CardTitle>
                <CardDescription className="text-center">
                    Your download is ready. Click the button below to start.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
                 <Link
                    href={movie.movieUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(buttonVariants({ size: "lg" }))}
                >
                    <Download className="mr-2 h-5 w-5" />
                    Download Now
                </Link>
            </CardContent>
            <CardFooter className="text-center flex-col">
                <p className="text-xs text-muted-foreground mt-4">
                    If the download doesn't start, please try again or contact us.
                </p>
                 <p className="text-xs text-muted-foreground mt-1">
                    Having trouble? Make sure you have disabled any ad-blockers.
                </p>
            </CardFooter>
        </Card>
    </div>
  );
}
