// login form

import { useState } from "react";
import { connect } from "react-redux";
import shortId from "shortid";

import Container from "../../components/Container";
import styles from "./LoginPage.module.scss";
import { Button } from "react-bootstrap";

import authOperations from "../../redux/auth/auth-operations";

const LoginPage = ({ onSubmit }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(user);
  };

  const { email, password } = user;

  const idForEmail = shortId.generate();
  const idForPassword = shortId.generate();

  return (
    <Container>
      <h1>Login</h1>
      <form className={styles.LoginForm} onSubmit={handleSubmit}>
        <label htmlFor={idForEmail}>Email</label>
        <input
          className={styles.input}
          id={idForEmail}
          onChange={handleChange}
          type="email"
          name="email"
          value={email}
          required
        />

        <label htmlFor={idForPassword}>Password</label>
        <input
          className={styles.input}
          id={idForPassword}
          onChange={handleChange}
          type="password"
          name="password"
          value={password}
          minLength="8"
          title="Пароль должен быть не менее 8 символов"
          required
        />
        <Button variant="success" type="submit">
          LogIn
        </Button>
      </form>
    </Container>
  );
};

const mapDispatchToProps = {
  onSubmit: authOperations.logIn,
};

export default connect(null, mapDispatchToProps)(LoginPage);
