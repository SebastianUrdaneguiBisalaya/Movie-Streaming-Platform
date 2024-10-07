import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import { ScrollToTop } from "./utils/scrollToTop";
import { useContext, useEffect } from "react";
import { UserDataContext } from "./context/userData";

function App() {
  const { setUserData } = useContext(UserDataContext)

  useEffect(() => {
    const data = localStorage.getItem("userMovieStreaming");
    if (data) {
      const user = JSON.parse(data);
      setUserData([user]);
    }
  }, [setUserData])
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
