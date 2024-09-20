import { type PropReleases } from "../types/types";
import { CardMovie } from "../components/mainSection/cardMovie";
import { ButtonViewAll } from "./buttonViewAll";

export const RenderReleases = ({ title, data, onClick }: PropReleases) => {
  return (
    <section className="movies__newRelease">
      <div className="newRelease__container">
        <div className="newRelease__containerTitle">
          <h2>{title}</h2>
          <ButtonViewAll onClick={onClick} />
        </div>
        <div>
          <div className="cardModelBasicMovie__container">
            <div className="cardModelBasicMovie__container--firstRow">
              {data.map((item) => (
                <CardMovie
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
    </section>
  );
};
