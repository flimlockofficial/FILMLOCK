"use client";

import { useState, useEffect, useCallback } from 'react';
import type { Movie } from '@/types';

const WATCHLIST_KEY = 'filmLockWatchlist';

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const items = window.localStorage.getItem(WATCHLIST_KEY);
      if (items) {
        setWatchlist(JSON.parse(items));
      }
    } catch (error) {
      console.error("Failed to parse watchlist from localStorage", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        window.localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
      } catch (error) {
        console.error("Failed to save watchlist to localStorage", error);
      }
    }
  }, [watchlist, isLoaded]);

  const toggleWatchlist = useCallback((movie: Movie) => {
    setWatchlist((prev) => {
      const isInWatchlist = !!prev.find((item) => item.id === movie.id);
      if (isInWatchlist) {
        return prev.filter((item) => item.id !== movie.id);
      } else {
        return [...prev, movie];
      }
    });
  }, []);

  const isInWatchlist = useCallback((movieId: number) => {
    return !!watchlist.find((movie) => movie.id === movieId);
  }, [watchlist]);

  return { watchlist, toggleWatchlist, isInWatchlist, isLoaded };
}
