import { Link, NavLink, useNavigate } from "react-router-dom";
import classes from "./Navbar.module.css";
import person from "../../../assets/person.svg";
import cart from "../../../assets/cart.svg";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/redux-store";
import { uiActions } from "../../../store/ui-slice";
import { auth } from "../../../Config/firebaseConfig";

export default function Navbar() {
  const token = useSelector((state: RootState) => state.ui.token);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(uiActions.clearToken());
    navigate("/auth?mode=login");
    auth.signOut();
  };
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
          <a
            onClick={logoutHandler}
            className={`${classes.link} ${classes.logout} ${classes.navItem}`}
          >
            Logout
          </a>
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
