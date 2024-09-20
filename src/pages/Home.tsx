import { CarrouselMain } from "../components/mainSection/carrouselMain";
import { RecentlyUpdated } from "../components/mainSection/recentlyUpdated";
import { Trending } from "../components/mainSection/trending";
import { NewReleaseMovies } from "../components/mainSection/newReleaseMovies";
import { NewReleaseSeries } from "../components/mainSection/newRealeaseSeries";
import { TabRecommended } from "../components/mainSection/tabRecommended";

export const Home = (): JSX.Element => {
  return (
    <>
      <CarrouselMain />
      <RecentlyUpdated />
      <Trending />
      <NewReleaseMovies/>
      <NewReleaseSeries/>
      <TabRecommended />
    </>
  );
};
