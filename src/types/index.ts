
export type MovieCategory = "bollywood" | "hollywood" | "anime" | "south-indian";

export interface Movie {
  id: number;
  title: string;
  trailerUrl?: string;
  category?: MovieCategory;
  movieUrl?: string;
  isTrending?: boolean;
  language?: string;
  year?: number | string;
  quality?: string;
  genres?: string[];
  cast?: string[];
  subtitle?: string;
  storyline?: string;
  posterUrl?: string;
}
