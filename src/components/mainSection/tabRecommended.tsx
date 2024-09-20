import { ButtonViewAll } from "../../utils/buttonViewAll";
import { useEffect, useState } from "react";
import { CardMovie } from "./cardMovie";
import { type DataItem } from "../../types/types";

export const TabRecommended = () => {
  const [activeTab, setActiveTab] = useState("Movies");
  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    const allData: DataItem[] = [];
    const getMoviesForRecommends = async () => {
      const responseMovies = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN_READ}`,
          },
        }
      );
      if (!responseMovies.ok) {
        throw new Error("Failed to fetch data");
      }
      const dataMovies = await responseMovies.json();
      const dataMoviesTransformed = dataMovies.results.map(
        (item: DataItem) => ({
          ...item,
          category: "Movies",
        })
      );
      allData.push(...dataMoviesTransformed);
    };

    const getSeriesForRecommends = async () => {
      const responseSeries = await fetch(
        "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1",
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN_READ}`,
          },
        }
      );
      if (!responseSeries.ok) {
        throw new Error("Failed to fetch data");
      }
      const dataSeries = await responseSeries.json();
      const dataSeriesTransformed = dataSeries.results.map(
        (item: DataItem) => ({
          ...item,
          category: "Series",
          episode: "EP. 1",
        })
      );
      allData.push(...dataSeriesTransformed);
    };

    const getAnimationsForRecommends = async () => {
      const responseAnimations = await fetch(
        "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=16",
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN_READ}`,
          },
        }
      );
      if (!responseAnimations.ok) {
        throw new Error("Failed to fetch data");
      }
      const dataAnimations = await responseAnimations.json();
      const dataAnimationsTransformed = dataAnimations.results.map(
        (item: DataItem) => ({
          ...item,
          category: "Animation",
        })
      );
      allData.push(...dataAnimationsTransformed);
      setData(allData);
    };
    getMoviesForRecommends();
    getSeriesForRecommends();
    getAnimationsForRecommends();
  }, []);

  const filterData = (category: string): DataItem[] => {
    return data.filter((item) => item.category === category);
  };
  const render = () => {
    const filteredData = filterData(activeTab);
    const firstRowFilteredData = filteredData.slice(0, 4);
    const secondRowFilteredData = filteredData.slice(4, 8);
    return (
      <div className="cardModelBasicMovie__container">
        <div className="cardModelBasicMovie__container--firstRow">
          {firstRowFilteredData.map((item) => {
            return (
              <CardMovie
                key={item.id}
                title={item.title}
                name={item.name}
                poster_path={item.poster_path}
                vote_average={item.vote_average}
                episode={item.episode}
              />
            );
          })}
        </div>
        <div className="cardModelBasicMovie__container--secondRow">
          {secondRowFilteredData.map((item) => {
            return (
              <CardMovie
                key={item.id}
                title={item.title}
                name={item.name}
                poster_path={item.poster_path}
                vote_average={item.vote_average}
                episode={item.episode}
              />
            );
          })}
        </div>
      </div>
    );
  };
  return (
    <section className="movie__tab">
      {data.length > 0 && (
        <div className="movie__tab--container">
          <div className="movie__tab--containerTitle">
            <h2>Recommended</h2>
            <div
              role="tabList"
              aria-label="tabs"
              className="movie__tab--containerOptions"
            >
              <button
                id="tab-1"
                role="tab"
                aria-selected={activeTab === "Movies"}
                aria-controls="panel-1"
                tabIndex={0}
                className={activeTab === "Movies" ? "activeTabs" : ""}
                onClick={() => setActiveTab("Movies")}
              >
                <span>Movies</span>
              </button>
              <button
                id="tab-2"
                role="tab"
                aria-selected={activeTab === "Series"}
                aria-controls="panel-2"
                tabIndex={-1}
                className={activeTab === "Series" ? "activeTabs" : ""}
                onClick={() => setActiveTab("Series")}
              >
                <span>Series</span>
              </button>
              <button
                id="tab-3"
                role="tab"
                aria-selected={activeTab === "Animation"}
                aria-controls="panel-3"
                tabIndex={-1}
                className={activeTab === "Animation" ? "activeTabs" : ""}
                onClick={() => setActiveTab("Animation")}
              >
                <span>Animation</span>
              </button>
            </div>
            <ButtonViewAll
              onClick={() => {
                console.log("Hello World");
              }}
            />
          </div>
          <div className="movie__tab--containerGrid">{render()}</div>
        </div>
      )}
    </section>
  );
};
