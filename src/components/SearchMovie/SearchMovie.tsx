import { useEffect, useState } from "react"
import { type PropCard } from "../../types/types";
import { CardMovie } from "../mainSection/CardMovie";
import { useSearchMovie } from "../../hooks/useSearchMovie";

export const SearchMovies = (): JSX.Element => {
    const [movies, setMovies] = useState<PropCard[]>([]);
    const {searchQuery} = useSearchMovie()
    const chunkSize = 4;

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
                const moviesMorePopularResponse =await fetch(
                        `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1`,
                        {
                          method: "GET",
                          headers: {
                            accept: "application/json",
                            Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN_READ}`,
                          },
                        }
                );
                const result = await moviesMorePopularResponse.json();
                setMovies(result.results)
        }
        fetchData();
      }, [searchQuery]);

      if (movies.length === 0) {
        return <p>Loading movies...</p>;
      }
    
      const movieChunks = [];
      for (let i = 0; i < movies.length; i += chunkSize) {
        movieChunks.push(movies.slice(i, i + chunkSize));
      }
  return (
    <section className="section__searchMovie">
        <div className="search__container">
            <h2 style={{textAlign: "left"}}>Search Results</h2>
        {
          movieChunks?.map((chunk, index) => (
            <div key={index} className="movies__group" style={{display: 'flex', justifyContent: "space-between"}}>
              {chunk.map((item) => (
                <CardMovie
                  id={item.id}
                  key={item.id}
                  title={item.title}
                  poster_path={item.poster_path}
                  vote_average={item.vote_average}
                />
              ))}
            </div>
          ))
        }
        </div>
    </section>
  )
}