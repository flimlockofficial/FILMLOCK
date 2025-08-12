
"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import type { Movie } from '@/types';

// Helper function to get data from localStorage
const getFromLocalStorage = <T>(key: string, defaultValue: T): T => {
    if (typeof window === 'undefined') return defaultValue;
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
        try {
            return JSON.parse(storedValue);
        } catch (error) {
            console.error(`Error parsing localStorage key "${key}":`, error);
            return defaultValue;
        }
    }
    return defaultValue;
};

// Helper function to set data in localStorage
const setInLocalStorage = <T>(key:string, value: T) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(value));
}

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
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [newlyReleasedMovies, setNewlyReleasedMovies] = useState<Movie[]>([]);
  const [bollywoodMovies, setBollywoodMovies] = useState<Movie[]>([]);
  const [hollywoodMovies, setHollywoodMovies] = useState<Movie[]>([]);
  const [animeMovies, setAnimeMovies] = useState<Movie[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load state from localStorage only on the client side after the component has mounted
    setTrendingMovies(getFromLocalStorage('trendingMovies', []));
    setNewlyReleasedMovies(getFromLocalStorage('newlyReleasedMovies', []));
    setBollywoodMovies(getFromLocalStorage('bollywoodMovies', []));
    setHollywoodMovies(getFromLocalStorage('hollywoodMovies', []));
    setAnimeMovies(getFromLocalStorage('animeMovies', []));
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if(isLoaded) setInLocalStorage('trendingMovies', trendingMovies);
  }, [trendingMovies, isLoaded]);

  useEffect(() => {
    if(isLoaded) setInLocalStorage('newlyReleasedMovies', newlyReleasedMovies);
  }, [newlyReleasedMovies, isLoaded]);

   useEffect(() => {
    if(isLoaded) setInLocalStorage('bollywoodMovies', bollywoodMovies);
  }, [bollywoodMovies, isLoaded]);

   useEffect(() => {
    if(isLoaded) setInLocalStorage('hollywoodMovies', hollywoodMovies);
  }, [hollywoodMovies, isLoaded]);

   useEffect(() => {
    if(isLoaded) setInLocalStorage('animeMovies', animeMovies);
  }, [animeMovies, isLoaded]);

  const addMovie = (movie: Movie) => {
    setNewlyReleasedMovies(prev => [movie, ...prev]);
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
            break;
    }
  };
  
  const deleteMovie = (id: number) => {
    setTrendingMovies(prev => prev.filter(m => m.id !== id));
    setNewlyReleasedMovies(prev => prev.filter(m => m.id !== id));
    setBollywoodMovies(prev => prev.filter(m => m.id !== id));
    setHollywoodMovies(prev => prev.filter(m => m.id !== id));
    setAnimeMovies(prev => prev.filter(m => m.id !== id));
  }
  
  const getAllMovies = useCallback((): Movie[] => {
    const allMovieMap = new Map<number, Movie>();
    [...bollywoodMovies, ...hollywoodMovies, ...animeMovies, ...newlyReleasedMovies, ...trendingMovies].forEach(movie => {
        allMovieMap.set(movie.id, movie);
    });
    return Array.from(allMovieMap.values()).sort((a,b) => b.id - a.id);
  }, [newlyReleasedMovies, trendingMovies, bollywoodMovies, hollywoodMovies, animeMovies]);

  const getMovieById = useCallback((id: number): Movie | undefined => {
    const allMovies = getAllMovies();
    return allMovies.find(movie => movie.id === id);
  }, [getAllMovies]);
  
  const isTrending = (id: number): boolean => {
    return trendingMovies.some(movie => movie.id === id);
  }
  
  const restoreMovieToLists = (movie: Movie) => {
    if (!newlyReleasedMovies.some(m => m.id === movie.id)) {
        setNewlyReleasedMovies(prev => [movie, ...prev].sort((a,b) => b.id - a.id));
    }
    
    switch (movie.category) {
        case 'bollywood':
            if (!bollywoodMovies.some(m => m.id === movie.id)) {
                setBollywoodMovies(prev => [movie, ...prev].sort((a,b) => b.id - a.id));
            }
            break;
        case 'hollywood':
             if (!hollywoodMovies.some(m => m.id === movie.id)) {
                setHollywoodMovies(prev => [movie, ...prev].sort((a,b) => b.id - a.id));
            }
            break;
        case 'anime':
             if (!animeMovies.some(m => m.id === movie.id)) {
                setAnimeMovies(prev => [movie, ...prev].sort((a,b) => b.id - a.id));
            }
            break;
        default:
            break;
    }
  }

  const toggleTrendingStatus = (id: number) => {
    const allMovies = getAllMovies();
    const movieToMove = allMovies.find(m => m.id === id);

    if (!movieToMove) return;
    
    if (isTrending(id)) {
      setTrendingMovies(prev => prev.filter(m => m.id !== id));
      restoreMovieToLists(movieToMove);
    } else {
      setNewlyReleasedMovies(prev => prev.filter(m => m.id !== id));
      setBollywoodMovies(prev => prev.filter(m => m.id !== id));
      setHollywoodMovies(prev => prev.filter(m => m.id !== id));
      setAnimeMovies(prev => prev.filter(m => m.id !== id));
      
      setTrendingMovies(prev => [movieToMove, ...prev].sort((a,b) => b.id - a.id));
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
    if (typeof window !== 'undefined') {
        throw new Error('useMovies must be used within a MovieProvider');
    }
  }
  return context as MovieContextType;
};
