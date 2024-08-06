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
      <div className={classes.upperContainer}>
        <div className={classes.links}>
          <Link to="/">Home</Link>
          <Link to="/contactUs">Contact Us</Link>
          <Link to="/shop">Shop</Link>
        </div>
        <div className={classes.newsLetter}>
          <h5>Subscribe to our newsletter</h5>
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
        <a className={classes.name} href="github.com/hassansheikh33">
          Muhammad Hassan Bilal
        </a>
      </p>
    </footer>
  );
}
