
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
        id: 2,
        title: "Tehran",
        category: "bollywood",
        language: "Hindi",
        year: 2025,
        quality: "1080p",
        genres: ["Action", "Thriller"],
        cast: ["John Abraham", "Manushi Chhillar", "Hadi Khanjanpour"],
        subtitle: "English",
        storyline: "After a 2012 Delhi bombing, officer RK’s Tehran mission turns deadly when Iran targets him and India abandons him in his quest to expose the truth.",
        trailerUrl: "https://www.youtube.com/embed/mzr_F0NJMRs",
    },
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
  }
];

export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // This logic ensures that the app always starts with fresh data from the code,
    // preventing issues with outdated data in localStorage.
    const dataToLoad = initialMovies;
    try {
        localStorage.setItem(MOVIES_STORAGE_KEY, JSON.stringify(dataToLoad));
    } catch (error) {
        console.error("Failed to set movies in localStorage", error);
    }
    setMovies(dataToLoad);
    setIsLoaded(true);
  }, []);
  
  // Effect to save movies to localStorage whenever the movies state changes.
  useEffect(() => {
    if (isLoaded) {
      try {
        const storedMovies = localStorage.getItem(MOVIES_STORAGE_KEY);
        // Only write to localStorage if the state is different from what's stored
        if (storedMovies !== JSON.stringify(movies)) {
          localStorage.setItem(MOVIES_STORAGE_KEY, JSON.stringify(movies));
        }
      } catch (error) {
          console.error("Failed to update movies in localStorage", error);
      }
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
