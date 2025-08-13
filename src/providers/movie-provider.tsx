
"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback, useMemo } from 'react';
import type { Movie, MovieCategory } from '@/types';

// In-memory data store
let moviesStore: Movie[] = [];
let trendingStore: number[] = [];


interface MovieContextType {
  trendingMovies: Movie[];
  newlyReleasedMovies: Movie[];
  bollywoodMovies: Movie[];
  hollywoodMovies: Movie[];
  animeMovies: Movie[];
  getAllMovies: () => Movie[];
  addMovie: (movie: Movie) => void;
  deleteMovie: (id: number) => void;
  getMovieById: (id: number) => Movie | undefined;
  toggleTrendingStatus: (id: number) => void;
  isTrending: (id: number) => boolean;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [movies, setMovies] = useState<Movie[]>(moviesStore);
  const [trendingIds, setTrendingIds] = useState<number[]>(trendingStore);

  const addMovie = (movie: Movie) => {
    const newMovie = { ...movie, id: Date.now() }; // Ensure unique ID
    const updatedMovies = [newMovie, ...movies];
    setMovies(updatedMovies);
    moviesStore = updatedMovies;
  };
  
  const deleteMovie = (id: number) => {
    const updatedMovies = movies.filter(m => m.id !== id);
    const updatedTrendingIds = trendingIds.filter(tid => tid !== id);
    
    setMovies(updatedMovies);
    setTrendingIds(updatedTrendingIds);

    moviesStore = updatedMovies;
    trendingStore = updatedTrendingIds;
  }
  
  const getAllMovies = useCallback((): Movie[] => {
    return movies.sort((a,b) => b.id - a.id);
  }, [movies]);

  const getMovieById = useCallback((id: number): Movie | undefined => {
    return movies.find(movie => movie.id === id);
  }, [movies]);
  
  const isTrending = (id: number): boolean => {
    return trendingIds.includes(id);
  }
  
  const toggleTrendingStatus = (id: number) => {
    let updatedTrendingIds;
    if (trendingIds.includes(id)) {
      updatedTrendingIds = trendingIds.filter(tid => tid !== id);
    } else {
      updatedTrendingIds = [id, ...trendingIds];
    }
    setTrendingIds(updatedTrendingIds);
    trendingStore = updatedTrendingIds;
  };
  
  const trendingMovies = useMemo(() => {
    return movies.filter(m => trendingIds.includes(m.id)).sort((a, b) => b.id - a.id);
  }, [movies, trendingIds]);

  const filterMoviesByCategory = (category: MovieCategory) => {
    return movies.filter(m => m.category === category).sort((a, b) => b.id - a.id);
  }

  const newlyReleasedMovies = useMemo(() => {
    // Return all movies sorted by ID, limited to a certain number if desired
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
        addMovie, 
        deleteMovie,
        getMovieById, 
        getAllMovies, 
        toggleTrendingStatus, 
        isTrending 
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
