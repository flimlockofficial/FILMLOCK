
"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import type { Movie } from '@/types';

interface MovieContextType {
  trendingMovies: Movie[];
  newlyReleasedMovies: Movie[];
  bollywoodMovies: Movie[];
  hollywoodMovies: Movie[];
  animeMovies: Movie[];
  getAllMovies: () => Movie[];
  addMovie: (movie: Movie) => void;
  getMovieById: (id: number) => Movie | undefined;
  toggleTrendingStatus: (id: number) => void;
  isTrending: (id: number) => boolean;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [newlyReleasedMovies, setNewlyReleasedMovies] = useState<Movie[]>([]);
  const [bollywoodMovies, setBollywoodMovies] = useState<Movie[]>([]);
  const [hollywoodMovies, setHollywoodMovies] = useState<Movie[]>([]);
  const [animeMovies, setAnimeMovies] = useState<Movie[]>([]);

  const addMovie = (movie: Movie) => {
    // Add to newly released
    setNewlyReleasedMovies(prev => [movie, ...prev]);

    // Add to specific category
    switch (movie.category) {
        case 'bollywood':
            setBollywoodMovies(prev => [movie, ...prev]);
            break;
        case 'hollywood':
            setHollywoodMovies(prev => [movie, ...prev]);
            break;
        case 'anime':
            setAnimeMovies(prev => [movie, ...prev]);
            break;
        default:
             // Fallback for uncategorized movies
             // Already added to newly released, so nothing more to do here.
            break;
    }
  };
  
  const getAllMovies = useCallback((): Movie[] => {
    const allMovieMap = new Map<number, Movie>();
    // The order matters, spread all movies to ensure the map has the latest version of each movie.
    // Start with all category lists, then newly released, then trending.
    [...bollywoodMovies, ...hollywoodMovies, ...animeMovies, ...newlyReleasedMovies, ...trendingMovies].forEach(movie => {
        allMovieMap.set(movie.id, movie);
    });
    return Array.from(allMovieMap.values());
  }, [newlyReleasedMovies, trendingMovies, bollywoodMovies, hollywoodMovies, animeMovies]);

  const getMovieById = useCallback((id: number): Movie | undefined => {
    const allMovies = getAllMovies();
    return allMovies.find(movie => movie.id === id);
  }, [getAllMovies]);
  
  const isTrending = (id: number): boolean => {
    return trendingMovies.some(movie => movie.id === id);
  }
  
  const restoreMovieToLists = (movie: Movie) => {
    // Add to newly released if it was there before (we assume all non-trending movies can be considered "newly released" in this context for simplicity, or we could add a date check)
    if (!newlyReleasedMovies.some(m => m.id === movie.id)) {
        setNewlyReleasedMovies(prev => [movie, ...prev]);
    }
    
    // Add back to its specific category list
    switch (movie.category) {
        case 'bollywood':
            if (!bollywoodMovies.some(m => m.id === movie.id)) {
                setBollywoodMovies(prev => [movie, ...prev]);
            }
            break;
        case 'hollywood':
             if (!hollywoodMovies.some(m => m.id === movie.id)) {
                setHollywoodMovies(prev => [movie, ...prev]);
            }
            break;
        case 'anime':
             if (!animeMovies.some(m => m.id === movie.id)) {
                setAnimeMovies(prev => [movie, ...prev]);
            }
            break;
        default:
            // No specific category list to add back to
            break;
    }
  }


  const toggleTrendingStatus = (id: number) => {
    const allMovies = getAllMovies();
    const movieToMove = allMovies.find(m => m.id === id);

    if (!movieToMove) return;
    
    if (isTrending(id)) {
      // It's currently trending, so remove from trending and add back to its appropriate lists
      setTrendingMovies(prev => prev.filter(m => m.id !== id));
      restoreMovieToLists(movieToMove);
    } else {
      // It's not trending, so move it to trending
      // Remove it from all other lists
      setNewlyReleasedMovies(prev => prev.filter(m => m.id !== id));
      setBollywoodMovies(prev => prev.filter(m => m.id !== id));
      setHollywoodMovies(prev => prev.filter(m => m.id !== id));
      setAnimeMovies(prev => prev.filter(m => m.id !== id));
      
      setTrendingMovies(prev => [movieToMove, ...prev]);
    }
  };


  return (
    <MovieContext.Provider value={{ 
        trendingMovies, 
        newlyReleasedMovies, 
        bollywoodMovies,
        hollywoodMovies,
        animeMovies,
        addMovie, 
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
