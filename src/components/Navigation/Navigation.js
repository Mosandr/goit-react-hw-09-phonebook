import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import routes from "../../routes";
import { getIsAuthenticated } from "../../redux/auth/auth-selectors";
import styles from "./Navigation.module.scss";

const Navigation = ({ isAuthenticated }) => {
  return (
    <ul className={styles.navigation}>
      <li className={styles.navItem}>
        <NavLink
          exact
          to={routes.home}
          className={styles.navLink}
          activeClassName={styles.activeLink}
        >
          Home
        </NavLink>
      </li>
      {isAuthenticated && (
        <li className={styles.navItem}>
          <NavLink
            to={routes.contacts}
            className={styles.navLink}
            activeClassName={styles.activeLink}
          >
            Contacts
          </NavLink>
        </li>
      )}
    </ul>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: getIsAuthenticated(state),
});

export default connect(mapStateToProps)(Navigation);
