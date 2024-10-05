import { Navigate, Outlet } from "react-router-dom"

export const ProtectedRouter = () => {
  const userData = localStorage.getItem("userMovieStreaming") || [];

  if (userData.length <= 0) {
    console.log("userData is empty")
    return (
      <Navigate to="/" replace/>
    )
  }
  return <Outlet context={{userData}} />
}