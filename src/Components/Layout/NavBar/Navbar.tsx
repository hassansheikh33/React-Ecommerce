import { Form, Link, NavLink } from "react-router-dom";
import classes from "./Navbar.module.css";
import person from "../../../assets/person.svg";
import cart from "../../../assets/cart.svg";
import { getToken } from "../../../Token/util";

export default function Navbar() {
  const token = getToken();
  return (
    <nav className={classes.nav}>
      <Link to="/" className={classes.link}>
        <h1 className={classes.h1}>
          React<span className={classes.red}>Commerce</span>
        </h1>
      </Link>
      <div className={classes.navMenu}>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${classes.active} ${classes.link} ${classes.navItem}`
              : `${classes.link} ${classes.navItem}`
          }
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${classes.active} ${classes.link} ${classes.navItem}`
              : `${classes.link} ${classes.navItem}`
          }
          to="/shop"
        >
          Shop
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${classes.active} ${classes.link} ${classes.navItem}`
              : `${classes.link} ${classes.navItem}`
          }
          to="/contactUs"
        >
          Contact Us
        </NavLink>
        {!token && (
          <Link
            to="/auth?mode=login"
            className={`${classes.link} ${classes.auth}`}
          >
            <img className={classes.icon} src={person} alt="person icon" />
          </Link>
        )}
        {token && (
          <Form
            method="POST"
            action="/logout"
            className={`${classes.link} ${classes.logout} ${classes.navItem}`}
          >
            <button>Logout</button>
          </Form>
        )}
        {token && (
          <Link className={`${classes.link} ${classes.cart}`} to="/cart">
            <img className={classes.icon} src={cart} alt="cart icon" />
          </Link>
        )}
      </div>
    </nav>
  );
}
