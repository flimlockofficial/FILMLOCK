
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
        id: 6,
        title: "Jurassic World: Rebirth",
        category: "hollywood",
        posterUrl: "https://bollyflixcdn.lol/wp-content/uploads/2025/07/Jurassic-World-Rebirth-2025.jpg",
        language: "Dual Audio [Hindi-English]",
        year: 2025,
        size: "520MB | 940MB | 1.3GB | 2.4GB | 3GB | 7.4GB | 10.5GB | 16GB",
        quality: "1080p",
        genres: ["Action", "Adventure", "Sci-Fi"],
        cast: ["Scarlett Johansson", "Mahershala Ali", "Jonathan Bailey"],
        subtitle: "English",
        storyline: "Five years post-Jurassic World: Dominion (2022), an expedition braves isolated equatorial regions to extract DNA from three massive prehistoric creatures for a groundbreaking medical breakthrough.",
        trailerUrl: "https://www.youtube.com/embed/jan5CFWs9ic",
        movieUrl: "https://linkpays.in/Jurassicworld"
    },
    {
        id: 5,
        title: "Young Millionaires",
        category: "hollywood",
        language: "Multi Audio [Hindi-English-French]",
        year: "2025–",
        size: "120MB | 200MB | 330MB | 920MB",
        quality: "1080p",
        genres: ["Drama"],
        cast: ["Abraham Wapler", "Malou Khebizi", "Calixte Broisin-Doutaz"],
        subtitle: "MSubs",
        storyline: "Friday the 13th in Marseille, childhood friends Samia, Léo, David and Jess hit the lottery jackpot. But at 17, it’s impossible to cash the ticket… the first problem of a long series, because hitting the jackpot at this age opens the door to an avalanche of problems. Because you can’t be serious when you’re 17 with 17 million!!",
        posterUrl: "https://bollyflixcdn.lol/wp-content/uploads/2025/08/Young-Millionaires-WEB-Series.jpg",
        trailerUrl: "https://www.youtube.com/embed/8JZcNEZQWQI",
        movieUrl: "https://linkpays.in/young-milloners"
    },
    {
        id: 4,
        title: "M3GAN 2.0",
        category: "hollywood",
        posterUrl: "https://bollyflixcdn.lol/wp-content/uploads/2025/08/M3GAN-2-0-2025-UNRATED-Hindi-English-Movie.jpg",
        trailerUrl: "https://www.youtube.com/embed/IYLHdEzsk1s",
        language: "Dual Audio [Hindi-English]",
        year: 2025,
        size: "480MB | 840MB | 1.2GB | 2.1GB | 2.8GB | 8.1GB",
        quality: "1080p",
        genres: ["Action", "Horror", "Sci-Fi"],
        cast: ["Allison Williams", "Violet McGraw", "Amie Donald"],
        subtitle: "English",
        storyline: "Two years after M3GAN’s rampage, her creator, Gemma, resorts to resurrecting her infamous creation in order to take down Amelia, the military-grade weapon who was built by a defense contractor who stole M3GAN’s underlying tech."
    },
    {
        id: 3,
        title: "Even Given the Worthless “Appraiser” Class, I’m Actually the Strongest (Season 1)",
        category: "anime",
        trailerUrl: "https://www.youtube.com/embed/G5BdKi-xkP0",
        posterUrl: "https://bollyflixcdn.lol/wp-content/uploads/2025/06/Download-Even-Given-the-Worthless-Appraiser-Class-Im-Actually-the-Strongest.jpg",
        language: "Dual Audio {Hindi-Japanese}",
        year: "2025–",
        quality: "1080p",
        size: "85MB | 150MB | 230MB | 490MB",
        genres: ["Animation", "Fantasy"],
        cast: ["Kana Ichinose", "Yû Serizawa", "Sayumi Suzushiro"],
        subtitle: "English",
        storyline: "Born with the job of an “appraiser,” Ein will go on to show the strength of his weak skill!."
    },
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
        movieUrl: "https://linkpays.in/THERAN",
        posterUrl: "https://bollyflixcdn.lol/wp-content/uploads/2025/08/Tehran-2025.jpg"
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
    quality: "1080p",
    genres: ["Crime", "Thriller"],
    cast: ["Sarath Kumar", "Sija Rose", "Iniya"],
    subtitle: "English",
    storyline: "A Cop with Alzheimer’s disease, set to solve the case of a serial killer on the run,before he loses his memory",
    posterUrl: "https://bollyflixcdn.lol/wp-content/uploads/2025/08/The-Smile-Man-2024.jpg"
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
          console.error("Update movies in localStorage failed", error);
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
