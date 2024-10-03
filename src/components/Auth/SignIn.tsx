import { useState, useContext } from "react";
import { UserDataContext } from "../../context/userData";

export const SignIn = ({setIsOpenSignIn, setIsOpenSignUp}:{setIsOpenSignIn: React.Dispatch<React.SetStateAction<boolean>>, setIsOpenSignUp: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const {setUserData} = useContext(UserDataContext);

    const handleSignIn = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            try {
                const resultLocalStorage = localStorage.getItem("userMovieStreaming");
                if (!resultLocalStorage) {
                    setIsOpenSignIn(false);
                    setIsOpenSignUp(true);
                    return;
                }
                const user = {
                    username: username,
                    password: password,
                }
                localStorage.setItem("userMovieStreaming", JSON.stringify(user));
                setUserData([user]);
                console.log(user)
                const prueba = JSON.parse(localStorage.getItem("userMovieStreaming")!);
                console.log(prueba);
            } catch (error) {
                throw new Error(`Username or password is incorrect ${error}`);
            } finally {
                setIsLoading(false);
            }
        }, 2000)
    }
  return (
    <div className="modal__signIn">
        <div className="modal__signIn--container">
            <div className="modal__signIn--container--content">
                <div className="modal__button--goBack">
                    <button className="button__goBack" onClick={() => setIsOpenSignIn(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 1024 1024"><path fill="#ffffff" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64"/><path fill="#ffffff" d="m237.248 512l265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312z"/></svg>
                    </button>
                </div>
                <h4 className="modal__title">Welcome again to Movie Streaming Platform! 🔥</h4>
                <p className="modal__section">Sign In</p>
                <form action="" className="modal__form" onSubmit={handleSignIn}>
                    <label htmlFor="email">Email</label>
                    <input className="modal__input--email" required id="email" type="text" autoComplete="email" placeholder="youremail@gmail.com" onChange={(event) => setUsername(event.target.value)} />
                    <label htmlFor="password">Password</label>
                    <input className="modal__input--password" required id="password" type="password" autoComplete="new-password" placeholder="yourpassword" onChange={(event) => setPassword(event.target.value)} />
                    <div className="modal__button--login">
                        <button type="submit" className="button__login">{`${isLoading ? "Loading..." : "Login"}`}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}