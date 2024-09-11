import { LoaderFunction, redirect } from "react-router-dom";
import Login from "../Components/Admin/Login/Login";
import store from "../store/redux-store";
import { uiActions } from "../store/ui-slice";
import { getAdminToken } from "../Util/token";
import { setNofication } from "../Util/notification";
import { Helmet } from "react-helmet";

export default function AdminLogin() {
  return (
    <>
      <Helmet>
        <title>Admin Login</title>
        <meta
          name="description"
          content="Login Page for admins of React-Ecommerce"
        />
      </Helmet>
      <Login />;
    </>
  );
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
