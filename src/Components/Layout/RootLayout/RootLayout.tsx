import { Suspense, useEffect } from "react";
import { Outlet, useLocation, useSubmit } from "react-router-dom";
import classes from "./RootLayout.module.css";
import Navbar from "../NavBar/Navbar";
import Footer from "../Footer/Footer";
import Notification from "../../UI/Notification/Notification";
import { getDuration, getToken, userExists } from "../../../Util/token";
import { setNofication } from "../../../Util/notification";

export default function RootLayout() {
  const token = getToken();
  const submit = useSubmit();

  useEffect(() => {
    if (!token) {
      return;
    } else {
      const duration = getDuration();
      if (duration && duration > 0) {
        setTimeout(() => {
          const curToken = getToken();
          if (curToken && token !== "token expired") {
            // this condition refrains from executing the below code if the user is already logged out
            // at the time of token expiration (which was set when user logs in or signs up)
            setNofication("error", "Session expired, please login again");
            submit(null, { action: "/logout", method: "POST" });
            return;
          }
        }, duration);
      } else if (duration && duration <= 0) {
        setNofication("error", "Session expired, please login again");
        submit(null, { action: "/logout", method: "POST" });
      }
    }
  }, [token, submit, setNofication]);

  useEffect(() => {
    const validate = async () => {
      if (token) {
        const response = await userExists(token);
        if (!response) {
          setNofication("error", "Unauthenticated User");
          submit(null, { action: "/logout", method: "POST" });
        }
      }
    };
    validate();
  }, [token]);

  const pathname = useLocation().pathname;

  useEffect(() => {
    if (!pathname.includes("order")) {
      window.scroll({ top: 0, behavior: "smooth" });
    }
  }, [pathname]);

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
