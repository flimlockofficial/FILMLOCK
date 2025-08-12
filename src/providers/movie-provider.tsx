
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Movie } from '@/types';
import { trendingMovies as initialTrending, newlyReleasedMovies as initialNewlyReleased } from '@/lib/mock-data';

interface MovieContextType {
  trendingMovies: Movie[];
  newlyReleasedMovies: Movie[];
  getAllMovies: () => Movie[];
  addMovie: (movie: Movie) => void;
  getMovieById: (id: number) => Movie | undefined;
  toggleTrendingStatus: (id: number) => void;
  isTrending: (id: number) => boolean;
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
  
  const getAllMovies = (): Movie[] => {
    return [...newlyReleasedMovies, ...trendingMovies];
  }
  
  const isTrending = (id: number): boolean => {
    return trendingMovies.some(movie => movie.id === id);
  }

  const toggleTrendingStatus = (id: number) => {
    let movieToMove: Movie | undefined;

    if (isTrending(id)) {
      // It's currently trending, so move it to newly released
      movieToMove = trendingMovies.find(m => m.id === id);
      if (movieToMove) {
        setTrendingMovies(prev => prev.filter(m => m.id !== id));
        setNewlyReleasedMovies(prev => [movieToMove!, ...prev]);
      }
    } else {
      // It's not trending, so move it to trending
      movieToMove = newlyReleasedMovies.find(m => m.id === id);
      if (movieToMove) {
        setNewlyReleasedMovies(prev => prev.filter(m => m.id !== id));
        setTrendingMovies(prev => [movieToMove!, ...prev]);
      }
    }
  };


  return (
    <MovieContext.Provider value={{ trendingMovies, newlyReleasedMovies, addMovie, getMovieById, getAllMovies, toggleTrendingStatus, isTrending }}>
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
