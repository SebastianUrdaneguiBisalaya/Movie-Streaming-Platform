import { CardTrending } from "./cardTrending";
import { ButtonViewAll } from "../../utils/buttonViewAll";
import type { Movie, MoviesTrending } from "../../types/types";
import { useState, useEffect } from "react";
import { getGenreNameById } from "../../utils/getGenreByName";

export const Trending = (): JSX.Element => {
  const [data, setData] = useState<MoviesTrending[]>([]);

  useEffect(() => {
    const getMoviesTrending = async () => {
      try {
        const getMoviesTrending = await fetch(
          "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN_READ}`,
            },
          }
        );
        if (!getMoviesTrending.ok) {
          throw new Error("Problems with API");
        }
        const dataMoviesTrending = await getMoviesTrending.json();

        const getListGenreOfMovies = await fetch(
          "https://api.themoviedb.org/3/genre/movie/list?language=en",
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN_READ}`,
            },
          }
        );
        if (!getListGenreOfMovies.ok) {
          throw new Error("Problems with API");
        }
        const dataListGenre = await getListGenreOfMovies.json();

        const moviesWithGenres = dataMoviesTrending.results.map(
          (item: Movie) => {
            return {
              ...item,
              genres: item.genre_ids.map((id) =>
                getGenreNameById(id, dataListGenre.genres)
              ),
            };
          }
        );
        setData(moviesWithGenres.slice(0, 3));
      } catch (error) {
        console.error(error);
      }
    };

    getMoviesTrending();
  }, []);
  return (
    <section className="movie__trending">
      {data.length > 0 && (
        <div className="trending__container">
          <div className="trending__containerTitle">
            <h2>Trending</h2>
            <ButtonViewAll
              onClick={() => {
                console.log("Hello World");
              }}
            />
          </div>
          <div className="trending__containerMovies">
            {data.map((item, index) => (
              <CardTrending
                key={index}
                name={item.title}
                tags={item.genres}
                poster_path={item.poster_path}
                first_air_date={item.release_date}
                vote_average={item.vote_average}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
