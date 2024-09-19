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
    vote_count: number
}

export type Series = {
    name: string;
    overview: string;
    poster_path: string;
    first_air_date: string;
}