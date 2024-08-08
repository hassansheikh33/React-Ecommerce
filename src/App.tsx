import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./Components/Layout/RootLayout/RootLayout";
import ErrorElement from "./Components/Error/ErrorElement";
import { lazy } from "react";
import { CategoryProductsLoader } from "./Pages/CategoryProductsPage.tsx";
import { AllProductsLoader } from "./Pages/AllProductsPage.tsx";
import { singleProductLoader } from "./Pages/ProductDescriptionPage.tsx";
import { cartLoader } from "./Pages/CartPage";

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
        loader: () => redirect("/shop/category/all"),
      },
      {
        path: "/shop/category",
        loader: () => redirect("/shop/category/all"),
      },
      {
        path: "/shop/category/all",
        loader: AllProductsLoader,
        Component: lazy(() => import("./Pages/AllProductsPage.tsx")),
      },
      {
        path: "/shop/category/:categoryName",
        loader: CategoryProductsLoader,
        Component: lazy(() => import("./Pages/CategoryProductsPage.tsx")),
      },
      {
        path: "/shop/category/:categoryName/:productId",
        loader: singleProductLoader,
        Component: lazy(() => import("./Pages/ProductDescriptionPage.tsx")),
      },
      {
        path: "/cart",
        loader: cartLoader,
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
