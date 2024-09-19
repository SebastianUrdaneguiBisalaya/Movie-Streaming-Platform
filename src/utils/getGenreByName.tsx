import { type Genres } from "../types/types";

export function getGenreNameById(id:number, genre:Genres[]) {
    const genreI = genre.find((item) => item.id === id);
    return genreI ? genreI.name :  "Unknown"
}