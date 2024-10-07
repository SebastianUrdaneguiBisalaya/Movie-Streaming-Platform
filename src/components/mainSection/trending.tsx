import { CardTrending } from "./CardTrending";
import { ButtonViewAll } from "../../utils/buttonViewAll";
import type {MoviesTrending } from "../../types/types";

export const Trending = ({moviesTrending}:{moviesTrending: MoviesTrending[]}): JSX.Element => {
  return (
    <section className="movie__trending">
      {moviesTrending?.length > 0 && (
        <div className="trending__container">
          <div className="trending__containerTitle">
            <h2>Trending</h2>
            <ButtonViewAll
              onClick={() => {
                console.log("Hello World");
              }}
            />
          </div>
          <div className="trending__containerMovies">
            {moviesTrending?.map((item, index) => (
              <CardTrending
                id={item.id}
                key={index}
                title={item.title}
                tags={item.genres}
                poster_path={item.poster_path}
                release_date={item.release_date}
                vote_average={item.vote_average}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
