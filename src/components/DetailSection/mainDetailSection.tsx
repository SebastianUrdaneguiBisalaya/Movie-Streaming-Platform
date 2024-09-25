import { MovieDetail, MoviesRecommended, MovieComments } from "./index";

export const MainDetailSection = () => {
  return (
    <section className="mainDetailSection">
        <MovieDetail />
        <MoviesRecommended />
        <MovieComments />
    </section>
  )
}