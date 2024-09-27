import { MainSection } from "../components/mainSection/MainSection";
import { SearchMovies } from "../components/SearchMovie/SearchMovie";
import { useSearchMovie } from "../hooks/useSearchMovie";

export const Home = (): JSX.Element => {
  const {searchQuery} = useSearchMovie();
  return (
      searchQuery ? <SearchMovies /> : <MainSection />
  );
};
