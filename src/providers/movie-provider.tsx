
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
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
    // Add to newly released by default
    setNewlyReleasedMovies(prevMovies => [movie, ...prevMovies]);

    // Also add to its specific category list
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
    }
  };
  
  const getMovieById = (id: number): Movie | undefined => {
    const allMovies = getAllMovies();
    return allMovies.find(movie => movie.id === id);
  };
  
  const getAllMovies = (): Movie[] => {
    // Use a Set to avoid duplicates since a movie can be in multiple lists (e.g., newly released and its category)
    const allMovieMap = new Map<number, Movie>();
    [...newlyReleasedMovies, ...trendingMovies, ...bollywoodMovies, ...hollywoodMovies, ...animeMovies].forEach(movie => {
        allMovieMap.set(movie.id, movie);
    });
    return Array.from(allMovieMap.values());
  }
  
  const isTrending = (id: number): boolean => {
    return trendingMovies.some(movie => movie.id === id);
  }

  const removeFromAllNonTrendingLists = (id: number) => {
    setNewlyReleasedMovies(prev => prev.filter(m => m.id !== id));
    setBollywoodMovies(prev => prev.filter(m => m.id !== id));
    setHollywoodMovies(prev => prev.filter(m => m.id !== id));
    setAnimeMovies(prev => prev.filter(m => m.id !== id));
  }

  const addToCategoryList = (movie: Movie) => {
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
             setNewlyReleasedMovies(prev => [movie, ...prev]);
    }
  }


  const toggleTrendingStatus = (id: number) => {
    let movieToMove: Movie | undefined;
    
    if (isTrending(id)) {
      // It's currently trending, so move it back to its category list
      movieToMove = trendingMovies.find(m => m.id === id);
      if (movieToMove) {
        setTrendingMovies(prev => prev.filter(m => m.id !== id));
        // Also add it back to its original category list
        addToCategoryList(movieToMove);
      }
    } else {
      // It's not trending, so move it to trending
      movieToMove = getAllMovies().find(m => m.id === id);
       if (movieToMove) {
        // Remove from any list it might be in
        removeFromAllNonTrendingLists(id);
        setTrendingMovies(prev => [movieToMove!, ...prev]);
      }
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
