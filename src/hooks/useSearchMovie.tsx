import { useContext } from "react"
import { type SearchContextType } from "../types/types"
import { SearchContext } from "../context/searchMovie"

export const useSearchMovie = (): SearchContextType => {
    const context = useContext(SearchContext)
    if (!context) {
        throw new Error("useSearchMovie must be used within a SearchContextProvider")
    }
    return context
}