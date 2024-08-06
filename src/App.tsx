import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./Components/Layout/RootLayout/RootLayout";
import ErrorElement from "./Components/Error/ErrorElement";
import { lazy } from "react";
import { productsLoader } from "./Pages/ProductsPage";

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
        path: "/shop",
        Component: lazy(() => import("./Pages/ProductsPage")),
        loader: productsLoader,
        children: [
          {
            path: "/shop/:productId",
            Component: lazy(() => import("./Pages/ProductDescription")),
          },
        ],
      },
      {
        path: "/cart",
        Component: lazy(() => import("./Pages/CartPage")),
      },
      {
        path: "/contactUs",
        Component: lazy(() => import("./Pages/ContactUsPage")),
      },
      {
        path: "/auth",
        Component: lazy(() => import("./Pages/AuthenticationPage")),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
