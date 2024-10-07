import { debounceInfiniteScroll, get } from "../../services"
import { useState, useEffect, useRef } from "react"
import { Movie, MovieApiResponse } from "../../types/types"
import { CardMovie } from "../mainSection/tCardMovie"

export const AnimationsComponent = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const fetchData = async (page: number): Promise<void> => {
    try {
      setIsFetching(true);
      const data = await get<MovieApiResponse>(`discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=16`);
      setMovies(prevMovies => page === 1 ? data.results : [...prevMovies, ...data.results]);
      setIsFetching(false);
    } catch (error) {
      throw new Error(`Animations are incorrect ${error}`)
    }
  }

  useEffect(() => {
    fetchData(page)
  }, [page])

  useEffect(() => {
    const handleScroll = () => {
      debounceInfiniteScroll({debounceTimeout, isFetching, setPage})
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isFetching])

  return (
    <div className="section__viewForKindOfMovies">
      <div className="container__viewForKindOfMovies">
        <h2>Animations</h2>
        <div className="grid__movies">
          {
            movies.map((movie) => (
              <div className="card__container" key={movie.id}>
                <CardMovie
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  vote_average={movie.vote_average}
                  poster_path={movie.poster_path}
                />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
