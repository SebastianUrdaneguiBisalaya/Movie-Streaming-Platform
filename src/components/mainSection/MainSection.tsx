import { useState, useEffect } from "react";
import {
  CarrouselMain,
  RecentlyUpdated,
  Trending,
  NewReleaseMovies,
  NewReleaseSeries,
  TabRecommended,
} from "./index";
import type { Movie, Movies, Serie, MoviesTrending, 
              DataItem, MovieApiResponse, GenresResponse, SeriesApiResponse} from "../../types/types";
import { getGenreNameById } from "../../utils/getGenreByName";
import { get } from "../../services/get";

export const MainSection = (): JSX.Element => {
  const [movies, setMovies] = useState<Movies[]>([]);
  const [recentlyUpdated, setRecentlyUpdated] = useState<Serie[]>([]);
  const [moviesTrending, setMoviesTrending] = useState<MoviesTrending[]>([]);
  const [newReleasesMovies, setNewReleasesMovies] = useState<Movie[]>([]);
  const [newReleasesSeries, setNewReleasesSeries] = useState<Serie[]>([]);
  const [recommended, setRecommended] = useState<DataItem[]>([]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
            const [moviesMorePopularResponse, genreMoviesResponse, moviesRecentlyUpdatedResponse, 
                moviesTrendingResponse, newReleasesMoviesResponse, newReleasesSeriesResponse, moviesRecommendedResponse, seriesRecommendedResponse, animationsRecommendedResponse] =
              await Promise.allSettled([
                get<MovieApiResponse>("/movie/popular?language=en-US&page=1"),
                get<GenresResponse>("/genre/movie/list?language=en"),
                get<SeriesApiResponse>("/tv/on_the_air?language=en-US&page=1"),
                get<MovieApiResponse>("/trending/movie/day?language=en-US"),
                get<MovieApiResponse>("/trending/movie/day?language=en-US"),
                get<SeriesApiResponse>("/tv/popular?language=en-US&page=1"),
                get<MovieApiResponse>("/movie/upcoming?language=en-US&page=1"),
                get<SeriesApiResponse>("/tv/top_rated?language=en-US&page=1"),
                get<MovieApiResponse>("/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=16"),
              ]);

        if (moviesMorePopularResponse.status === "fulfilled" && moviesRecentlyUpdatedResponse.status === "fulfilled" && 
            genreMoviesResponse.status === "fulfilled" && moviesTrendingResponse.status === "fulfilled" && 
            newReleasesMoviesResponse.status === "fulfilled" && newReleasesSeriesResponse.status === "fulfilled" &&
            moviesRecommendedResponse.status === "fulfilled" && seriesRecommendedResponse.status === "fulfilled" && 
            animationsRecommendedResponse.status === "fulfilled") {

            const moviesMorePopularData = moviesMorePopularResponse.value;
            const genreMoviesResponseData = genreMoviesResponse.value;
            const moviesRecentlyUpdatedData = moviesRecentlyUpdatedResponse.value;
            const moviesTrendingData = moviesTrendingResponse.value;
            const newReleaseMoviesData= newReleasesMoviesResponse.value;
            const newReleasesSeriesData = newReleasesSeriesResponse.value;
            const moviesRecommendedData = moviesRecommendedResponse.value;
            const seriesRecommendedData = seriesRecommendedResponse.value;
            const animationsRecommendedData = animationsRecommendedResponse.value;

            const moviesRecommendedTransformed: DataItem[] = moviesRecommendedData.results.map(
                (item: Movie) => ({
                  id: item.id,
                  title: item.title,
                  vote_average: item.vote_average,
                  category: "Movies",
                  poster_path: item.poster_path,
                })
              );
            const seriesRecommendedTransformed: DataItem[] = seriesRecommendedData.results.map(
                (item: Serie) => ({
                  id: item.id,
                  vote_average: item.vote_average,
                  poster_path: item.poster_path,
                  name: item.name,
                  category: "Series",
                  episode: "EP. 1",
                })
              );
            const animationsRecommendedTransformed: DataItem[] = animationsRecommendedData.results.map(
                (item: Movie) => ({
                  id: item.id,
                  title: item.title,
                  vote_average: item.vote_average,
                  poster_path: item.poster_path,
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