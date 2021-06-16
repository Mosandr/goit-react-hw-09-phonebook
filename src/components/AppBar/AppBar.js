import { connect } from "react-redux";

import Container from "../Container";
import Navigation from "../Navigation";
import AuthNav from "../AuthNav";
import UserMenu from "../UserMenu";
import { getIsAuthenticated } from "../../redux/auth/auth-selectors";
import styles from "./AppBar.module.scss";

const Header = ({ isAuthenticated }) => {
  return (
    <div className={styles.Header}>
      <Container>
        <div className={styles.AppBar}>
          <Navigation />
          {isAuthenticated ? <UserMenu /> : <AuthNav />}
        </div>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: getIsAuthenticated(state),
});

export default connect(mapStateToProps)(Header);
