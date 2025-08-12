
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast";
import { Download, Play, HelpCircle } from "lucide-react";
import type { Movie } from "@/types";

interface MovieDetailsClientProps {
  movie: Movie;
}

export function MovieDetailsClient({ movie }: MovieDetailsClientProps) {
  const { toast } = useToast();

  const handleDownload = async () => {
    // In a real application, movie.movieUrl would point to the actual file.
    // Since we are not uploading files to a server in this prototype,
    // we will simulate the download action.
    
    // We can create a dummy file to simulate the download.
    const movieFileContent = `This is a placeholder for the movie: ${movie.title}`;
    const blob = new Blob([movieFileContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
    // Suggest a filename for the download.
    const fileName = `${movie.title.replace(/ /g, "_")}.txt`; // .txt for simulation, would be .mp4 in reality
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    
    toast({
        title: "Download Started",
        description: `Downloading "${movie.title}". Please note this is a simulated file.`,
    });

    link.parentNode?.removeChild(link);
    window.URL.revokeObjectURL(url);
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
