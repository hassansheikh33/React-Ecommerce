import { LoaderFunction, Outlet, redirect } from "react-router-dom";
import Cart from "../Components/Cart/Cart";
import { getToken } from "../Util/token";

export default function CartPage() {
  return <Cart />;
}

export const cartLoader: LoaderFunction = async () => {
  const token = getToken();
  if (token && token !== "token expired") {
    return <Outlet />;
  } else {
    return redirect("/auth?mode=login");
  }
};
