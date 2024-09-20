import { RenderReleases } from "../../utils/renderReleases"
import { useState, useEffect } from "react"
import { type DataItem } from "../../types/types";

export const NewReleaseMovies = () => {
    const [data, setData] = useState<DataItem[]>([]);
    useEffect(() => {
        const getMoviesNewRelease = async () => {
            const response = await fetch("https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=27", {
                method: "GET",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN_READ}`,
                },
            })
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const dataMovies = await response.json();
            setData(dataMovies.results)
        }
        getMoviesNewRelease()
    }, [])

    return (
        <RenderReleases title="New Release - Movies" data={data} onClick={() => console.log("Hello World")} />
    )
}
