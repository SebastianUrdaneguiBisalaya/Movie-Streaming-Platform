import { ButtonViewAll } from "../../utils/buttonViewAll";
import { useState } from "react";
import { CardMovie } from "./cardMovie";
import { type DataItem } from "../../types/types";

export const TabRecommended = ({allRecommended}:{allRecommended: DataItem[]}): JSX.Element => {
  const [activeTab, setActiveTab] = useState("Movies");

  const filterData = (category: string): DataItem[] => {
    return allRecommended.filter((item) => item.category === category);
  };

  const render = () => {
    const filteredData = filterData(activeTab);
    const firstRowFilteredData = filteredData.slice(0, 4);
    const secondRowFilteredData = filteredData.slice(4, 8);
    return (
      <div className="cardModelBasicMovie__container">
        <div className="cardModelBasicMovie__container--firstRow">
          {firstRowFilteredData?.map((item) => {
            return (
              <CardMovie
                id={item.id}
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
          {secondRowFilteredData?.map((item) => {
            return (
              <CardMovie
                id={item.id}
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
      {allRecommended?.length > 0 && (
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
