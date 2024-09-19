//type Props = {}
// props: Props
import { CarrouselMain } from "../components/mainSection/carrouselMain"
import { RecentlyUpdated } from "../components/mainSection/recentlyUpdated"

export const Home = (): JSX.Element => {
  return (
    <>
      <CarrouselMain/>
      <RecentlyUpdated/>
    </>
  )
}