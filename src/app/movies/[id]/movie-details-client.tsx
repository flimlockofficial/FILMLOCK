"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Download } from "lucide-react";
import type { Movie } from "@/types";

interface MovieDetailsClientProps {
  movie: Movie;
}

export function MovieDetailsClient({ movie }: MovieDetailsClientProps) {
  const { toast } = useToast();

  const handleDownload = async () => {
    try {
      const response = await fetch(movie.posterUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const fileName = `${movie.title.substring(0, 50).replace(/ /g, "_")}_poster.jpg`;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download poster:", error);
      toast({
        variant: "destructive",
        title: "Download Failed",
        description: "There was a problem downloading the movie poster. Please try again later.",
      });
    }
  };

  return (
    <Button onClick={handleDownload} className="mt-8">
      <Download className="mr-2 h-5 w-5" />
      Download
    </Button>
  );
}
