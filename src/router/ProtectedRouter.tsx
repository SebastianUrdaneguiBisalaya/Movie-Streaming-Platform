import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRouter = () => {
  const [userData, setUserData] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem("userMovieStreaming");
    if (data) {
      setUserData(JSON.parse(data)); 
    } 
    setIsLoading(false);
  }, [setUserData]);

  if (isLoading) {
    return;
  }

  if (!userData) {
    return <Navigate to="/" replace />;
  }

  return <Outlet context={{ userData }} />;
};
