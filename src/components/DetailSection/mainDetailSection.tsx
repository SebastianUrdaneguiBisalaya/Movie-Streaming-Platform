import { MovieDetail, MoviesRecommended, MovieComments, MovieVideo } from "./index";
import { Link, useLocation } from "react-router-dom";

export const MainDetailSection = ({id}:{id: number}) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const title = queryParams.get("title");
  return (
    <section className="mainDetailSection">
        <div style={{display: "flex", justifyContent: "flex-start", alignItems: "flex-start", height: "100%", width: "100%", maxWidth: "1200px", margin: "1rem", padding: "1rem"}}>
          <Link to={"/"} style={{cursor: "pointer", backgroundColor: "transparent", border: "none", padding: "0rem", margin: "0rem"}}>
            <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="#ffffff" d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z"/></svg>
              <span style={{color: "var(--color-white)", marginLeft: "1rem", fontSize: "0.8rem"}}>Back to Home</span>
            </div>
          </Link>
        </div>
        <MovieVideo id={id} title={title || ""} />
        <MovieDetail id={id} title={title || ""} />
        <MoviesRecommended id={id} title={title || ""} />
        <MovieComments id={id} title={title || ""} />
    </section>
  )
}