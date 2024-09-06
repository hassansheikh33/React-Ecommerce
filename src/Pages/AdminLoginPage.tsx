import { LoaderFunction, Outlet, redirect } from "react-router-dom";
import Login from "../Components/Admin/Login/Login";
import store from "../store/redux-store";
import { uiActions } from "../store/ui-slice";
import { getAdminToken } from "../Util/token";
import { setNofication } from "../Util/notification";

export default function AdminLogin() {
  return <Login />;
}

export const adminLoginLoader: LoaderFunction = async () => {
  const adminToken = getAdminToken();
  if (adminToken && adminToken !== "user") {
    setNofication("error", `You are already logged in as ${adminToken}`);
    return redirect("/admin/dashboard");
  }
  store.dispatch(uiActions.clearToken());
  store.dispatch(uiActions.setMode("user"));
  return null;
};

export const adminLoader = () => {
  const adminToken = getAdminToken();
  if (adminToken && adminToken !== "user" && adminToken !== "token expired") {
    return <Outlet />;
  }
  setNofication("error", "Unauthenticated");
  return redirect("/adminLogin");
};
