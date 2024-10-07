import { useEffect, useState } from "react";
import { type PropCard } from "../../types/types";
import { Link } from "react-router-dom";
import { get } from "../../services";
import { MovieVideoResponse } from "../../types/types";

export const CardMovie = ({
  id,
  title,
  name,
  poster_path,
  vote_average,
  episode,
}: PropCard): JSX.Element => {
  const [isHovered, setIsHovered] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        if (isHovered && !videoUrl) {
          const urlToSearch = title !== "" ? `movie/${id}/videos?language=en-US` : `tv/${id}/videos?language=en-US`;
          const dataResult = await get<MovieVideoResponse>(urlToSearch);
          if (dataResult.results.length > 0) {
            const videoObj = dataResult.results[0];
            setVideoUrl(`https://www.youtube.com/embed/${videoObj.key}?autoplay=1&mute=1&loop=1&playlist=${videoObj.key}`);
          }
        }
      } catch (error) {
        console.error(`Error fetching video: ${error}`);
      }
    };

    fetchData();
  }, [isHovered, videoUrl, id, title]);

  const handleMouseEnter = (): void => {
    setIsHovered(true);
  };

  const handleMouseLeave = (): void => {
    setIsHovered(false);
    setVideoUrl(null);
  };

  return (
    <div
      className="cardModelBasicMovie__containerCard"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={episode ? "cardModelBasicSeries" : "cardModelBasicMovie"}
      >
        <div className="cardModelBasicMovie__media">
          {isHovered && videoUrl ? (
            <iframe
              src={videoUrl}
              className="video-player"
              allow="autoplay; encrypted-media"
              frameBorder="0"
              allowFullScreen
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <img
              src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
              className={episode ? "cardSeries" : ""}
              alt="Poster Path of Movie"
            />
          )}

          {!isHovered && (
            <button className="playButton" onClick={() => setIsHovered(true)}>
              ▶️
            </button>
          )}
        </div>

        {episode && (
          <div className="cardModelBasicMovie__detailEpisode">
            <p>{episode}</p>
          </div>
        )}
      </div>

      <Link 
      to={`/detail/${id}?title=${encodeURIComponent(title || "")}`}
      className="cardModelBasicMovie__detail">
        <h5>{title ? title : name}</h5>
        <div className="cardModelBasicMovie__moreDetail">
          <p className="cardModelBasicMovie__detailHD">HD</p>
          <p>
            <span className="cardModelBasicMovie__detailVote">
              <svg
                width="12"
                height="12"
                viewBox="0 0 18 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.93384 12.8589L14.1868 16L12.7928 10.08L17.4338 6.09684L11.3223 5.57474L8.93384 0L6.54534 5.57474L0.433838 6.09684L5.06634 10.08L3.68084 16L8.93384 12.8589Z"
                  fill="white"
                />
              </svg>
            </span>
            {vote_average.toFixed(1)}
          </p>
        </div>
      </Link>
    </div>
  );
};
