import { useState, useEffect } from "react";
import {
  CarrouselMain,
  RecentlyUpdated,
  Trending,
  NewReleaseMovies,
  NewReleaseSeries,
  TabRecommended,
} from "./index";
import type { Movie, Movies, Serie, MoviesTrending, DataItem } from "../../types/types";
import { getGenreNameById } from "../../utils/getGenreByName";

export const MainSection = (): JSX.Element => {
  const [movies, setMovies] = useState<Movies[]>([]);
  const [recentlyUpdated, setRecentlyUpdated] = useState<Serie[]>([]);
  const [moviesTrending, setMoviesTrending] = useState<MoviesTrending[]>([]);
  const [newReleasesMovies, setNewReleasesMovies] = useState<DataItem[]>([]);
  const [newReleasesSeries, setNewReleasesSeries] = useState<DataItem[]>([]);
  const [recommended, setRecommended] = useState<DataItem[]>([]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
            const [moviesMorePopularResponse, genreMoviesResponse, moviesRecentlyUpdatedResponse, 
                moviesTrendingResponse, newReleasesMoviesResponse, newReleasesSeriesResponse, moviesRecommendedResponse, seriesRecommendedResponse, animationsRecommendedResponse] =
              await Promise.allSettled([
                fetch(
                  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
                  {
                    method: "GET",
                    headers: {
                      accept: "application/json",
                      Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN_READ}`,
                    },
                  }
                ),
                fetch(
                  "https://api.themoviedb.org/3/genre/movie/list?language=en",
                  {
                    method: "GET",
                    headers: {
                      accept: "application/json",
                      Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN_READ}`,
                    },
                  }
                ),
                fetch(
                  "https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1",
                  {
                    method: "GET",
                    headers: {
                      accept: "application/json",
                      Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN_READ}`,
                    },
                  }
                ),
                fetch(
                    "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
                    {
                      method: "GET",
                      headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN_READ}`,
                      },
                    }
                  ),
                  fetch(
                    "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
                    {
                      method: "GET",
                      headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN_READ}`,
                      },
                    }
                  ),
                  fetch(
                    "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
                    {
                      method: "GET",
                      headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN_READ}`,
                      },
                    }
                  ),
                  fetch(
                    "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
                    {
                      method: "GET",
                      headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN_READ}`,
                      },
                    }
                  ),
                  fetch(
                    "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1",
                    {
                      method: "GET",
                      headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN_READ}`,
                      },
                    }
                  ),
                  fetch(
                    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=16",
                    {
                      method: "GET",
                      headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN_READ}`,
                      },
                    }
                  ),
              ]);
        if (moviesMorePopularResponse.status === "fulfilled" && moviesRecentlyUpdatedResponse.status === "fulfilled" && 
            genreMoviesResponse.status === "fulfilled" && moviesTrendingResponse.status === "fulfilled" && 
            newReleasesMoviesResponse.status === "fulfilled" && newReleasesSeriesResponse.status === "fulfilled" &&
            moviesRecommendedResponse.status === "fulfilled" && seriesRecommendedResponse.status === "fulfilled" && 
            animationsRecommendedResponse.status === "fulfilled") {

            const moviesMorePopularData = await moviesMorePopularResponse.value.json();
            const genreMoviesResponseData = await genreMoviesResponse.value.json();
            const moviesRecentlyUpdatedData = await moviesRecentlyUpdatedResponse.value.json();
            const moviesTrendingData = await moviesTrendingResponse.value.json();
            const newReleaseMoviesData = await newReleasesMoviesResponse.value.json();
            const newReleasesSeriesData = await newReleasesSeriesResponse.value.json();
            const moviesRecommendedData = await moviesRecommendedResponse.value.json();
            const seriesRecommendedData = await seriesRecommendedResponse.value.json();
            const animationsRecommendedData = await animationsRecommendedResponse.value.json();

            const moviesRecommendedTransformed = moviesRecommendedData.results.map(
                (item: DataItem) => ({
                  ...item,
                  category: "Movies",
                })
              );
            const seriesRecommendedTransformed = seriesRecommendedData.results.map(
                (item: DataItem) => ({
                  ...item,
                  category: "Series",
                  episode: "EP. 1",
                })
              );
            const animationsRecommendedTransformed = animationsRecommendedData.results.map(
                (item: DataItem) => ({
                  ...item,
                  category: "Animation",
                })
              );

            const allRecommended = [...moviesRecommendedTransformed, ...seriesRecommendedTransformed, ...animationsRecommendedTransformed];

            const moviesWithGenres = moviesMorePopularData.results.map(
                (item: Movie) => {
                    return {
                    ...item,
                    genres: item.genre_ids.map((id) =>
                        getGenreNameById(id, genreMoviesResponseData.genres)
                    ),
                    };
                }
                );
            const moviesTrendingWithGenres = moviesTrendingData.results.map(
                (item: Movie) => {
                return {
                    ...item,
                    genres: item.genre_ids.map((id) =>
                    getGenreNameById(id, genreMoviesResponseData.genres)
                    ),
                };
                }
            );
            setMovies(moviesWithGenres.slice(0, 5));
            setRecentlyUpdated(moviesRecentlyUpdatedData.results.slice(0, 10));
            setMoviesTrending(moviesTrendingWithGenres.slice(0, 3));
            setNewReleasesMovies(newReleaseMoviesData.results);
            setNewReleasesSeries(newReleasesSeriesData.results)
            setRecommended(allRecommended)
            }
        }
    fetchData();
  }, []);

  return (
    <>
      <CarrouselMain movies={movies} />
      <RecentlyUpdated recentlyUpdated={recentlyUpdated} />
      <Trending moviesTrending={moviesTrending}/>
      <NewReleaseMovies newReleasesMovies={newReleasesMovies}/>
      <NewReleaseSeries newReleasesSeries={newReleasesSeries}/>
      <TabRecommended allRecommended={recommended}/>
    </>
  );
};
