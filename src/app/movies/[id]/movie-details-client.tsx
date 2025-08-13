
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Download, Play, HelpCircle } from "lucide-react";
import type { Movie } from "@/types";

interface MovieDetailsClientProps {
  movie: Movie;
}

export function MovieDetailsClient({ movie }: MovieDetailsClientProps) {

  const handleDownload = () => {
    if (movie.movieUrl) {
      window.open(movie.movieUrl, "_blank", "noopener,noreferrer");
      toast.success("Opening Download Page", {
        description: `Your download for "${movie.title}" will start on the new page.`,
      });
    } else {
      toast.error("Download Unavailable", {
        description: "The movie file is not available for download.",
      });
    }
  };

  return (
    <div className="mt-8 flex flex-wrap gap-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <Play className="mr-2 h-5 w-5" />
            Trailer
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{movie.title} - Trailer</DialogTitle>
          </DialogHeader>
          <div className="aspect-video">
            <iframe
              width="100%"
              height="100%"
              src={movie.trailerUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
      <Button onClick={handleDownload} variant="outline">
        <Download className="mr-2 h-5 w-5" />
        Download Movie
      </Button>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary">
            <HelpCircle className="mr-2 h-5 w-5" />
            How to Download
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>How to Download</DialogTitle>
          </DialogHeader>
          <div className="aspect-video">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
