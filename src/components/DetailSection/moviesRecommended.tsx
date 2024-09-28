import { Movie } from "../../types/types"
import { useState, useEffect } from "react"
import { CardMovie } from "../mainSection/cardMovie"

export const MoviesRecommended = ({id}:{id: number}) => {
  const [moviesRecommended, setMoviesRecommended] = useState<Movie[]>([])

  useEffect(() => {
    const fetchMoviesRecommended = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`, 
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN_READ}`,
          },
        }
      )
      if (!response.ok) {
        throw new Error("Failed to fetch data")
      }
      const data = await response.json()
      setMoviesRecommended(data.results.slice(0,8))
    }

    fetchMoviesRecommended()
  }, [id])

  return (
    <div className="moviesToRecommend">
      <h2 className="titleSectionMovieRecommended">You may also like</h2>
      <div className="moviesToRecommend__container">
        {moviesRecommended.slice(0,4).map((item) => (
          <CardMovie 
          id={item.id}
          key={item.id}
          title={item.title}
          name={item.original_title}
          poster_path={item.poster_path}
          vote_average={item.vote_average}
          />
        ))}
      </div>
      <div className="moviesToRecommend__container">
        {moviesRecommended.slice(4,8).map((item) => (
          <CardMovie 
          id={item.id}
          key={item.id}
          title={item.title}
          name={item.original_title}
          poster_path={item.poster_path}
          vote_average={item.vote_average}
          />
        ))}
      </div>
    </div>
  )
}
