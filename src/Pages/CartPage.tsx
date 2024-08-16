import { LoaderFunction, Outlet, redirect } from "react-router-dom";
import Cart from "../Components/Cart/Cart";
import { getToken } from "../Util/token";
import store from "../store/redux-store";
import { uiActions } from "../store/ui-slice";

export default function CartPage() {
  return <Cart />;
}

export const cartLoader: LoaderFunction = async () => {
  const token = getToken();
  if (token && token !== "token expired") {
    store.dispatch(uiActions.setOrderFormShown(false));
    return <Outlet />;
  } else {
    return redirect("/auth?mode=login");
  }
};
