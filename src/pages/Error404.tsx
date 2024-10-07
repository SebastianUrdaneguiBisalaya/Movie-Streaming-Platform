import { Link } from "react-router-dom"

export const Error404 = (): JSX.Element => {
    return (
        <div className="container__error404">
            <h2>404</h2>
            <p>Something went wrong</p>
            <Link to={"/"} className="error__goBack">Go back to home</Link>
        </div>
    )
}