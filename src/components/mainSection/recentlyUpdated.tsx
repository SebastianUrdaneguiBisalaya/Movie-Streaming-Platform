import { CardRecentlyUpdated } from "./cardRecentlyUpdated"

export const RecentlyUpdated = ():JSX.Element => {
    return (
        <section className="movie__recentlyUpdated">
            <div className="recentlyUpdated__container">
            <h2 style={{color: "white"}}>Recently Updated</h2>
            <div className="recentlyUpdated__containerScroll">
                <CardRecentlyUpdated
                name="Hola"
                overview="recently Updated__ container Scrollrecent lyUpdat ed__con tainer Scroll"
                poster_path="https://i.pinimg.com/736x/26/6c/99/266c994ffc7a8027a01c83e51444522f.jpg"/>
                <CardRecentlyUpdated
                name="Hola"
                overview="Como estas"
                poster_path="https://i.pinimg.com/736x/26/6c/99/266c994ffc7a8027a01c83e51444522f.jpg"/>
            </div>
            </div>
        </section>
    )
}