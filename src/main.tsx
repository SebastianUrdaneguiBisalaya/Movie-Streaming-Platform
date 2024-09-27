import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./style/index.css";
import "@fontsource/poppins";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, DetailMovie, SearchMovies } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/detail",
        element: <DetailMovie />,
      },
      {
        path: "/search",
        element: <SearchMovies />,
      }
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
