import { LoaderFunction } from "react-router-dom";
import Cart from "../Components/Cart/Cart";

export default function CartPage() {
  return <Cart />;
}

export const cartLoader: LoaderFunction = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    return token;
  } else {
    return null;
  }
};
