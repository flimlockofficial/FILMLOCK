
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Movie } from '@/types';
import { trendingMovies as initialTrending, newlyReleasedMovies as initialNewlyReleased } from '@/lib/mock-data';

interface MovieContextType {
  trendingMovies: Movie[];
  newlyReleasedMovies: Movie[];
  addMovie: (movie: Movie) => void;
  getMovieById: (id: number) => Movie | undefined;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>(initialTrending);
  const [newlyReleasedMovies, setNewlyReleasedMovies] = useState<Movie[]>(initialNewlyReleased);

  const addMovie = (movie: Movie) => {
    // Add new movies to the "Newly Released" list, making it appear first.
    setNewlyReleasedMovies(prevMovies => [movie, ...prevMovies]);
  };
  
  const getMovieById = (id: number): Movie | undefined => {
    const allMovies = [...trendingMovies, ...newlyReleasedMovies];
    return allMovies.find(movie => movie.id === id);
  };


  return (
    <MovieContext.Provider value={{ trendingMovies, newlyReleasedMovies, addMovie, getMovieById }}>
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
