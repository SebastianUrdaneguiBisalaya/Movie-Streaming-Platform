export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type MovieApiResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type Movies = {
  genres: string[];
  id: number;
  overview: string;
  release_date: string;
  title: string;
  vote_average: number;
  backdrop_path: string;
};

export type Serie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
};

export type Series = {
  id: number
  name: string;
  overview: string;
  poster_path: string;
  first_air_date: string;
};

export type SeriesApiResponse = {
  page: number;
  results: Serie[];
  total_pages: number;
  total_results: number;
};

export type PropsCardTrending = {
  id: number;
  name: string;
  tags: string[];
  poster_path: string;
  first_air_date: string;
  vote_average: number;
};

export type MoviesTrending = {
  genres: string[];
  id: number;
  release_date: string;
  title: string;
  vote_average: number;
  poster_path: string;
};

export type Genres = {
  id: number;
  name: string;
};

export type GenresResponse = {
  page: number;
  genres: Genres[];
  total_pages: number;
  total_results: number;
}


export type PropCard = {
  id?: number;
  title?: string;
  poster_path: string;
  vote_average: number;
  episode?: string;
  name?: string;
};

export type PropReleases = {
  title: string;
  data: PropCard[];
  onClick: () => void;
};

export interface DataItem {
  id: number;
  title?: string;
  vote_average: number;
  category: string;
  poster_path: string;
  name?: string;
  episode?: string;
}

export interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export type MovieGenreDetail = {
  id: number;
  name: string
}

export type MovieProductionCountryDetail = {
  iso_3166_1: string;
  name: string;
}

export type CreditsCastMovie = {
  adult: boolean,
  gender: number,
  id: number,
  known_for_department: string,
  name: string,
  original_name: string,
  popularity: number,
  profile_path: string,
  cast_id: number,
  character: string,
  credit_id: string,
  order: number
}

export type MovieDetailType = {
  id: number;
  title: string;
  overview: string;
  vote_average: number;
  release_date: string;
  genres: MovieGenreDetail[];
  poster_path: string;
  production_countries: MovieProductionCountryDetail[];
  credits: CreditsCastMovie[];
}

export type MovieComment = {
  author: string,
  author_details: {
    name: string,
    username: string,
    avatar_path: null,
    rating: number
  },
  content: string,
  created_at: string,
  id: string,
  updated_at: string,
  url: string
}
