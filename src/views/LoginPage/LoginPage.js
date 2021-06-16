// login form

import { useState } from "react";
import { connect } from "react-redux";
import shortId from "shortid";

import Container from "../../components/Container";
import styles from "./LoginPage.module.scss";
import { Button } from "react-bootstrap";

import authOperations from "../../redux/auth/auth-operations";

const LoginPage = ({ onSubmit }) => {
  const [email, setEmail] = useState("");

  const handleEmailGhange = (event) => {
    setEmail(event.target.value);
  };

  const [password, setPassword] = useState("");

  const handlePasswordGhange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = { email, password };
    onSubmit(userData);
  };

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
          onChange={handleEmailGhange}
          type="email"
          name="email"
          value={email}
          required
        />

        <label htmlFor={idForPassword}>Password</label>
        <input
          className={styles.input}
          id={idForPassword}
          onChange={handlePasswordGhange}
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
