import { Link, useNavigate } from "react-router-dom";
import classes from "./Footer.module.css";
import { FormEvent, useRef, useState } from "react";
import { setNofication } from "../../../Util/notification";

export default function Footer() {
  const navigate = useNavigate();
  const [compShown, setCompShown] = useState<boolean>(false);
  const [legalShown, setLegalShown] = useState<boolean>(false);
  const emailRef = useRef<HTMLInputElement>(null);
  function subscribeHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (
      (emailRef &&
        emailRef.current?.value.includes("@") &&
        emailRef.current?.value.includes("gmail.com")) ||
      emailRef.current?.value.includes("yahoo.com") ||
      emailRef.current?.value.includes("outlook.com")
    ) {
      setNofication("success", "Subscribed to NewsLetter!");
      navigate("/");
    } else {
      setNofication("error", "Please enter a valid Email!");
    }
  }
  return (
    <footer className={classes.footer}>
      <h1 className={classes.h1}>
        <Link
          to="/"
          onClick={() => {
            if (window.location.pathname === "/React-Ecommerce")
              window.scroll({ top: 0, behavior: "smooth" });
          }}
          className={classes.link}
        >
          React<span className={classes.red}>Commerce</span>
        </Link>
      </h1>
      <div className={classes.upperContainer}>
        <div className={classes.column}>
          <h3
            onClick={() => setCompShown((prevState) => !prevState)}
            className={classes.columnHeading}
          >
            Company {compShown ? "<" : ">"}
          </h3>
          <div
            className={`${classes.links} ${compShown ? classes.compShown : ""}`}
          >
            <Link className={classes.link} to="/">
              Home
            </Link>
            <Link className={classes.link} to="/shop/category/all">
              Shop
            </Link>
            <Link className={classes.link} to="/auth?mode=login">
              Login
            </Link>
            <Link className={classes.link} to="/auth?mode=signup">
              Signup
            </Link>
            <Link className={classes.link} to="/contactUs">
              Contact Us
            </Link>
          </div>
        </div>
        <div className={classes.column}>
          <h3
            onClick={() => setLegalShown((prevState) => !prevState)}
            className={classes.columnHeading}
          >
            Legal {legalShown ? "<" : ">"}
          </h3>
          <div
            className={`${classes.links} ${
              legalShown ? classes.legalShown : ""
            }`}
          >
            <Link
              target="_blank"
              className={classes.link}
              to="https://codeletdigital.com/about"
            >
              Company Policy
            </Link>
            <Link
              className={classes.link}
              target="_blank"
              to="https://www.linkedin.com/in/hassan-bilal-dev"
            >
              Terms & Conditions
            </Link>
            <Link
              className={classes.link}
              to="https://github.com/hassansheikh33/React-Ecommerce"
              target="_blank"
            >
              Terms of Use
            </Link>
            <Link
              target="_blank"
              className={classes.link}
              to="https://github.com/hassansheikh33/React-Ecommerce"
            >
              Copyright
            </Link>
            <Link className={classes.link} to="/admin/login">
              Admin Dashboard
            </Link>
          </div>
        </div>
        <div className={classes.newsLetter}>
          <h3 className={classes.columnHeading}>Subscribe to our newsletter</h3>
          <form onSubmit={subscribeHandler} className={classes.form}>
            <input
              className={classes.subEmailInput}
              type="email"
              placeholder="enter your email"
              ref={emailRef}
            />
            <button type="submit" className={classes.subBtn}>
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <hr className={classes.divider} />
      <p className={classes.credits}>
        Made with <span className={classes.love}>love</span> by{" "}
        <a
          className={classes.name}
          href="https://github.com/hassansheikh33"
          target="_blank"
        >
          Muhammad Hassan Bilal
        </a>
      </p>
    </footer>
  );
}
