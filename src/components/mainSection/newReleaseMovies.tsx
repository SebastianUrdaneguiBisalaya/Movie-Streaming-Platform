import { RenderReleases } from "../../utils/renderReleases";
import { type Movie } from "../../types/types";

export const NewReleaseMovies = ({newReleasesMovies}:{newReleasesMovies: Movie[]}): JSX.Element => {
  return (
    <RenderReleases
      title="New Release - Movies"
      data={newReleasesMovies}
      onClick={() => console.log("Hello World")}
    />
  );
};
