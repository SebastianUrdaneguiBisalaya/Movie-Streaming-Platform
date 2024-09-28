import { useParams } from "react-router-dom";
import { MainDetailSection } from "../components/DetailSection/";

export const DetailMovie = () => {
    const { id } = useParams();
    return (
      <MainDetailSection id={Number(id)} />
    )
  }