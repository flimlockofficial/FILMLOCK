
export type MovieCategory = "bollywood" | "hollywood" | "anime" | "south-indian";

export interface Movie {
  id: number;
  title: string;
  trailerUrl?: string;
  category?: MovieCategory;
  movieUrl?: string;
  isTrending?: boolean;
  language?: string;
  year?: number;
  size?: string;
  quality?: string;
  source?: string;
  genres?: string[];
  cast?: string[];
  format?: string;
  subtitle?: string;
  storyline?: string;
}
