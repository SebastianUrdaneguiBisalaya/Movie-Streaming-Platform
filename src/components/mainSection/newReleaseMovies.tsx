import { RenderReleases } from "../../utils/renderReleases";
import { type DataItem } from "../../types/types";

export const NewReleaseMovies = ({newReleasesMovies}:{newReleasesMovies: DataItem[]}): JSX.Element => {
  return (
    <RenderReleases
      title="New Release - Movies"
      data={newReleasesMovies}
      onClick={() => console.log("Hello World")}
    />
  );
};
