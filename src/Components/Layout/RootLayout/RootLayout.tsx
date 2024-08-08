import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import classes from "./RootLayout.module.css";
import Navbar from "../NavBar/Navbar";
import Footer from "../Footer/Footer";

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
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
