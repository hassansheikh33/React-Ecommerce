import { LoaderFunction, Outlet, redirect } from "react-router-dom";
import Cart from "../Components/Cart/Cart";
import { getToken } from "../Util/token";
import store from "../store/redux-store";
import { uiActions } from "../store/ui-slice";
import { Helmet } from "react-helmet";

export default function CartPage() {
  return (
    <>
      <Helmet>
        <title>Cart</title>
        <meta name="description" content="View your cart, make an order!" />
      </Helmet>
      <Cart />;
    </>
  );
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
