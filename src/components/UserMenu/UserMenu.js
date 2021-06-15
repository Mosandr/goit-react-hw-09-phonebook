import { connect } from "react-redux";
import authOperations from "../../redux/auth/auth-operations";
import { getUserEmail } from "../../redux/auth/auth-selectors";
import { Button } from "react-bootstrap";
import styles from "./UserMenu.module.scss";

const UserMenu = ({ email, onLogOut }) => {
  return (
    <div>
      <span className={styles.email}>{email}</span>
      <Button variant="warning" onClick={onLogOut}>
        LogOut
      </Button>
    </div>
  );
};
const mapStateToProps = (state) => ({
  email: getUserEmail(state),
});

const mapDispatchToProps = {
  onLogOut: authOperations.logOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
