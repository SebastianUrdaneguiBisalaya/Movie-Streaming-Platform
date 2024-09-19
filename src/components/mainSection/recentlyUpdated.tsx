import { useRef } from "react"
import { CardRecentlyUpdated } from "./cardRecentlyUpdated"

export const RecentlyUpdated = ():JSX.Element => {
    const containerRef = useRef<HTMLDivElement>(null);
    const handleNext = () => {
        if (containerRef.current) {
            containerRef.current.scrollLeft += containerRef.current.offsetWidth;
        }
    }
    return (
        <section className="movie__recentlyUpdated">
            <div className="recentlyUpdated__container">
            <h2 style={{color: "white"}}>Recently Updated</h2>
            <div className="recentlyUpdated__containerScrollWrapper">
                <div className="recentlyUpdated__containerScroll" ref={containerRef}>
                    <CardRecentlyUpdated
                    name="Hola"
                    overview="recently Updated__ container Scrollrecent lyUpdat ed__con tainer Scroll"
                    poster_path="https://i.pinimg.com/736x/26/6c/99/266c994ffc7a8027a01c83e51444522f.jpg"/>
                </div>
                <button className="recentlyUpdated__buttonNext" onClick={handleNext}>
                    <div className="recentlyUpdated__buttonNext--icon">
                        <svg className="svg-front" width="36" height="32" viewBox="0 0 36 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M36 16L19.4104 32L17.8237 30.4697L31.6983 17.0882H0V14.9118H31.6983L17.8237 1.53029L19.4104 0L36 16Z" fill="black"/>
                        </svg>
                    </div>
                </button>
            </div>
            </div>
        </section>
    )
}