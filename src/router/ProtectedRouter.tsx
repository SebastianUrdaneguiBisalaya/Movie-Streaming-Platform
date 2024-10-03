import { Navigate, Outlet } from "react-router-dom"
import { useContext } from "react";
import { UserDataContext } from "../context/userData";

export const ProtectedRouter = () => {
  const {userData} = useContext(UserDataContext);

  if (userData.length <= 0) {
    return <Navigate to="/" replace/>
  }
  return <Outlet context={{userData}} />
}