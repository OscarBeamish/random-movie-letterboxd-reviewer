import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Movie } from '../types/Movie';
import { movieService } from '../services/movieService';
import MovieCard from './MovieCard';
import './MovieList.css';

interface MovieListProps {
  filters?: {
    year?: number;
    genre?: number;
    sortBy?: string;
  };
}

const MovieList: React.FC<MovieListProps> = ({ filters = {} }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

  const loadMovies = useCallback(async (pageNum: number = 1, resetList: boolean = false) => {
    try {
      setLoading(true);
      setError(null);

      const response = await movieService.getDiscoverMovies({
        page: pageNum,
        ...filters,
      });

      if (resetList) {
        setMovies(response.results);
      } else {
        setMovies(prev => [...prev, ...response.results]);
      }

      setHasMore(pageNum < response.total_pages);
      setPage(pageNum);
    } catch (err) {
      setError('Failed to load movies. Please try again.');
      console.error('Error loading movies:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadMovies(1, true);
  }, [loadMovies]);

  const lastMovieElementRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMovies(page + 1, false);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore, page, loadMovies]);

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button 
          className="retry-button" 
          onClick={() => loadMovies(1, true)}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="movie-list-container">
      <div className="movie-grid">
        {movies.map((movie, index) => {
          if (movies.length === index + 1) {
            return <MovieCard ref={lastMovieElementRef} key={`${movie.id}-${index}`} movie={movie} />;
          } else {
            return <MovieCard key={`${movie.id}-${index}`} movie={movie} />;
          }
        })}
      </div>

      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading amazing movies...</p>
        </div>
      )}

      {!loading && movies.length === 0 && (
        <div className="empty-state">
          <p>No movies found with the current filters.</p>
          <p>Try adjusting your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default MovieList;