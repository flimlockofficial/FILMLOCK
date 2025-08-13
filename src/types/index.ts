
export type MovieCategory = "bollywood" | "hollywood" | "anime" | "south-indian";

export interface Movie {
  id: number;
  title: string;
  trailerUrl?: string;
  category?: MovieCategory;
  movieUrl?: string;
  isTrending?: boolean;
}
