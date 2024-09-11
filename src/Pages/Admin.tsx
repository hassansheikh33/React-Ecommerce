import { LoaderFunction, Outlet, redirect } from "react-router-dom";
import { getAdminToken } from "../Util/token";
import { setNofication } from "../Util/notification";
import store from "../store/redux-store";
import {
  listenToAdminChanges,
  listenToOrdersChanges,
  listenToProductsChanges,
  listenToUsersChanges,
} from "../store/admin-thunks";

const AdminChildren = () => {
  return <Outlet />;
};
export default AdminChildren;

export const adminLoader: LoaderFunction = () => {
  const adminToken = getAdminToken();
  if (adminToken && adminToken !== "user" && adminToken !== "token expired") {
    store.dispatch(listenToAdminChanges());
    store.dispatch(listenToOrdersChanges());
    store.dispatch(listenToProductsChanges());
    store.dispatch(listenToUsersChanges());
    return null;
  } else {
    setNofication("error", "Unauthenticated");
    return redirect("/adminLogin");
  }
};
