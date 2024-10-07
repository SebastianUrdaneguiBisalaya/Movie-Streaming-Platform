import { debounceInfiniteScroll, get } from "../../services"
import { useState, useEffect, useRef } from "react"
import { PropCard, SeriesApiResponse } from "../../types/types"
import { CardMovie } from "../mainSection/CardMovie"

export const SeriesComponent = () => {
  const [series, setSeries] = useState<PropCard[]>([])
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const fetchData = async (page: number): Promise<void> => {
    try {
      setIsFetching(true);
      const data = await get<SeriesApiResponse>(`discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=10759`);
      setSeries(prevSeries => page === 1 ? data.results : [...prevSeries, ...data.results]);
      setIsFetching(false);
      console.log(data.results)
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
        <h2>Series</h2>
        <div className="grid__movies">
          {
            series.map((serie) => (
              <div className="card__container" key={serie.id}>
                <CardMovie
                  key={serie.id}
                  id={serie.id}
                  name={serie.name}
                  vote_average={serie.vote_average}
                  poster_path={serie.poster_path}
                  episode="EP. 1"
                />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
