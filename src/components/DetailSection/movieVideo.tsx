import { useState, useEffect } from "react"

export const MovieVideo = ({id}:{id: number}) => {
    const [video, setVideo] = useState<string>("");
    useEffect(() => {
        const fetchVideo = async () => {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, {
                method: "GET",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN_READ}`,
                },
            })
            if (!response.ok) {
                throw new Error("Failed to fetch data")
            }
            const data = await response.json()
            setVideo(data.results[data.results.length - 1].key);
        }

        fetchVideo();
    }, [id]);

  return (
    <div className="movieVideo__container">
        <lite-youtube videoid={video} ></lite-youtube>
    </div>
  )
}