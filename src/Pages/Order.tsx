import { LoaderFunction, redirect } from "react-router-dom";
import OrderForm from "../Components/Cart/OrderForm/OrderForm";
import { UserData } from "../types";
import { doc, getDoc } from "firebase/firestore";
import { fs } from "../Config/firebaseConfig";
import { getToken } from "../Util/token";
import store from "../store/redux-store";
import { uiActions } from "../store/ui-slice";
import { Helmet } from "react-helmet";

export default function Order() {
  return (
    <>
      <Helmet>
        <title>Order</title>
        <meta
          name="description"
          content="Provide your details and place an order! Our team will contact you for confirming your order"
        />
      </Helmet>
      <OrderForm />
    </>
  );
}

export const orderLoader: LoaderFunction = async () => {
  const state = store.getState();
  const token = getToken();
  if (token && token !== "token expired") {
    if (!state.ui.orderFormShown) {
      store.dispatch(uiActions.setOrderFormShown(true));
    }
    const userDocRef = doc(fs, "users", token);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const data = userDoc.data() as UserData;
      return {
        name: data.name,
        email: data.email,
      };
    }
  } else {
    return redirect("/auth?mode=login");
  }
};
