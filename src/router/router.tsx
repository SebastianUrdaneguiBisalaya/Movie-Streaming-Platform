// import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Home, DetailMovie, Error404, Movies, Series, Animations } from "../pages";
import App from "../App";
import { createBrowserRouter } from "react-router-dom";
import { ProtectedRouter } from "./ProtectedRouter";

// export const router = createBrowserRouter(
//     createRoutesFromElements(
//       <Route path="/" element={<App />}>
//         <Route path="/" element={<Home />} />
//         <Route path="/detail/:id" element={<DetailMovie />} />
//         <Route path="/movies" element={<Movies />} />
//         <Route path="/series" element={<Series />} />
//         <Route path="/animation" element={<Animations />} />
//         <Route path="*" element={<Error404 />} />
//       </Route>
//     )
//   )

export const router = createBrowserRouter([
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
    element: <ProtectedRouter />,
    children: [
      {
        path: "/detail/:id",
        element: <DetailMovie />,
      }
    ]
  },
  {
    path: "/movies",
    element: <ProtectedRouter />,
    children: [
      {
        path: "/movies",
        element: <Movies />,
      }
    ]
  },
  {
    path: "/series",
    element: <ProtectedRouter />,
    children: [
      {
        path: "/series",
        element: <Series />,
      }
    ]
  },
  {
    path: "/animation",
    element: <ProtectedRouter />,
    children: [
      {
        path: "/animation",
        element: <Animations />,
      }
    ]
  },
  {
    path: "/*",
    element: <Error404 />,
  }
]);