import { Link } from "react-router-dom"

type Props = {
    titleItem:string
    path:string
}

export const ItemsNavbar = ({titleItem, path}: Props) : JSX.Element => {
  return (
    <li>
      <Link to={path} className="navbar__item">{titleItem}</Link>
    </li>
  )
}