import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import classes from "./RootLayout.module.css";
import Navbar from "../NavBar/Navbar";
import Footer from "../Footer/Footer";
import Notification from "../../UI/Notification/Notification";

export default function RootLayout() {
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
