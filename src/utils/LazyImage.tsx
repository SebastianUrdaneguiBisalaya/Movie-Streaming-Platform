import { useEffect, useState, useRef } from "react";

export const LazyImage = ({src, alt, className}: {src: string, alt: string, className?: string}): JSX.Element => {
    const [isVisible, setIsVisible] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }

            })
        })

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }
        return () => {
            observer.disconnect();
        }
    }, [])

    return (
        <img
        ref={imgRef}
        src={isVisible ? src : ""}
        alt={alt}
        loading="lazy"
        className={className}
        data-src={src}
        />
    )
}