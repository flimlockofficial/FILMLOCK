"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import type { Movie } from "@/types";

interface MovieDetailsClientProps {
  movie: Movie;
}

export function MovieDetailsClient({ movie }: MovieDetailsClientProps) {
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
    <Button onClick={handleDownload} className="mt-8">
      <Download className="mr-2 h-5 w-5" />
      Download Poster
    </Button>
  );
}
