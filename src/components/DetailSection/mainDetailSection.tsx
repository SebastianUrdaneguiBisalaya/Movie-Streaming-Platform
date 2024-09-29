import { MovieDetail, MoviesRecommended, MovieComments, MovieVideo } from "./index";
import { Link } from "react-router-dom";

export const MainDetailSection = ({id}:{id: number}) => {

  return (
    <section className="mainDetailSection">
        <div style={{display: "flex", justifyContent: "flex-start", alignItems: "flex-start", height: "100%", width: "100%", maxWidth: "1200px", margin: "1rem", padding: "1rem"}}>
          <Link to={"/"} style={{cursor: "pointer", backgroundColor: "transparent", border: "none", padding: "0rem", margin: "0rem"}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 1024 1024"><path fill="#ffffff" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64"/><path fill="#ffffff" d="m237.248 512l265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312z"/></svg>
          </Link>
        </div>
        <MovieVideo id={id} />
        <MovieDetail id={id} />
        <MoviesRecommended id={id} />
        <MovieComments id={id} />
    </section>
  )
}