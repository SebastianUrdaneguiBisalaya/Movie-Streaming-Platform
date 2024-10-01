import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style/index.css";
import "@fontsource/poppins";
import { RouterProvider} from "react-router-dom";
import { SearchContextProvider } from "./context/searchMovieProvider.tsx";
import { router } from "./router/router.tsx";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SearchContextProvider>
      <RouterProvider router={router} />
    </SearchContextProvider>
  </StrictMode>
);
