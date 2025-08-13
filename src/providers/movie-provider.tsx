
"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback, useMemo, useEffect } from 'react';
import type { Movie, MovieCategory } from '@/types';

interface MovieContextType {
  trendingMovies: Movie[];
  newlyReleasedMovies: Movie[];
  bollywoodMovies: Movie[];
  hollywoodMovies: Movie[];
  animeMovies: Movie[];
  southIndianMovies: Movie[];
  getAllMovies: () => Movie[];
  getMovieById: (id: number) => Movie | undefined;
  addMovie: (movie: Movie) => void;
  deleteMovie: (id: number) => void;
  toggleTrending: (id: number) => void;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

const initialMovies: Movie[] = [
    {
      id: 1,
      title: 'WEDNESDAY',
      category: 'hollywood',
      posterUrl: 'https://storage.googleapis.com/studiop-private-asset/projects/59oZkOqQ73Wp2e8ud2tM/assets/D2A2G1M28F8s1k689t9G/wednesday-poster.jpg',
      trailerUrl: "https://www.youtube.com/embed/Q73gUY_hdEk",
      movieUrl: "",
      isTrending: true,
    }
];

// This key will be used to save/load movies from localStorage.
const MOVIES_STORAGE_KEY = 'filmLockMovies';

export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Effect to load movies from localStorage on initial client-side render.
  useEffect(() => {
    try {
      const storedMovies = localStorage.getItem(MOVIES_STORAGE_KEY);
      if (storedMovies) {
        setMovies(JSON.parse(storedMovies));
      } else {
        // If no movies are in storage, initialize with the default.
        setMovies(initialMovies);
      }
    } catch (error) {
      console.error("Failed to parse movies from localStorage", error);
      // If parsing fails, fall back to initial movies.
      setMovies(initialMovies);
    }
    setIsLoaded(true);
  }, []);

  // Effect to save movies to localStorage whenever the movies state changes.
  useEffect(() => {
    // We don't save to localStorage until after the initial load,
    // and only if there are movies to save.
    if (isLoaded && movies.length > 0) {
      localStorage.setItem(MOVIES_STORAGE_KEY, JSON.stringify(movies));
    }
  }, [movies, isLoaded]);

  const addMovie = useCallback((movie: Movie) => {
    setMovies(prevMovies => [movie, ...prevMovies]);
  }, []);

  const deleteMovie = useCallback((id: number) => {
    setMovies(prevMovies => prevMovies.filter(movie => movie.id !== id));
  }, []);

  const toggleTrending = useCallback((id: number) => {
    setMovies(prevMovies => 
      prevMovies.map(movie => 
        movie.id === id ? { ...movie, isTrending: !movie.isTrending } : movie
      )
    );
  }, []);

  const getAllMovies = useCallback((): Movie[] => {
    return [...movies].sort((a,b) => b.id - a.id);
  }, [movies]);

  const getMovieById = useCallback((id: number): Movie | undefined | null => {
      if (!isLoaded) return undefined; // Undefined means still loading
      return movies.find(movie => movie.id === id) ?? null; // Null means not found
  }, [movies, isLoaded]);
  
  const trendingMovies = useMemo(() => {
    if (!isLoaded) return [];
    return movies.filter(m => m.isTrending).sort((a, b) => b.id - a.id);
  }, [movies, isLoaded]);

  const filterMoviesByCategory = useCallback((category: MovieCategory) => {
    if (!isLoaded) return [];
    return movies.filter(m => m.category === category).sort((a, b) => b.id - a.id);
  }, [movies, isLoaded]);

  const newlyReleasedMovies = useMemo(() => {
    if (!isLoaded) return [];
    return [...movies].sort((a, b) => b.id - a.id);
  }, [movies, isLoaded]);

  const bollywoodMovies = useMemo(() => filterMoviesByCategory("bollywood"), [filterMoviesByCategory]);
  const hollywoodMovies = useMemo(() => filterMoviesByCategory("hollywood"), [filterMoviesByCategory]);
  const animeMovies = useMemo(() => filterMoviesByCategory("anime"), [filterMoviesByCategory]);
  const southIndianMovies = useMemo(() => filterMoviesByCategory("south-indian"), [filterMoviesByCategory]);

  const value = { 
      trendingMovies, 
      newlyReleasedMovies, 
      bollywoodMovies,
      hollywoodMovies,
      animeMovies,
      southIndianMovies,
      getMovieById, 
      getAllMovies,
      addMovie,
      deleteMovie,
      toggleTrending,
  };

  return (
    <MovieContext.Provider value={value}>
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
