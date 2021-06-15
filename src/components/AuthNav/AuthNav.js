import { NavLink } from "react-router-dom";
import routes from "../../routes";
import styles from "./AuthNav.module.scss";

const AuthNav = () => {
  return (
    <ul className={styles.AuthNav}>
      <li className={styles.navItem}>
        <NavLink
          to={routes.login}
          className={styles.navLink}
          activeClassName={styles.activeLink}
        >
          Login
        </NavLink>
      </li>
      <li className={styles.navItem}>
        <NavLink
          to={routes.register}
          className={styles.navLink}
          activeClassName={styles.activeLink}
        >
          Register
        </NavLink>
      </li>
    </ul>
  );
};

export default AuthNav;
