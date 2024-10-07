import { type PropReleases } from "../types/types";
import { CardMovie } from "../components/mainSection/tCardMovie";
import { ButtonViewAll } from "./buttonViewAll";

export const RenderReleases = ({ title, data, onClick }: PropReleases) => {
  return (
    <section className="movies__newRelease">
      {
        data.length > 0 && (
          <div className="newRelease__container">
        <div className="newRelease__containerTitle">
          <h2>{title}</h2>
          <ButtonViewAll onClick={onClick} />
        </div>
        <div>
          <div className="cardModelBasicMovie__container">
            <div className="cardModelBasicMovie__container--firstRow">
              {data?.map((item) => (
                <CardMovie
                  id={item.id}
                  key={item.id}
                  title={item.title}
                  name={item.name}
                  poster_path={item.poster_path}
                  vote_average={item.vote_average}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
        )
      }
    </section>
  );
};
