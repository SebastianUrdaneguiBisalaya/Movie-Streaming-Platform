import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style/index.css";
import "@fontsource/poppins";
import { RouterProvider} from "react-router-dom";
import { SearchContextProvider } from "./context/searchMovieProvider.tsx";
import { UserDataProvider } from "./context/userDataProvider.tsx";
import { router } from "./router/router.tsx";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserDataProvider>
      <SearchContextProvider>
        <RouterProvider router={router} />
      </SearchContextProvider>
    </UserDataProvider>
  </StrictMode>
);
