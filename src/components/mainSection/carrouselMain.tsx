import { Carrousel } from "./carrousel";
import type { Movies } from "../../types/types";

export const CarrouselMain = ({movies}:{movies: Movies[]}) => {
  
  return (
      movies?.length > 0 && <Carrousel  movies={movies} interval={15000} />
  )
};