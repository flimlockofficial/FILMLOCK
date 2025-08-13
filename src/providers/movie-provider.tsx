
"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback, useMemo } from 'react';
import type { Movie, MovieCategory } from '@/types';

const initialMovies: Movie[] = [
    { id: 1, title: "Cyber City Chronicles", posterUrl: "https://placehold.co/400x600/D4AF37/222222.png", trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", category: "hollywood", movieUrl: "#" },
    { id: 2, title: "Echoes of the Past", posterUrl: "https://placehold.co/400x600/A9A9A9/222222.png", trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", category: "hollywood", movieUrl: "#" },
    { id: 3, title: "The Last Stand", posterUrl: "https://placehold.co/400x600/D4AF37/222222.png", trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", category: "hollywood", movieUrl: "#" },
    { id: 4, title: "Midnight Whispers", posterUrl: "https://placehold.co/400x600/A9A9A9/222222.png", trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", category: "hollywood", movieUrl: "#" },
    { id: 5, title: "Galactic Odyssey", posterUrl: "https://placehold.co/400x600/D4AF37/222222.png", trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", category: "hollywood", movieUrl: "#" },
    { id: 6, title: "Secrets of the Deep", posterUrl: "https://placehold.co/400x600/A9A9A9/222222.png", trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", category: "hollywood", movieUrl: "#" },
    { id: 7, title: "Project Phoenix", posterUrl: "https://placehold.co/400x600/D4AF37/222222.png", trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", category: "bollywood", movieUrl: "#" },
    { id: 8, title: "The Gilded Cage", posterUrl: "https://placehold.co/400x600/A9A9A9/222222.png", trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", category: "bollywood", movieUrl: "#" },
    { id: 9, title: "Neon Velocity", posterUrl: "https://placehold.co/400x600/D4AF37/222222.png", trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", category: "anime", movieUrl: "#" },
    { id: 10, title: "Chronos", posterUrl: "https://placehold.co/400x600/A9A9A9/222222.png", trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", category: "anime", movieUrl: "#" },
];

const initialTrendingIds: number[] = [1, 5, 7, 9];


interface MovieContextType {
  trendingMovies: Movie[];
  newlyReleasedMovies: Movie[];
  bollywoodMovies: Movie[];
  hollywoodMovies: Movie[];
  animeMovies: Movie[];
  getAllMovies: () => Movie[];
  getMovieById: (id: number) => Movie | undefined;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [movies] = useState<Movie[]>(initialMovies);
  const [trendingIds] = useState<number[]>(initialTrendingIds);

  const getAllMovies = useCallback((): Movie[] => {
    return movies.sort((a,b) => b.id - a.id);
  }, [movies]);

  const getMovieById = useCallback((id: number): Movie | undefined => {
    return movies.find(movie => movie.id === id);
  }, [movies]);
  
  const trendingMovies = useMemo(() => {
    return movies.filter(m => trendingIds.includes(m.id)).sort((a, b) => b.id - a.id);
  }, [movies, trendingIds]);

  const filterMoviesByCategory = (category: MovieCategory) => {
    return movies.filter(m => m.category === category).sort((a, b) => b.id - a.id);
  }

  const newlyReleasedMovies = useMemo(() => {
    // Return all movies sorted by ID
    return movies.sort((a, b) => b.id - a.id);
  }, [movies]);

  const bollywoodMovies = useMemo(() => filterMoviesByCategory("bollywood"), [movies]);
  const hollywoodMovies = useMemo(() => filterMoviesByCategory("hollywood"), [movies]);
  const animeMovies = useMemo(() => filterMoviesByCategory("anime"), [movies]);

  return (
    <MovieContext.Provider value={{ 
        trendingMovies, 
        newlyReleasedMovies, 
        bollywoodMovies,
        hollywoodMovies,
        animeMovies,
        getMovieById, 
        getAllMovies, 
    }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = () => {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error('useMovies must be used within a MovieProvider');
  }
  return context;
};
