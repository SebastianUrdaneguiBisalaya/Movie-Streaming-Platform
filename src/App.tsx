import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import { ScrollToTop } from "./utils/scrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
