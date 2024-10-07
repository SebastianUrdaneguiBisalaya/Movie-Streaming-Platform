import { RenderReleases } from "../../utils/renderReleases";
import { type Serie } from "../../types/types";

export const NewReleaseSeries = ({newReleasesSeries}:{newReleasesSeries: Serie[]}): JSX.Element => {
  return (
    <RenderReleases
      title="New Release - Series"
      data={newReleasesSeries}
      onClick={() => console.log("Hello World")}
    />
  );
};
