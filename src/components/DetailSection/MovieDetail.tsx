import { useEffect, useState } from "react"
import { type MovieDetailType } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { LazyImage } from "../../utils/LazyImage";

export const MovieDetail = ({id, title}:{id: number, title: string}) => {
  
  const navigate = useNavigate();
  const [movieDetail, setMovieDetail] = useState<MovieDetailType>();
  
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const url = title != "" ? `https://api.themoviedb.org/3/movie/${id}?append_to_response=credits&language=en-US` : `https://api.themoviedb.org/3/tv/${id}?append_to_response=credits&language=en-US`
        const movieDetailResponse = await fetch(
          url,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN_READ}`,
            },
          }
        );
  
        if (!movieDetailResponse.ok) {
          if (movieDetailResponse.status === 404) {
            navigate("/404", {replace: true}); 
          } else {
            throw new Error("Failed to fetch data");
          }
          return; 
        }
  
        const result = await movieDetailResponse.json();
        setMovieDetail(result);
      } catch (error) {
        navigate("/404"); 
      }
    };
  
    fetchData();
  }, [id, title, navigate]);

  return (
    <div className="movieDetailGrid">
      <div className="movieDetailGrid__image">
        <LazyImage src={`https://image.tmdb.org/t/p/w500/${movieDetail?.poster_path}`} alt="Poster path of movie" />
      </div>

      <div className="movieDetailGrid__container">  
        <div className="row row__1">
            <h4>{movieDetail?.title ? movieDetail?.title : movieDetail?.name}</h4>
            <button className="button__addFavorite">+ Add to Favorite</button>
        </div>
        
        <div className="row row__2">
          <div className="column movieDetail__tag--genre">
              {
                movieDetail?.genres?.map((item) => item.name)?.slice(0,3)?.map((item) => (
                  <span key={item} className="movieDetail__tagOfKind">
                    {item}
                  </span>
                ))
              }
          </div>
          <div className="column">
            <div className="movieDetail__tag">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.6445 1.93601H13.728C13.6696 1.93601 13.6136 1.95921 13.5723 2.00051C13.531 2.04182 13.5078 2.09783 13.5078 2.15625C13.5078 2.19378 13.5196 2.22735 13.5359 2.25797V3.93595C13.536 3.99744 13.5239 4.05835 13.5004 4.11517C13.4769 4.172 13.4424 4.22363 13.3989 4.26711C13.3555 4.3106 13.3038 4.34508 13.247 4.36858C13.1902 4.39208 13.1293 4.40415 13.0678 4.40408H12.1601C12.1031 4.40408 12.0466 4.39284 11.9938 4.371C11.9411 4.34916 11.8932 4.31716 11.8529 4.2768C11.8125 4.23645 11.7805 4.18855 11.7587 4.13582C11.7368 4.0831 11.7256 4.02659 11.7256 3.96953V2.28513C11.7547 2.24839 11.771 2.20312 11.772 2.15625C11.7721 2.12731 11.7664 2.09864 11.7554 2.07189C11.7443 2.04514 11.7281 2.02083 11.7076 2.00037C11.6872 1.9799 11.6629 1.96368 11.6361 1.95264C11.6094 1.94159 11.5807 1.93594 11.5518 1.93601H5.67292C5.61451 1.93601 5.55849 1.95921 5.51719 2.00051C5.47588 2.04182 5.45268 2.09783 5.45268 2.15625C5.45268 2.19032 5.46206 2.22143 5.47589 2.25056V3.9478C5.47589 4.00778 5.46408 4.06718 5.44112 4.1226C5.41817 4.17802 5.38452 4.22837 5.3421 4.27079C5.29969 4.3132 5.24933 4.34685 5.19391 4.36981C5.1385 4.39276 5.0791 4.40458 5.01911 4.40458H4.21321C4.09089 4.40458 3.97357 4.35598 3.88708 4.26949C3.80058 4.18299 3.75199 4.06568 3.75199 3.94335V2.26291C3.7716 2.23073 3.78233 2.19392 3.7831 2.15625C3.78316 2.12731 3.77751 2.09864 3.76647 2.07189C3.75542 2.04514 3.7392 2.02083 3.71874 2.00037C3.69827 1.9799 3.67397 1.96368 3.64722 1.95264C3.62047 1.94159 3.5918 1.93594 3.56286 1.93601H0.489862C0.360068 1.93614 0.23562 1.98772 0.143796 2.07945C0.0519713 2.17118 0.000261353 2.29558 0 2.42537V17.0096C0 17.2802 0.219747 17.5 0.489862 17.5H16.6445C16.7743 17.4997 16.8988 17.448 16.9905 17.356C17.0823 17.2641 17.1338 17.1395 17.1338 17.0096V2.42537C17.1336 2.29567 17.0819 2.17134 16.9902 2.07963C16.8985 1.98791 16.7742 1.93627 16.6445 1.93601ZM16.6445 17.0595H0.489862C0.483336 17.0595 0.476874 17.0582 0.47085 17.0557C0.464826 17.0532 0.459361 17.0495 0.454769 17.0449C0.450177 17.0402 0.44655 17.0347 0.444097 17.0287C0.441645 17.0226 0.440416 17.0162 0.440481 17.0096V6.01095H16.6933V17.0091C16.6935 17.0157 16.6923 17.0222 16.6899 17.0282C16.6875 17.0343 16.684 17.0398 16.6794 17.0445C16.6749 17.0492 16.6694 17.0529 16.6634 17.0555C16.6574 17.0581 16.651 17.0595 16.6445 17.0595Z"
                      fill="white"
                    />
                    <path
                      d="M4.67344 3.90237C4.79492 3.90237 4.89368 3.80361 4.89368 3.68213V0.720241C4.89368 0.691318 4.88799 0.662679 4.87692 0.635958C4.86585 0.609237 4.84963 0.584958 4.82918 0.564507C4.80872 0.544056 4.78444 0.527833 4.75772 0.516765C4.731 0.505697 4.70236 0.5 4.67344 0.5C4.64452 0.5 4.61588 0.505697 4.58916 0.516765C4.56244 0.527833 4.53816 0.544056 4.51771 0.564507C4.49726 0.584958 4.48103 0.609237 4.46997 0.635958C4.4589 0.662679 4.4532 0.691318 4.4532 0.720241V3.68262C4.4532 3.8041 4.55196 3.90237 4.67344 3.90237ZM12.6505 3.90237C12.772 3.90237 12.8707 3.80361 12.8707 3.68213V0.720241C12.8707 0.691318 12.865 0.662679 12.854 0.635958C12.8429 0.609237 12.8267 0.584958 12.8062 0.564507C12.7858 0.544056 12.7615 0.527833 12.7348 0.516765C12.7081 0.505697 12.6794 0.5 12.6505 0.5C12.6216 0.5 12.5929 0.505697 12.5662 0.516765C12.5395 0.527833 12.5152 0.544056 12.4948 0.564507C12.4743 0.584958 12.4581 0.609237 12.447 0.635958C12.4359 0.662679 12.4303 0.691318 12.4303 0.720241V3.68262C12.4303 3.8041 12.5285 3.90237 12.6505 3.90237Z"
                      fill="white"
                    />
                    <path
                      d="M3.5352 9.34271C4.20556 9.34271 4.74899 8.79927 4.74899 8.12891C4.74899 7.45856 4.20556 6.91512 3.5352 6.91512C2.86484 6.91512 2.32141 7.45856 2.32141 8.12891C2.32141 8.79927 2.86484 9.34271 3.5352 9.34271Z"
                      fill="white"
                    />
                    <path
                      d="M7.0235 9.34271C7.69386 9.34271 8.23729 8.79927 8.23729 8.12891C8.23729 7.45856 7.69386 6.91512 7.0235 6.91512C6.35314 6.91512 5.80971 7.45856 5.80971 8.12891C5.80971 8.79927 6.35314 9.34271 7.0235 9.34271Z"
                      fill="white"
                    />
                    <path
                      d="M10.5113 9.34271C11.1817 9.34271 11.7251 8.79927 11.7251 8.12891C11.7251 7.45856 11.1817 6.91512 10.5113 6.91512C9.84095 6.91512 9.29752 7.45856 9.29752 8.12891C9.29752 8.79927 9.84095 9.34271 10.5113 9.34271Z"
                      fill="white"
                    />
                    <path
                      d="M3.5352 12.7229C4.20556 12.7229 4.74899 12.1794 4.74899 11.5091C4.74899 10.8387 4.20556 10.2953 3.5352 10.2953C2.86484 10.2953 2.32141 10.8387 2.32141 11.5091C2.32141 12.1794 2.86484 12.7229 3.5352 12.7229Z"
                      fill="white"
                    />
                    <path
                      d="M7.0235 12.7229C7.69386 12.7229 8.23729 12.1794 8.23729 11.5091C8.23729 10.8387 7.69386 10.2953 7.0235 10.2953C6.35314 10.2953 5.80971 10.8387 5.80971 11.5091C5.80971 12.1794 6.35314 12.7229 7.0235 12.7229Z"
                      fill="white"
                    />
                    <path
                      d="M10.5113 12.7229C11.1817 12.7229 11.7251 12.1794 11.7251 11.5091C11.7251 10.8387 11.1817 10.2953 10.5113 10.2953C9.84095 10.2953 9.29752 10.8387 9.29752 11.5091C9.29752 12.1794 9.84095 12.7229 10.5113 12.7229Z"
                      fill="white"
                    />
                    <path
                      d="M3.5352 16.103C4.20556 16.103 4.74899 15.5596 4.74899 14.8892C4.74899 14.2188 4.20556 13.6754 3.5352 13.6754C2.86484 13.6754 2.32141 14.2188 2.32141 14.8892C2.32141 15.5596 2.86484 16.103 3.5352 16.103Z"
                      fill="white"
                    />
                    <path
                      d="M7.0235 16.103C7.69386 16.103 8.23729 15.5596 8.23729 14.8892C8.23729 14.2188 7.69386 13.6754 7.0235 13.6754C6.35314 13.6754 5.80971 14.2188 5.80971 14.8892C5.80971 15.5596 6.35314 16.103 7.0235 16.103Z"
                      fill="white"
                    />
                    <path
                      d="M10.5113 16.103C11.1817 16.103 11.7251 15.5596 11.7251 14.8892C11.7251 14.2188 11.1817 13.6754 10.5113 13.6754C9.84095 13.6754 9.29752 14.2188 9.29752 14.8892C9.29752 15.5596 9.84095 16.103 10.5113 16.103Z"
                      fill="white"
                    />
                    <path
                      d="M13.9176 9.34271C14.588 9.34271 15.1314 8.79927 15.1314 8.12891C15.1314 7.45856 14.588 6.91512 13.9176 6.91512C13.2473 6.91512 12.7038 7.45856 12.7038 8.12891C12.7038 8.79927 13.2473 9.34271 13.9176 9.34271Z"
                      fill="white"
                    />
                    <path
                      d="M13.9176 12.7229C14.588 12.7229 15.1314 12.1794 15.1314 11.5091C15.1314 10.8387 14.588 10.2953 13.9176 10.2953C13.2473 10.2953 12.7038 10.8387 12.7038 11.5091C12.7038 12.1794 13.2473 12.7229 13.9176 12.7229Z"
                      fill="white"
                    />
                    <path
                      d="M13.9176 16.103C14.588 16.103 15.1314 15.5596 15.1314 14.8892C15.1314 14.2188 14.588 13.6754 13.9176 13.6754C13.2473 13.6754 12.7038 14.2188 12.7038 14.8892C12.7038 15.5596 13.2473 16.103 13.9176 16.103Z"
                      fill="white"
                    />
                  </svg>
                  {movieDetail?.release_date}
              </div>
              <div className="movieDetail__tag">
                  <svg
                    width="18"
                    height="16"
                    viewBox="0 0 18 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.93384 12.8589L14.1868 16L12.7928 10.08L17.4338 6.09684L11.3223 5.57474L8.93384 0L6.54534 5.57474L0.433838 6.09684L5.06634 10.08L3.68084 16L8.93384 12.8589Z"
                      fill="white"
                    />
                  </svg>
                  {movieDetail?.vote_average}
              </div>
            </div>
        </div>

        <div className="row row__3">
          <p>{movieDetail?.overview}</p>
        </div>
        
        <div className="row row__4">
          <div className="itemDescription">
            <p className="itemDescription__title">Country:</p>
            <p className="itemDescription__description">
            {movieDetail?.production_countries?.map((item) => item.name).join(", ")}
            </p>
          </div>
          <div className="itemDescription">
            <p className="itemDescription__title">Genre:</p>
            <p className="itemDescription__description">
              {movieDetail?.genres?.map((item) => item.name).slice(0,3).join(",")}
            </p>
          </div>
          <div className="itemDescription">
            <p className="itemDescription__title">Date Release:</p>
            <p className="itemDescription__description">{movieDetail?.release_date}</p>
          </div>
          <div className="itemDescription">
            <p className="itemDescription__title">Production:</p>
            <p className="itemDescription__description">
              {movieDetail?.production_countries?.map((item) => item.name).join(", ")}
            </p>
          </div>
          <div className="itemDescription">
            <p className="itemDescription__title">Cast:</p>
            <p className="itemDescription__description">
              {movieDetail?.credits?.cast?.map((item) => item.name).join(", ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}