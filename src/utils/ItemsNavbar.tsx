import { Link } from "react-router-dom"

type Props = {
    titleItem:string
}

export const ItemsNavbar = ({titleItem}: Props) : JSX.Element => {
  return (
    <li>
      <Link to={""} className="navbar__item">{titleItem}</Link>
    </li>
  )
}