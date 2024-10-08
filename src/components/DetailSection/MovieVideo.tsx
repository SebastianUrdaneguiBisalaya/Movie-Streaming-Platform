import { useState, useEffect } from "react"

export const MovieVideo = ({id, title}:{id: number, title: string}) => {
    const [video, setVideo] = useState<string>("");
    useEffect(() => {
        const fetchVideo = async () => {
            const url = title != "" ? `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US` : `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`
            const response = await fetch(url, {
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
            setVideo(data.results[data.results.length - 1]?.key);
        }

        fetchVideo();
    }, [id, title]);

  return (
    <div className="movieVideo__container">
        {
            video !== "" && (
                <iframe
              src={`https://www.youtube.com/embed/${video}?autoplay=1&mute=1&loop=1&playlist=${video}`}
              className="video-player"
              allow="autoplay; encrypted-media"
              frameBorder="0"
              allowFullScreen
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            )
        }
    </div>
  )
}