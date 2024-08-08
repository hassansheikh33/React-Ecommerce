import { Link, NavLink } from "react-router-dom";
import classes from "./Navbar.module.css";
import person from "../../../assets/person.svg";
import cart from "../../../assets/cart.svg";

export default function Navbar() {
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
        <Link to="/auth" className={`${classes.link} ${classes.auth}`}>
          <img className={classes.icon} src={person} alt="person icon" />
        </Link>
        <Link className={`${classes.link} ${classes.cart}`} to="/cart">
          <img className={classes.icon} src={cart} alt="cart icon" />
        </Link>
      </div>
    </nav>
  );
}
