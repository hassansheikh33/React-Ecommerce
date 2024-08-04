import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import classes from "./RootLayout.module.css";

export default function RootLayout() {
  return (
    <>
      <header>
        <nav></nav>
      </header>
      <main>
        <Suspense
          fallback={
            <div className={classes.FallbackContainer}>
              <h1>Loading....</h1>
              <div className={classes.spinner}></div>
              <p>Please wait, the page will be loaded shortly</p>
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>
      <footer />
    </>
  );
}
