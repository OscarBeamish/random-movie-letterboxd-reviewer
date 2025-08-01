import React, { useState, useEffect, useCallback } from 'react';
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

  const loadMoreMovies = () => {
    if (!loading && hasMore) {
      loadMovies(page + 1, false);
    }
  };

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
        {movies.map((movie) => (
          <MovieCard key={`${movie.id}-${page}`} movie={movie} />
        ))}
      </div>

      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading amazing movies...</p>
        </div>
      )}

      {!loading && hasMore && movies.length > 0 && (
        <div className="load-more-container">
          <button 
            className="load-more-button" 
            onClick={loadMoreMovies}
          >
            Load More Movies
          </button>
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