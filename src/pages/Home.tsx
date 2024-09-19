//type Props = {}
// props: Props
import { CarrouselMain } from "../components/mainSection/carrouselMain"
import { RecentlyUpdated } from "../components/mainSection/recentlyUpdated"
import { Trending } from "../components/mainSection/trending"
import { Tab } from "../components/mainSection/tab"

export const Home = (): JSX.Element => {
  return (
    <>
      <CarrouselMain/>
      <RecentlyUpdated/>
      <Trending/>
      <Tab/>
    </>
  )
}