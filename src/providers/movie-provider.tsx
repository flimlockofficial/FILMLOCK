
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
  getMovieById: (id: number) => Movie | null | undefined;
  addMovie: (movie: Movie) => void;
  deleteMovie: (id: number) => void;
  toggleTrending: (id: number) => void;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

const MOVIES_STORAGE_KEY = 'filmLockMovies';

const initialMovies: Movie[] = [
    {
    id: 1,
    title: "THE SMILE MAN",
    posterUrl: "https://placehold.co/400x600.png",
    category: "south-indian",
    releaseDate: "2024-10-11",
    trailerUrl: "https://www.youtube.com/embed/g4D8-4-4_hA", // Placeholder trailer
    isTrending: true,
  }
];

export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // On initial client load, we check localStorage.
    // If it's empty or doesn't exist, we set it with our initial movies.
    try {
      // For this version, we will always start fresh, ignoring localStorage to ensure clean state.
      localStorage.setItem(MOVIES_STORAGE_KEY, JSON.stringify(initialMovies));
      setMovies(initialMovies);
    } catch (error) {
      // If localStorage is unavailable, start with initial movies.
      console.error("Failed to access localStorage:", error);
      setMovies(initialMovies);
    }
    setIsLoaded(true);
  }, []);
  
  // Effect to save movies to localStorage whenever the movies state changes.
  useEffect(() => {
    // We don't save to localStorage until after the initial load.
    if (isLoaded) {
      localStorage.setItem(MOVIES_STORAGE_KEY, JSON.stringify(movies));
    }
  }, [movies, isLoaded]);

  const addMovie = useCallback((movie: Movie) => {
    const newMovie = { ...movie, id: Date.now() };
    setMovies(prevMovies => [newMovie, ...prevMovies]);
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
      if (!isLoaded) return undefined; 
      return movies.find(movie => movie.id === id) ?? null;
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
    // The newly released should show all movies, sorted by latest first.
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
