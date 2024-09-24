import { RenderReleases } from "../../utils/renderReleases";
import { type DataItem } from "../../types/types";

export const NewReleaseSeries = ({newReleasesSeries}:{newReleasesSeries: DataItem[]}): JSX.Element => {
  return (
    <RenderReleases
      title="New Release - Series"
      data={newReleasesSeries}
      onClick={() => console.log("Hello World")}
    />
  );
};
