
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

const initialWednesdayMovie: Movie[] = [
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


export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const storedMovies = localStorage.getItem('movies');
      if (storedMovies) {
        setMovies(JSON.parse(storedMovies));
      } else {
        setMovies(initialWednesdayMovie);
      }
    } catch (error) {
      console.error("Failed to load movies from localStorage", error);
      // Initialize with Wednesday movie if storage fails
      setMovies(initialWednesdayMovie);
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem('movies', JSON.stringify(movies));
      } catch (error) {
        console.error("Failed to save movies to localStorage", error);
      }
    }
  }, [movies, isInitialized]);

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

  if (!isInitialized) {
    return null;
  }

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
