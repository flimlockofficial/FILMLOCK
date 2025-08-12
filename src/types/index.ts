export type MovieCategory = "bollywood" | "hollywood" | "anime";

export interface Movie {
  id: number;
  title: string;
  posterUrl: string;
  releaseDate?: string;
  trailerUrl?: string;
  category?: MovieCategory;
}
