import { LoaderFunction, Outlet, redirect } from "react-router-dom";
import Authentication, {
  getToken,
} from "../Components/Authentication/Authentication";

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
