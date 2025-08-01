import React, { useState } from 'react';
import { Movie } from '../types/Movie';
import { movieService } from '../services/movieService';
import './MovieCard.css';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const [imageError, setImageError] = useState(false);

  const handleClick = () => {
    const letterboxdUrl = movieService.getLetterboxdUrl(movie);
    window.open(letterboxdUrl, '_blank');
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="movie-card" onClick={handleClick}>
      <div className="movie-poster">
        {!imageError && movie.poster_path ? (
          <img
            src={movieService.getImageUrl(movie.poster_path)}
            alt={movie.title}
            loading="lazy"
            onError={handleImageError}
          />
        ) : (
          <div className="poster-placeholder">
            <div className="placeholder-icon">🎬</div>
            <div className="placeholder-text">No Poster</div>
          </div>
        )}
        <div className="movie-overlay">
          <div className="movie-rating">
            ⭐ {movie.vote_average.toFixed(1)}
          </div>
        </div>
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-year">
          {new Date(movie.release_date).getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;