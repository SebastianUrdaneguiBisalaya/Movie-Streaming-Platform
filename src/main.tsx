import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./style/index.css";
import "@fontsource/poppins";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, DetailMovie, Error404} from "./pages";
import { SearchContextProvider } from "./context/searchMovieProvider.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/detail/:id",
    element: <DetailMovie />,
  },
  {
    path: "/*",
    element: <Error404 />,
  }
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SearchContextProvider>
      <RouterProvider router={router} />
    </SearchContextProvider>
  </StrictMode>
);
