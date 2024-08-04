import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./Components/Layout/RootLayout/RootLayout";
import ErrorElement from "./Components/Error/ErrorElement";
import { lazy } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorElement />,
    children: [
      {
        index: true,
        Component: lazy(() => import("./Pages/HomePage")),
      },
      {
        path: "/products",
        Component: lazy(() => import("./Pages/ProductsPage")),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
