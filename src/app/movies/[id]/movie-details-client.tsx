
"use client";

import { Button, buttonVariants } from "@/components/ui/button";
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
import Link from "next/link";
import { cn } from "@/lib/utils";
import { trackDownload } from "@/app/admin/page-tracker";


interface MovieDetailsClientProps {
  movie: Movie;
}

export function MovieDetailsClient({ movie }: MovieDetailsClientProps) {

  const handleUnavailableDownload = () => {
    toast.error("Download Unavailable", {
      description: "The movie file is not available for download.",
    });
  };

  const downloadHref = movie.movieUrl || "#";

  const handleDownloadClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!movie.movieUrl) {
      e.preventDefault();
      handleUnavailableDownload();
    } else {
        trackDownload();
    }
  };
  
  return (
    <div className="mt-8 flex flex-wrap gap-4">
      {movie.trailerUrl && (
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
      )}
      <Link 
        href={downloadHref}
        target="_blank" 
        rel="noopener noreferrer" 
        className={cn(buttonVariants(), !movie.movieUrl && "cursor-not-allowed opacity-50")}
        onClick={handleDownloadClick}
      >
        <Download className="mr-2 h-5 w-5" />
        {movie.movieUrl ? "Download Now" : "Download Movie"}
      </Link>
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
              src="https://www.youtube.com/embed/2lABtKI7uy0"
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
