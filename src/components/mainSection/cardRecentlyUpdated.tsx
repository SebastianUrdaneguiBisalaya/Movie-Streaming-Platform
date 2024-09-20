import { type Series } from "../../types/types";

export const CardRecentlyUpdated = ({
  name,
  overview,
  poster_path,
  first_air_date,
}: Series) => {
  return (
    <div className="cardMovie__recentlyUpdated">
      <div className="cardMovie__recentlyUpdated--img">
        <img src={poster_path} alt="" />
      </div>
      <div className="cardMovie__recentlyUpdated--detail">
        <h4>{name}</h4>
        <p>{overview}</p>
        <p>{first_air_date}</p>
      </div>
    </div>
  );
};
