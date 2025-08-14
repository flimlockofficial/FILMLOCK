
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
    category: "south-indian",
    trailerUrl: "https://www.youtube.com/embed/jDO7clVUess",
    movieUrl: "https://linkpays.in/thesmileman",
    isTrending: true,
    language: "Dual Audio [Hindi-Tamil]",
    year: 2022,
    quality: "480p | 720p | 1080p",
    genres: ["Crime", "Thriller"],
    cast: ["Sarath Kumar", "Sija Rose", "Iniya"],
    subtitle: "English",
    storyline: "A Cop with Alzheimer’s disease, set to solve the case of a serial killer on the run,before he loses his memory",
    posterUrl: "https://storage.googleapis.com/maker-studio-5f25b.appspot.com/assets/the-smile-man-poster.jpg",
  }
];

export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // This logic ensures that the app always starts with fresh data from the code,
    // preventing issues with outdated data in localStorage.
    const storedMovies = localStorage.getItem(MOVIES_STORAGE_KEY);
    const dataToLoad = initialMovies;
    
    // We update localStorage only if it's different from our initial data.
    // This avoids unnecessary writes.
    if (JSON.stringify(dataToLoad) !== storedMovies) {
      localStorage.setItem(MOVIES_STORAGE_KEY, JSON.stringify(dataToLoad));
    }

    setMovies(dataToLoad);
    setIsLoaded(true);
  }, []);
  
  // Effect to save movies to localStorage whenever the movies state changes.
  useEffect(() => {
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
    throw new Error('useMovies must be be used within a MovieProvider');
  }
  return context;
};
