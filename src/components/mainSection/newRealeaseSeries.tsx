import { RenderReleases } from "../../utils/renderReleases";
import { type DataItem } from "../../types/types";
import { useState, useEffect } from "react";

export const NewReleaseSeries = () => {
  const [data, setData] = useState<DataItem[]>([]);
  useEffect(() => {
    const getSeriesNewRelease = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN_READ}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const dataMovies = await response.json();
      setData(dataMovies.results);
    };
    getSeriesNewRelease();
  }, []);
  return (
    <>
      {
        data.length > 0 && (
          <RenderReleases
          title="New Release - Series"
          data={data}
          onClick={() => console.log("Hello World")}
          />
        )
      }
    </>
  );
};
