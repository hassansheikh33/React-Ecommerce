import { LoaderFunction, Outlet, redirect } from "react-router-dom";
import Authentication from "../Components/Authentication/Authentication";
import { getToken } from "../Util/token";

export default function AuthenticationPage() {
  return <Authentication />;
}

export const authLoader: LoaderFunction = () => {
  const token = getToken();
  if (!token || token === "token expired") {
    return <Outlet />;
  } else {
    return redirect("/");
  }
};
