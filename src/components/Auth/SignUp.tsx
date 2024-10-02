export const SignUp = ({setIsOpenSignUp}:{setIsOpenSignUp: React.Dispatch<React.SetStateAction<boolean>>}) => {
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
                  <label htmlFor="email">Email</label>
                  <input className="modal__input--email" id="email" type="text" placeholder="youremail@gmail.com" />
                  <label htmlFor="password">Password</label>
                  <input className="modal__input--password" id="password" type="password" placeholder="yourpassword"/>
                  <div className="modal__button--login">
                      <button className="button__login">I want to register</button>
                  </div>
              </div>
          </div>
      </div>
    )
  }