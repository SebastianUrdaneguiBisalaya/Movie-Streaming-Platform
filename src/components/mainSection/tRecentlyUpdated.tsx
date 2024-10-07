import { useRef} from "react";
import { CardRecentlyUpdated } from "./tCardRecentlyUpdated";
import { Serie } from "../../types/types";

export const RecentlyUpdated = ({recentlyUpdated}:{recentlyUpdated: Serie[]}): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);
  const handleNext = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += containerRef.current.offsetWidth;
    }
  };
  return (
    <section className="movie__recentlyUpdated">
      {recentlyUpdated?.length > 0 && (
        <div className="recentlyUpdated__container">
          <h2>Recently Updated</h2>
          <div className="recentlyUpdated__containerScrollWrapper">
            <div
              className="recentlyUpdated__containerScroll"
              ref={containerRef}
            >
              {recentlyUpdated.map((item, index) => (
                <CardRecentlyUpdated
                  key={index}
                  id={item.id}
                  name={item.name}
                  overview={item.overview}
                  poster_path={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                  first_air_date={item.first_air_date}
                />
              ))}
            </div>
            <button
              className="recentlyUpdated__buttonNext"
              onClick={handleNext}
            >
              <div className="recentlyUpdated__buttonNext--icon">
                <svg
                  className="svg-front"
                  width="36"
                  height="32"
                  viewBox="0 0 36 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M36 16L19.4104 32L17.8237 30.4697L31.6983 17.0882H0V14.9118H31.6983L17.8237 1.53029L19.4104 0L36 16Z"
                    fill="black"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
