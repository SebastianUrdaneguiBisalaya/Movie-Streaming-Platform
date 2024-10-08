import { useState, useEffect } from "react"
import { type MovieComment } from "../../types/types"
import { LazyImage } from "../../utils/LazyImage";

export const MovieComments = ({id, title}:{id: number, title: string}) => {
  const [comments, setComments] = useState<MovieComment[]>([]);
  const [expandedComments, setExpandedComments] = useState<{[key: string]:boolean}>({});
  const toggleReadMore = (id: string) => {
    setExpandedComments((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }))
  }

  useEffect(() => {
    const fetchComments = async () => {
      const url = title != "" ? `https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US&page=1` : `https://api.themoviedb.org/3/tv/${id}/reviews?language=en-US&page=1`
      const response = await fetch(url, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN_READ}`,
        },
      })
      if (!response.ok) {
        throw new Error("Failed to fetch data")
      }
      const data = await response.json()
      setComments(data.results)
    }

    fetchComments();
  }, [id, title])

  return (
    <div className="movieComments">
      <h2>Comments</h2>
      {
        comments.length > 0 ? 
        comments.map((item) => (
          <div key={item.id} className="movieComments__container">
            <div className="movieComments__container--firstColumn">
            <LazyImage className="movieComments__container--image" src={item.author_details.avatar_path ? `https://image.tmdb.org/t/p/w500/${item.author_details.avatar_path}` : `https://img1.pnghut.com/10/19/1/UjALtMK6NB/ico-silhouette-neck-head-shot-royaltyfree.jpg`} alt="Avatar of the author" />
            </div>
            <div className="movieComments__container--secondColumn">
              <p>{item?.author}</p>
              <p>{item?.created_at}</p>
              <p className={`movieComments__content ${expandedComments[item.id] ? "expanded" : ""}`}>
                {item?.content}
              </p>
              {
                !expandedComments[item.id] ? (
                  <span className="movieComments__readMore" onClick={() => toggleReadMore(item.id)}>Read more</span>
                ) :(
                  <span className="movieComments__readMore" onClick={() => toggleReadMore(item.id)}>Read less</span>
                )
              }
              <div className="movieComments__container--subRow">
                <div className="movieComments__containerLikes">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><g fill="none"><path fill="#ffffff" d="m15 10l-.986-.164A1 1 0 0 0 15 11zM4 10V9a1 1 0 0 0-1 1zm16.522 2.392l.98.196zM6 21h11.36v-2H6zM18.56 9H15v2h3.56zm-2.573 1.164l.805-4.835L14.82 5l-.806 4.836zM14.82 3h-.214v2h.214zm-3.543 1.781L8.763 8.555l1.664 1.11l2.516-3.774zM7.93 9H4v2h3.93zM3 10v8h2v-8zm17.302 8.588l1.2-6l-1.96-.392l-1.2 6zM8.762 8.555A1 1 0 0 1 7.93 9v2a3 3 0 0 0 2.496-1.336zm8.03-3.226A2 2 0 0 0 14.82 3v2zM18.56 11a1 1 0 0 1 .981 1.196l1.961.392A3 3 0 0 0 18.561 9zm-1.2 10a3 3 0 0 0 2.942-2.412l-1.96-.392a1 1 0 0 1-.982.804zM14.606 3a4 4 0 0 0-3.328 1.781l1.664 1.11A2 2 0 0 1 14.606 5zM6 19a1 1 0 0 1-1-1H3a3 3 0 0 0 3 3z"/><path stroke="#ffffff" strokeWidth="2" d="M8 10v10"/></g></svg>
                    {item?.author_details?.rating}
                </div>
                <div className="movieComments__containerLikes">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><g fill="none"><path fill="#ffffff" d="m15 14l-.986.164A1 1 0 0 1 15 13zM4 14v1a1 1 0 0 1-1-1zm16.522-2.392l.98-.196zM6 3h11.36v2H6zm12.56 12H15v-2h3.56zm-2.573-1.164l.805 4.835L14.82 19l-.806-4.836zM14.82 21h-.214v-2h.214zm-3.543-1.781l-2.515-3.774l1.664-1.11l2.516 3.774zM7.93 15H4v-2h3.93zM3 14V6h2v8zm17.302-8.588l1.2 6l-1.96.392l-1.2-6zM8.762 15.445A1 1 0 0 0 7.93 15v-2a3 3 0 0 1 2.496 1.336zm8.03 3.226A2 2 0 0 1 14.82 21v-2zM18.56 13a1 1 0 0 0 .981-1.196l1.961-.392A3 3 0 0 1 18.561 15zm-1.2-10a3 3 0 0 1 2.942 2.412l-1.96.392A1 1 0 0 0 17.36 5zm-2.754 18a4 4 0 0 1-3.328-1.781l1.664-1.11a2 2 0 0 0 1.664.891zM6 5a1 1 0 0 0-1 1H3a3 3 0 0 1 3-3z"/><path stroke="#ffffff" strokeWidth="2" d="M8 14V4"/></g></svg>
                  0
                </div>
                <p>Reply</p>
              </div>
            </div>
        </div>
        ))
      :  <p className="movieComments__container--noComments">No comments yet 😟</p>
      }
    </div>
  )
}