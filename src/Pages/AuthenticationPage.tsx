import { LoaderFunction, Outlet, redirect } from "react-router-dom";
import Authentication from "../Components/Authentication/Authentication";
import { getToken } from "../Token/util";

export default function AuthenticationPage() {
  return <Authentication />;
}

export const authLoader: LoaderFunction = () => {
  const token = getToken();
  if (!token) {
    return <Outlet />;
  } else {
    return redirect("/");
  }
};
