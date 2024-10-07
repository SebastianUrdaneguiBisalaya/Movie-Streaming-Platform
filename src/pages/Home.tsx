import { MainSection } from "../components/mainSection/tMainSection";
import { SearchMovies } from "../components/SearchMovie/SearchMovie";
import { useSearchMovie } from "../hooks/useSearchMovie";
import { useEffect } from "react";

export const Home = (): JSX.Element => {
  const {searchQuery, setSearchQuery} = useSearchMovie();
  useEffect(() => {
    return () => {
      setSearchQuery("")
    }
  }, [setSearchQuery])
  return (
      searchQuery ? <SearchMovies /> : <MainSection />
  );
};
