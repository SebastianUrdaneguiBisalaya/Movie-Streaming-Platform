import { useState} from "react";

export const SignUp = ({setIsOpenSignUp, setIsOpenSignIn}:{setIsOpenSignUp: React.Dispatch<React.SetStateAction<boolean>>, setIsOpenSignIn: React.Dispatch<React.SetStateAction<boolean>>}) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const [existUser, setExistUser] = useState(false);

    const handleSignUp = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            try {
                const resultLocalStorage = localStorage.getItem("userMovieStreaming");
                if (resultLocalStorage) {
                    setExistUser(true);
                    return;
                }
                const user = {
                    username: username,
                    password: password,
                }
                localStorage.setItem("userMovieStreaming", JSON.stringify(user));
            } catch (error) {
                throw new Error(`Username or password is incorrect ${error}`);
            } finally {
                setIsLoading(false);
            }
        }, 2000)
    }

    const handleGoToSignIn = () => {
        setIsOpenSignUp(false);
        setIsOpenSignIn(true);
    }

    return (
      <div className="modal__signIn">
          <div className="modal__signIn--container">
              <div className="modal__signIn--container--content">
                  <div className="modal__button--goBack">
                      <button className="button__goBack" onClick={() => setIsOpenSignUp(false)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 1024 1024"><path fill="#ffffff" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64"/><path fill="#ffffff" d="m237.248 512l265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312z"/></svg>
                      </button>
                  </div>
                  <h4 className="modal__title">Welcome to Movie Streaming Platform! 🔥</h4>
                  <p className="modal__section">Sign Up</p>
                  <form className="modal__form" action="" onSubmit={handleSignUp}>
                    <label htmlFor="email">Email</label>
                    <input className="modal__input--email" id="email" required type="text" placeholder="youremail@gmail.com" onChange={(event) => setUsername(event.target.value)}/>
                    <label htmlFor="password">Password</label>
                    <input className="modal__input--password" id="password" required type="password" placeholder="yourpassword" onChange={(event) => setPassword(event.target.value)}/>
                    <div className="modal__button--login">
                        <button type="submit" className="button__login">{`${isLoading ? "Loading..." : "I want to register"}`}</button>
                    </div>
                  </form>
                  {
                    existUser && (
                        <h5>You don't need to create a new account because you already have an account with us! 🥳</h5>
                    )
                  }
                  <button className="button__goToSignIn" onClick={() => handleGoToSignIn()}>Go To Sign In</button>
              </div>
          </div>
      </div>
    )
  }
