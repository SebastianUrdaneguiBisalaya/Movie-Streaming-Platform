import { type PropCard } from "../../types/types";
import { Link } from "react-router-dom";
import { LazyImage } from "../../utils/LazyImage";

export const CardMovie = ({
  id,
  title,
  name,
  poster_path,
  vote_average,
  episode,
}: PropCard) : JSX.Element => {
  return (
    <div className="cardModelBasicMovie__containerCard">
      <Link to={`/detail/${id}`}
        className={episode ? "cardModelBasicSeries" : "cardModelBasicMovie"}
      >
        <LazyImage
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt=""
          className={episode ? "cardSeries" : ""}
        />
        {episode && (
          <div className="cardModelBasicMovie__detailEpisode">
            <p>{episode}</p>
          </div>
        )}
      </Link>
      <div className="cardModelBasicMovie__detail">
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
      </div>
    </div>
  );
};
