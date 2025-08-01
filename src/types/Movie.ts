export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  original_title: string;
  popularity: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface TMDBResponse {
  page: number;
  results: Movie[];
  total_results: number;
  total_pages: number;
}