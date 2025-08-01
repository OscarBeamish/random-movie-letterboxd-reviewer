import React, { useState, useEffect } from 'react';
import { Genre } from '../types/Movie';
import { movieService } from '../services/movieService';
import SearchIcon from '@mui/icons-material/Search';
import './MovieFilters.css';

interface MovieFiltersProps {
  onFiltersChange: (filters: {
    year?: number;
    genre?: number;
    sortBy?: string;
  }) => void;
}

const MovieFilters: React.FC<MovieFiltersProps> = ({ onFiltersChange }) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | undefined>();
  const [selectedYear, setSelectedYear] = useState<number | undefined>();
  const [selectedSort, setSelectedSort] = useState<string>('random');

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const response = await movieService.getGenres();
        setGenres(response.genres);
      } catch (error) {
        console.error('Failed to load genres:', error);
      }
    };

    loadGenres();
  }, []);

  useEffect(() => {
    onFiltersChange({
      year: selectedYear,
      genre: selectedGenre,
      sortBy: selectedSort,
    });
  }, [selectedYear, selectedGenre, selectedSort, onFiltersChange]);

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedGenre(value ? parseInt(value) : undefined);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedYear(value ? parseInt(value) : undefined);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSort(e.target.value);
  };

  const clearFilters = () => {
    setSelectedGenre(undefined);
    setSelectedYear(undefined);
    setSelectedSort('random');
  };

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= 1950; year--) {
      years.push(year);
    }
    return years;
  };

  const sortOptions = [
    { value: 'random', label: 'Random' },
    { value: 'popularity.desc', label: 'Most Popular' },
    { value: 'popularity.asc', label: 'Least Popular' },
    { value: 'release_date.desc', label: 'Newest First' },
    { value: 'release_date.asc', label: 'Oldest First' },
    { value: 'vote_average.desc', label: 'Highest Rated' },
    { value: 'vote_average.asc', label: 'Lowest Rated' },
    { value: 'vote_count.desc', label: 'Most Reviewed' },
  ];

  return (
    <div className="movie-filters">
      <div className="filters-container">
        <div className="filters-grid">
          <div className="filter-group">
            <label htmlFor="genre-select">Genre</label>
            <select
              id="genre-select"
              value={selectedGenre || ''}
              onChange={handleGenreChange}
            >
              <option value="">All Genres</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="year-select">Release Year</label>
            <select
              id="year-select"
              value={selectedYear || ''}
              onChange={handleYearChange}
            >
              <option value="">All Years</option>
              {generateYearOptions().map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="sort-select">Sort By</label>
            <select
              id="sort-select"
              value={selectedSort}
              onChange={handleSortChange}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-actions">
            <button 
              className="clear-filters-btn"
              onClick={clearFilters}
              disabled={!selectedGenre && !selectedYear && selectedSort === 'random'}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieFilters;