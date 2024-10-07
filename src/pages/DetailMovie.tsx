import { useParams } from "react-router-dom";
import { MainDetailSection } from "../components/DetailSection/";
import { ScrollToTop } from "../utils/scrollToTop";

export const DetailMovie = () => {
    const { id } = useParams();
    return (
      <>
      <ScrollToTop />
      <MainDetailSection id={Number(id)} />
      </>
    )
  }