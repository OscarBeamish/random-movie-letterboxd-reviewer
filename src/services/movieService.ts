import { Movie, TMDBResponse, Genre } from '../types/Movie';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = '4e44d9029b1270a757cddc766a1bcb63'; // Free API key
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export const movieService = {
  async getPopularMovies(page: number = 1): Promise<TMDBResponse> {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=${page}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch popular movies');
    }
    return response.json();
  },

  async getDiscoverMovies(params: {
    page?: number;
    year?: number;
    genre?: number;
    sortBy?: string;
  } = {}): Promise<TMDBResponse> {
    const { page = 1, year, genre, sortBy = 'random' } = params;
    
    let actualSortBy = sortBy;
    let actualPage = page;
    
    // Handle random sorting by using a random page with popularity sort
    if (sortBy === 'random') {
      actualSortBy = 'popularity.desc';
      actualPage = page === 1 ? Math.floor(Math.random() * 500) + 1 : page;
    }
    
    const queryParams = new URLSearchParams({
      api_key: TMDB_API_KEY,
      page: actualPage.toString(),
      sort_by: actualSortBy,
    });

    if (year) queryParams.append('primary_release_year', year.toString());
    if (genre) queryParams.append('with_genres', genre.toString());

    const response = await fetch(
      `${TMDB_BASE_URL}/discover/movie?${queryParams}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }
    return response.json();
  },

  async getGenres(): Promise<{ genres: Genre[] }> {
    const response = await fetch(
      `${TMDB_BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch genres');
    }
    return response.json();
  },

  getImageUrl(path: string | null): string {
    if (!path) return '/placeholder-movie.jpg';
    return `${TMDB_IMAGE_BASE_URL}${path}`;
  },

  getLetterboxdUrl(movie: Movie): string {
    // Convert movie title to letterboxd-friendly URL format
    const cleanTitle = movie.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '')
      .trim();
    
    // Most movies on Letterboxd don't have year suffixes
    // Only movies with the same title use year to differentiate
    // Add /review/ to go directly to the review page
    return `https://letterboxd.com/film/${cleanTitle}/review/`;
  }
};