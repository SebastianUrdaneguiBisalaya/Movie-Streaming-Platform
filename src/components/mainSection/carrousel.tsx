import { useCallback, useEffect, useState } from "react";
import { CardCarrousel } from "./cardCarrousel";
import { type Movies } from "../../types/types";

type MovieCarrouselProps = {
    movies: Movies[];
    interval: number;
}

export const Carrousel = ({movies, interval}:MovieCarrouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    const nexMovie = useCallback(() => {
        setCurrentIndex(prevIndex => {
            const nextIndex = (prevIndex + 1) % movies.length;
            console.log('Next index:', nextIndex);
            return nextIndex;
        });
        setProgress(0);
    }, [movies.length]);

    const prevMovie = useCallback(() => {
        setCurrentIndex(prevIndex => (prevIndex - 1 + movies.length) % movies.length);
    }, [movies.length]);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(prevProgress => {
                if (prevProgress >= 100) {
                    nexMovie();
                    return 0;
                }
                return prevProgress + (100 / (interval / 1000));
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [interval, nexMovie]);

    useEffect(() => {
        console.log('Current index:', currentIndex);
    }, [currentIndex]);

    return (
        <div className="movie__carrousel">
            {movies.map((movie, index) => (
                <div key={movie.id}
                     className={`movie__carrouselItem ${index === currentIndex ? 'movie__carrousel--active' : ''}`}
                     style={{transform: `translateX(calc(${-(currentIndex *100)}%))`}}>
                    <CardCarrousel
                        key={movie.id}
                        id={movie.id}
                        title={movie.title}
                        overview={movie.overview}
                        release_date={movie.release_date}
                        genres={movie.genres}
                        vote_average={movie.vote_average}
                        backdrop_path={movie.backdrop_path}
                    />
                </div>
            ))}
            <button className="movie__carrouselTab movie__carrouselTabPrev" onClick={prevMovie}>&#10094;</button>
            <button className="movie__carrouselTab movie__carrouselTabNext" onClick={nexMovie}>&#10095;</button>
            <div className="movie__carrousel--progress">
                <svg viewBox="0 0 36 36">
                    <circle
                        r="16"
                        cx="18"
                        cy="18"
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.2)"
                        strokeWidth="2"
                    />
                    <circle
                        r="16"
                        cx="18"
                        cy="18"
                        fill="none"
                        stroke="white"
                        strokeWidth="4"
                        strokeDasharray="100"
                        strokeDashoffset={100 - progress}
                    />
                </svg>
            </div>
        </div>
    );
}
