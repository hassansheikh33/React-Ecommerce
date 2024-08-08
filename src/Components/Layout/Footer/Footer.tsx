import { Link } from "react-router-dom";
import classes from "./Footer.module.css";
import { useRef } from "react";

export default function Footer() {
  const emailRef = useRef<HTMLInputElement>(null);
  function subscribeHandler() {
    if (
      (emailRef &&
        emailRef.current?.value.includes("@") &&
        emailRef.current?.value.includes("gmail.com")) ||
      emailRef.current?.value.includes("yahoo.com") ||
      emailRef.current?.value.includes("outlook.com")
    ) {
      //send email it to firebase/newsLetterEmails here
      console.log(emailRef.current?.value.trim());
    } else {
      console.log("please enter valid email");
    }
  }
  return (
    <footer className={classes.footer}>
      <h1 className={classes.h1}>
        <Link to="/" className={`${classes.link} ${classes.compName}`}>
          React<span className={classes.red}>Commerce</span>
        </Link>
      </h1>
      <div className={classes.upperContainer}>
        <div className={classes.links}>
          <h3 className={classes.columnHeading}>Company</h3>
          <Link className={classes.link} to="/">
            Home
          </Link>
          <Link className={classes.link} to="/shop">
            Shop
          </Link>
          <Link className={classes.link} to="/auth">
            Login/Signup
          </Link>
          <Link className={classes.link} to="/contactUs">
            Contact Us
          </Link>
        </div>
        <div className={classes.links}>
          <h3 className={classes.columnHeading}>Legal</h3>
          <Link className={classes.link} to="">
            Company Policy
          </Link>
          <Link className={classes.link} to="/contactUs">
            Terms & Conditions
          </Link>
          <Link className={classes.link} to="/shop">
            Terms of Use
          </Link>
          <Link className={classes.link} to="/auth">
            Copyright
          </Link>
        </div>
        <div className={classes.newsLetter}>
          <h3 className={classes.columnHeading}>Subscribe to our newsletter</h3>
          <form>
            <input
              className={classes.subEmailInput}
              type="email"
              placeholder="enter your email"
              ref={emailRef}
            />
            <button className={classes.subBtn} onClick={subscribeHandler}>
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
