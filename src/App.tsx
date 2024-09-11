import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { logoutAction, logoutLoader } from "./Pages/Logout.tsx";
import RootLayout from "./Components/Layout/RootLayout/RootLayout";
import ErrorElement from "./Components/Error/ErrorElement";
import { lazy } from "react";
import { AllProductsLoader } from "./Pages/AllProductsPage.tsx";
import { cartLoader } from "./Pages/CartPage";
import { authLoader } from "./Pages/AuthenticationPage";
import { orderLoader } from "./Pages/Order.tsx";
import { adminLoginLoader } from "./Pages/AdminLoginPage.tsx";
import { adminLoader } from "./Pages/Admin.tsx";
import { editProductLoader } from "./Pages/AdminEditProductPage.tsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      id: "root",
      loader: AllProductsLoader,
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
          Component: lazy(() => import("./Pages/AllProductsPage.tsx")),
        },
        {
          path: "/shop/category/:categoryName",
          Component: lazy(() => import("./Pages/CategoryProductsPage.tsx")),
        },
        {
          path: "/shop/category/:categoryName/:productId",
          Component: lazy(() => import("./Pages/ProductDescriptionPage.tsx")),
        },
        {
          path: "/cart",
          loader: cartLoader,
          Component: lazy(() => import("./Pages/CartPage")),
          children: [
            {
              path: "/cart/order",
              Component: lazy(() => import("./Pages/Order.tsx")),
              loader: orderLoader,
            },
          ],
        },
        {
          path: "/contactUs",
          Component: lazy(() => import("./Pages/ContactUsPage")),
        },
        {
          path: "/auth",
          Component: lazy(() => import("./Pages/AuthenticationPage")),
          loader: authLoader,
        },
        {
          path: "/logout",
          loader: logoutLoader,
          action: logoutAction,
        },
        {
          path: "/adminLogin",
          loader: adminLoginLoader,
          Component: lazy(() => import("./Pages/AdminLoginPage.tsx")),
        },
        {
          path: "/admin",
          Component: lazy(() => import("./Pages/Admin.tsx")),
          loader: adminLoader,
          children: [
            {
              path: "/admin/dashboard",
              Component: lazy(() => import("./Pages/AdminDashboardPage.tsx")),
            },
            {
              path: "/admin/users",
              Component: lazy(() => import("./Pages/AdminUsersPage.tsx")),
            },
            {
              path: "/admin/products",
              Component: lazy(() => import("./Pages//AdminProductsPage.tsx")),
            },
            {
              path: "/admin/products/new",
              Component: lazy(() => import("./Pages/AdminNewProductPage.tsx")),
            },
            {
              path: "/admin/products/edit/:editId",
              loader: editProductLoader,
              Component: lazy(() => import("./Pages/AdminEditProductPage.tsx")),
            },
          ],
        },
      ],
    },
  ],
  {
    basename: "/React-Ecommerce",
  }
);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
