import { useEffect, useState } from "react";
import { Carrousel } from "./carrousel";
import type { Movie, Movies } from "../../types/types";
import { getGenreNameById } from "../../utils/getGenreByName";

export const CarrouselMain = () => {
    const [movies, setMovies] = useState<Movies[]>([]);
    
    useEffect(() => {
        const getMoviesMorePopular = async() => {
            try {
                const getMovieMorePopulate = await fetch("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
                    {
                        method: "GET",
                        headers: {
                            accept: 'application/json',
                            Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN_READ}`
                        }
                    }
                )
                if (!getMovieMorePopulate.ok) {
                    throw new Error("Problems with API")
                }
                const dataMovieMorePopulate = await getMovieMorePopulate.json();

                const getListGenreOfMovies = await fetch("https://api.themoviedb.org/3/genre/movie/list?language=en",
                    {
                        method: "GET",
                        headers: {
                            accept: "application/json",
                            Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN_READ}`
                        }
                    }
                )
                if (!getListGenreOfMovies.ok) {
                    throw new Error("Problems with API");
                }
                const dataListGenre = await getListGenreOfMovies.json();

                const moviesWithGenres = dataMovieMorePopulate.results.map((item: Movie) => {
                    return {
                        ...item,
                        genres: item.genre_ids.map(id => getGenreNameById(id, dataListGenre.genres))
                    };
                });
                setMovies(moviesWithGenres.slice(0, 5));
            } catch(error) {
                console.error(error);
            }
        }

        getMoviesMorePopular();
    }, [])
    return (
        movies.length > 0 && (<Carrousel movies={movies} interval={15000}/>)   
    )
}