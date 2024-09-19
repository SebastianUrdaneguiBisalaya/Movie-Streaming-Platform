import { ButtonViewAll } from "../../utils/buttonViewAll"
import { useState } from "react";
import "../../style/tab.css" 

interface DataItem {
    id: number;
    title: string;
    category: string;
}

// interface TabPros {
//     data: DataItem[];
// }

export const Tab = () => {
    const [activeTab, setActiveTab] = useState("Movies");
    const data = [
        { id: 1, title: 'Movie 1', category: 'Movies' },
        { id: 2, title: 'Movie 2', category: 'Movies' },
        { id: 5, title: 'Series 1', category: 'Series' },
        { id: 6, title: 'Series 2', category: 'Series' },
        { id: 7, title: 'Animation 1', category: 'Animation' }]
        
    const filterData = (category:string): DataItem[] => {
        return data.filter((item) => item.category === category);
    }
    const render = () => {
        const filteredData = filterData(activeTab);
        return filteredData.map((item, index) => (
            <div key={index}>
                <h3>{item.title}</h3>
            </div>
        ))
    }
    return (
        <section className="movie__tab">
            <div className="movie__tab--container">
                <div className="movie__tab--containerTitle">
                    <h2>Recommended</h2>
                    <div role="tabList" aria-label="tabs" className="movie__tab--containerOptions">
                        <button id="tab-1" role="tab" aria-selected={activeTab === "Movies"} aria-controls="panel-1" tabIndex={0}
                        className={activeTab === "Movies" ? "activeTabs" : ""} onClick={() => setActiveTab("Movies")}>
                            <span>Movies</span>
                        </button>
                        <button id="tab-2" role="tab" aria-selected={activeTab === "Series"} aria-controls="panel-2" tabIndex={-1}
                        className={activeTab === "Series" ? "activeTabs" : ""} onClick={() => setActiveTab("Series")}>
                            <span>Series</span>
                        </button>
                        <button id="tab-3" role="tab" aria-selected={activeTab === "Animation"} aria-controls="panel-3" tabIndex={-1}
                        className={activeTab === "Animation" ? "activeTabs" : ""} onClick={() => setActiveTab("Animation")}>
                            <span>Animation</span>
                        </button>
                    </div>
                    <ButtonViewAll
                        onClick={() => {
                            console.log("Hello World");
                        }}
                    />
                </div>
                <div className="movie__tab--containerGrid">
                    {render()}
                </div>
            </div>
            di
        </section>
    )
}