import { ItemsNavbar } from "../../utils/ItemsNavbar";
import InputSearchNavbar from "../../utils/InputSearchNavbar";
import { useEffect, useState, useContext } from "react";
import { SignIn } from "../Auth/SignIn";
import { SignUp } from "../Auth/SignUp";
import { UserDataContext } from "../../context/userData";

export default function Navbar(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSignIn, setIsOpenSignIn] = useState(false);
  const [isOpenSignUp, setIsOpenSignUp] = useState(false);
  const {userData, setUserData} = useContext(UserDataContext);
  const closeSideBar = () => {
    setIsOpen(false);
  };

  const handleLogOut = () => {
    setUserData([]);
    localStorage.removeItem("userMovieStreaming");
  }

  useEffect(() => {
    const handleRezise = () => {
      if (window.innerWidth >= 900 && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleRezise);
    return () => {
      window.removeEventListener("resize", handleRezise);
    };
  }, [isOpen]);

  return (
    <>
      <nav className="navbar">
        <div className="navbar__container">
          <ul className="navbar__items">
            <ItemsNavbar titleItem="Home" path="/" />
            <ItemsNavbar titleItem="Genre" path="/" />
            <ItemsNavbar titleItem="Country" path="/" />
            <InputSearchNavbar />
            <ItemsNavbar titleItem="Movies" path="/movies" />
            <ItemsNavbar titleItem="Series" path="/series" />
            <ItemsNavbar titleItem="Animation" path="/animation" />
            <div className="navbar__itemsMore">
              {
                userData.length <= 0 ? (
                  <>
                    <button className="buttontoAuth" onClick={() => {setIsOpenSignIn(true)}}>Login</button>
                    /
                    <button className="buttontoAuth" onClick={() => {setIsOpenSignUp(true)}}>Sign Up</button>
                  </>
                ) : (
                  <div className="greeting__container">
                    <span className="greeting__name"><span className="greeting">Welcome</span> {userData[0].username}</span>
                    <button onClick={() => handleLogOut()} className="button__logOut">Logout</button>
                  </div>
                )
              }
              &nbsp;&nbsp;
              <svg
                width="14"
                height="18"
                viewBox="0 0 14 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.18038 13.9231V14.5385C9.18038 15.1913 8.9507 15.8174 8.54188 16.279C8.13305 16.7407 7.57857 17 7.00041 17C6.42224 17 5.86776 16.7407 5.45894 16.279C5.05011 15.8174 4.82044 15.1913 4.82044 14.5385V13.9231M12.8482 12.6704C11.9735 11.4615 11.3559 10.8462 11.3559 7.51346C11.3559 4.46154 9.97572 3.37423 8.83976 2.84615C8.68886 2.77615 8.54682 2.61538 8.50084 2.44038C8.30158 1.67462 7.74296 1 7.00041 1C6.25785 1 5.6989 1.675 5.50168 2.44115C5.45569 2.61808 5.31366 2.77615 5.16276 2.84615C4.02543 3.375 2.6466 4.45846 2.6466 7.51346C2.6449 10.8462 2.02735 11.4615 1.15264 12.6704C0.790219 13.1712 1.10768 13.9231 1.74157 13.9231H12.2626C12.8931 13.9231 13.2086 13.1688 12.8482 12.6704Z"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </ul>
        </div>
      </nav>

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div
          className="sidebar__content"
          onClick={(event) => event.stopPropagation()}
        >
          <InputSearchNavbar />
          <ItemsNavbar titleItem="Home" path="/" />
          <ItemsNavbar titleItem="Genre" path="/" />
          <ItemsNavbar titleItem="Country" path="/" />
          <ItemsNavbar titleItem="Movies" path="/movies" />
          <ItemsNavbar titleItem="Series" path="/series" />
          <ItemsNavbar titleItem="Animation" path="/animation" />
          <div className="navbar__itemsMore">
            {
              userData.length <= 0 ? (
                <>
                  <button className="buttontoAuth" onClick={() => {setIsOpenSignIn(true)}}>Login</button>
                  /
                  <button className="buttontoAuth" onClick={() => {setIsOpenSignUp(true)}}>Sign Up</button>
                </>
              ) : (
                <div className="greeting__container">
                  <span className="greeting__name"><span className="greeting">Welcome</span> {userData[0].username}</span>
                  <button onClick={() => handleLogOut()} className="button__logOut">Logout</button>
                </div>
              )
            }
            &nbsp;&nbsp;
            <svg
              width="14"
              height="18"
              viewBox="0 0 14 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.18038 13.9231V14.5385C9.18038 15.1913 8.9507 15.8174 8.54188 16.279C8.13305 16.7407 7.57857 17 7.00041 17C6.42224 17 5.86776 16.7407 5.45894 16.279C5.05011 15.8174 4.82044 15.1913 4.82044 14.5385V13.9231M12.8482 12.6704C11.9735 11.4615 11.3559 10.8462 11.3559 7.51346C11.3559 4.46154 9.97572 3.37423 8.83976 2.84615C8.68886 2.77615 8.54682 2.61538 8.50084 2.44038C8.30158 1.67462 7.74296 1 7.00041 1C6.25785 1 5.6989 1.675 5.50168 2.44115C5.45569 2.61808 5.31366 2.77615 5.16276 2.84615C4.02543 3.375 2.6466 4.45846 2.6466 7.51346C2.6449 10.8462 2.02735 11.4615 1.15264 12.6704C0.790219 13.1712 1.10768 13.9231 1.74157 13.9231H12.2626C12.8931 13.9231 13.2086 13.1688 12.8482 12.6704Z"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="sidebar__containerButton">
            <button className="button" onClick={closeSideBar}>
              Regresar
            </button>
          </div>
        </div>
      </aside>

      <div className="container__button">
        <button className="navbar__button" onClick={() => setIsOpen(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.8rem"
            height="1.8rem"
            viewBox="0 0 24 24"
          >
            <path fill="white" d="M3 18v-2h18v2zm0-5v-2h18v2zm0-5V6h18v2z" />
          </svg>
        </button>
      </div>

      <div
        className={`overlay ${isOpen ? "active" : ""}`}
        onClick={closeSideBar}
      ></div>

      {
        isOpenSignIn && (<SignIn setIsOpenSignIn={setIsOpenSignIn} setIsOpenSignUp={setIsOpenSignUp}/>)
      }

      {isOpenSignUp && (<SignUp setIsOpenSignUp={setIsOpenSignUp} setIsOpenSignIn={setIsOpenSignIn}/>)}
    </>
  );
}
