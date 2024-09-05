import { Form, Link, NavLink } from "react-router-dom";
import classes from "./Navbar.module.css";
import person from "../../../assets/person.svg";
import cart from "../../../assets/cart.svg";
import { getAdminToken, getToken } from "../../../Util/token";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/redux-store";
import { uiActions } from "../../../store/ui-slice";

interface Props {
  closeNav: () => void;
}

export default function Navbar(props: Props) {
  const adminToken = getAdminToken();
  const token = getToken();

  const show = useSelector((state: RootState) => state.ui.navShown);

  const mode = useSelector((state: RootState) => state.ui.mode);

  const dispatch = useDispatch<AppDispatch>();

  const showMenu = () => dispatch(uiActions.toggleNav(true));
  return (
    <nav className={classes.nav}>
      <Link to="/" className={classes.link}>
        <h1 className={classes.h1}>
          React<span className={classes.red}>Commerce</span>
        </h1>
      </Link>
      {!show && (
        <div className={classes.menuBtn} onClick={showMenu}>
          <div className={classes.menuPiece}></div>
          <div className={`${classes.menuPiece} ${classes.middleBar}`}></div>
          <div className={classes.menuPiece}></div>
        </div>
      )}
      {show && (
        <div className={classes.crossBtn} onClick={props.closeNav}>
          X
        </div>
      )}
      <div
        className={`${classes.navMenu} ${show ? classes.show : ""}`}
        onClick={props.closeNav}
      >
        {mode === "user" && (
          <>
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
              <Link className={`${classes.link} ${classes.cart}`} to="/cart">
                <img className={classes.icon} src={cart} alt="cart icon" />
              </Link>
            )}
          </>
        )}
        {mode !== "user" && (
          <>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? `${classes.active} ${classes.link} ${classes.navItem}`
                  : `${classes.link} ${classes.navItem}`
              }
              to="/admin/dashboard"
            >
              Dashboard
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? `${classes.active} ${classes.link} ${classes.navItem}`
                  : `${classes.link} ${classes.navItem}`
              }
              to="/admin/users"
            >
              Users
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? `${classes.active} ${classes.link} ${classes.navItem}`
                  : `${classes.link} ${classes.navItem}`
              }
              to="/admin/products"
            >
              Products
            </NavLink>
          </>
        )}
        {(token || adminToken !== "user") && (
          <Form
            method="POST"
            action="/logout"
            className={`${classes.link} ${classes.logout} ${classes.navItem}`}
          >
            <button>Logout</button>
          </Form>
        )}
      </div>
    </nav>
  );
}
