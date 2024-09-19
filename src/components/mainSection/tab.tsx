import { ButtonViewAll } from "../../utils/buttonViewAll"

export const Tab = () => {
    return (
        <section className="movie__tab">
            <div className="movie__tab--container">
                <div className="movie__tab--containerTitle">
                    <h2>Recommended</h2>
                    <div role="tabList" aria-label="tabs" className="movie__tab--containerOptions">
                        <button id="tab-1" role="tab" aria-selected="true" aria-controls="panel-1" tabIndex={0}
                        className="first__tab">
                            <span>Movies</span>
                        </button>
                        <button id="tab-2" role="tab" aria-selected="false" aria-controls="panel-2" tabIndex={-1}
                        className="second__tab">
                            <span>Series</span>
                        </button>
                        <button id="tab-3" role="tab" aria-selected="true" aria-controls="panel-3" tabIndex={-1}
                        className="third__tab">
                            <span>Animation</span>
                        </button>
                    </div>
                    <ButtonViewAll
                        onClick={() => {
                            console.log("Hello World");
                        }}
                    />
                </div>
            </div>
            di
        </section>
    )
}