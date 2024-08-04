import { Link, NavLink } from "react-router-dom";
import classes from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav>
      <Link to="/">
        <h1>React Commerce</h1>
      </Link>
      <div className={classes.mavMenu}>
        <NavLink
          className={(isActive) =>
            isActive ? `${classes.active} ${classes.navItem}` : classes.navItem
          }
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={(isActive) =>
            isActive ? `${classes.active} ${classes.navItem}` : classes.navItem
          }
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={(isActive) =>
            isActive ? `${classes.active} ${classes.navItem}` : classes.navItem
          }
          to="/"
        >
          Home
        </NavLink>
      </div>
      <div className={classes.rightMenu}>
        <p>cart</p>
      </div>
    </nav>
  );
}
