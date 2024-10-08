import { redirect } from "react-router-dom";
import { getAdminToken, getToken } from "../Util/token";
import { uiActions } from "../store/ui-slice";
import store from "../store/redux-store";
import { setNofication } from "../Util/notification";

export const logoutAction = () => {
  const adminToken = getAdminToken();
  if (adminToken !== "user") {
    store.dispatch(uiActions.clearToken());
    setNofication("error", "Admin logged out!");
    return redirect("/adminLogin");
  }
  const token = getToken();
  if (token || token === "token expired") {
    store.dispatch(uiActions.clearToken());
    setNofication("error", "User logged out!");
    return redirect("/auth?mode=login");
  }
  return redirect("/");
};

export const logoutLoader = () => {
  const token = getToken();
  if (!token || token === "token expired") {
    setNofication("error", "You are already logged out");
    return redirect("/auth?mode=login");
  }
  return logoutAction();
};
