
"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback, useMemo } from 'react';
import type { Movie, MovieCategory } from '@/types';
import { initialMovies } from '@/lib/mock-data';

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

  const getAllMovies = useCallback((): Movie[] => {
    return [...movies].sort((a,b) => b.id - a.id);
  }, [movies]);

  const getMovieById = useCallback((id: number): Movie | undefined => {
    return movies.find(movie => movie.id === id);
  }, [movies]);
  
  const trendingMovies = useMemo(() => {
    return movies.filter(m => m.isTrending).sort((a, b) => b.id - a.id);
  }, [movies]);

  const filterMoviesByCategory = useCallback((category: MovieCategory) => {
    return movies.filter(m => m.category === category).sort((a, b) => b.id - a.id);
  }, [movies]);

  const newlyReleasedMovies = useMemo(() => {
    return [...movies].sort((a, b) => b.id - a.id);
  }, [movies]);

  const bollywoodMovies = useMemo(() => filterMoviesByCategory("bollywood"), [filterMoviesByCategory]);
  const hollywoodMovies = useMemo(() => filterMoviesByCategory("hollywood"), [filterMoviesByCategory]);
  const animeMovies = useMemo(() => filterMoviesByCategory("anime"), [filterMoviesByCategory]);

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
