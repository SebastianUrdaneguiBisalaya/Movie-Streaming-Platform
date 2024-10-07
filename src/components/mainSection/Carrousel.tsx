import { useCallback, useEffect, useState } from "react";
import { CardCarrousel } from "./CardCarrousel";
import { type Movies } from "../../types/types";

type MovieCarrouselProps = {
  movies: Movies[];
  interval: number;
};

type CarouselIndicatorsProps = {
  totalItems: number;
  currentIndex: number;
  progress: number;
};

const CarouselIndicators = ({
  totalItems,
  currentIndex,
  progress,
}: CarouselIndicatorsProps) => {
  return (
    <div className="movie__carrousel--indicators-container">
      <div className="movie__carrousel--indicators">
        {Array.from({ length: totalItems }).map((_, index) => (
          <div
            key={index}
            className={`movie__carrousel--indicator ${
              index === currentIndex ? "movie__carrousel--indicator-active" : ""
            }`}
          >
            {index === currentIndex && (
              <div
                className="movie__carrousel--progressRectangle"
                style={{ width: `${progress / totalItems}%` }}
              ></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export const Carrousel = ({ movies, interval }: MovieCarrouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const totalItems = movies.length;

  const nexMovie = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
    setProgress(0);
  }, [totalItems]);

  const prevMovie = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems);
    setProgress(0);
  }, [totalItems]);

  useEffect(() => {
    if (isAutoPlaying) {
      const timer = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            nexMovie();
            return 0;
          }
          return prevProgress + 100 / (interval / 1000);
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [interval, nexMovie, isAutoPlaying]);

  useEffect(() => {
    if (currentIndex === totalItems - 1) {
      setIsAutoPlaying(false);
    }
  }, [currentIndex, totalItems]);

  return (
    <section className="movie__carrousel">
      {movies.map((movie, index) => (
        <div
          key={`${movie.id}-${index}`}
          className={`movie__carrouselItem ${index === currentIndex ? "movie__carrousel--active" : ""}`}
          style={{
            transform: `translateX(calc(${-(currentIndex * 100)}%))`,
            transition: isTransitioning ? "transform 0.5s ease" : "none",
          }}
        >
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
      <button
        className="movie__carrouselTab movie__carrouselTabPrev"
        onClick={prevMovie}
      >
        &#10094;
      </button>
      {(isAutoPlaying || currentIndex < totalItems - 1) && (
        <button
          className="movie__carrouselTab movie__carrouselTabNext"
          onClick={nexMovie}
        >
          &#10095;
        </button>
      )}
      {isAutoPlaying && (
        <>
          <CarouselIndicators
            totalItems={totalItems}
            currentIndex={currentIndex}
            progress={progress}
          />
        </>
      )}
    </section>
  );
};
