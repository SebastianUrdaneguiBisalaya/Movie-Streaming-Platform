import {useState, ReactNode} from "react";
import { SearchContext } from "./searchMovie";

export const SearchContextProvider = ({children}: {children: ReactNode}) => {
    const [searchQuery, setSearchQuery] = useState<string>("");

    return (
        <SearchContext.Provider value={{searchQuery, setSearchQuery}}>
            {children}
        </SearchContext.Provider>
    )
}