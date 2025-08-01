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
    sort_by?: string;
  } = {}): Promise<TMDBResponse> {
    const { page = 1, year, genre, sort_by = 'popularity.desc' } = params;
    
    const queryParams = new URLSearchParams({
      api_key: TMDB_API_KEY,
      page: page.toString(),
      sort_by,
    });

    if (year) queryParams.append('year', year.toString());
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
      .trim();
    
    const year = new Date(movie.release_date).getFullYear();
    return `https://letterboxd.com/film/${cleanTitle}-${year}/`;
  }
};