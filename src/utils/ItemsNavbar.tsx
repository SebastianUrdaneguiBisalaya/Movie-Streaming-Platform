type Props = {
    titleItem:string
}

export const ItemsNavbar = ({titleItem}: Props) : JSX.Element => {
  return (
    <a href="" style={{display: "flex", justifyContent: "center", alignItems: "center", color: "#FFFFFF", textDecoration: "none", fontSize: "0.8rem", fontWeight: "600"}}>{titleItem}</a>
  )
}