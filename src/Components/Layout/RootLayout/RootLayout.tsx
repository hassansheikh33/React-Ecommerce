import { Suspense, useEffect } from "react";
import { Outlet, redirect, useSubmit } from "react-router-dom";
import classes from "./RootLayout.module.css";
import Navbar from "../NavBar/Navbar";
import Footer from "../Footer/Footer";
import Notification from "../../UI/Notification/Notification";
import { getDuration, getToken } from "../../../Token/util";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/redux-store";
import { uiActions } from "../../../store/ui-slice";

export default function RootLayout() {
  const submit = useSubmit();
  const token = getToken();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!token) {
      return;
    } else {
      const duration = getDuration();
      if (duration) {
        if (duration <= 0) {
          dispatch(
            uiActions.addNotification({
              title: "Session expired! Please login again",
              type: "error",
            })
          );
          setTimeout(() => dispatch(uiActions.removeNotification()), 2000);
          submit(null, { method: "POST", action: "/logout" });
        }

        setTimeout(() => {
          dispatch(
            uiActions.addNotification({
              title: "Session expired! Please login again",
              type: "error",
            })
          );
          setTimeout(() => dispatch(uiActions.removeNotification()), 2000);
          submit(null, { method: "POST", action: "/logout" });
        }, duration);
      }
    }
  }, [token]);

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className={classes.content}>
        <Suspense
          fallback={
            <div className={classes.FallbackContainer}>
              <h1>Loading.... </h1>
              <div className={classes.spinner}></div>
            </div>
          }
        >
          <Notification />
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export const logoutAction = () => {
  localStorage.clear();
  return redirect("/auth?mode=login");
};
