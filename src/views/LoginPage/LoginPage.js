// login form

import { Component } from "react";
import { connect } from "react-redux";
import shortId from "shortid";

import Container from "../../components/Container";
import styles from "./LoginPage.module.scss";
import { Button } from "react-bootstrap";

import authOperations from "../../redux/auth/auth-operations";

class LoginPage extends Component {
  state = {
    email: "",
    password: "",
  };

  handleGhange = (event) => {
    const { target } = event;
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const userData = this.state;
    this.props.onSubmit(userData);

    this.setState({
      email: "",
      password: "",
    });
  };

  render() {
    const { email, password } = this.state;

    const idForEmail = shortId.generate();
    const idForPassword = shortId.generate();

    return (
      <Container>
        <h1>Login</h1>
        <form className={styles.LoginForm} onSubmit={this.handleSubmit}>
          <label htmlFor={idForEmail}>Email</label>
          <input
            className={styles.input}
            id={idForEmail}
            onChange={this.handleGhange}
            type="email"
            name="email"
            value={email}
            required
          />

          <label htmlFor={idForPassword}>Password</label>
          <input
            className={styles.input}
            id={idForPassword}
            onChange={this.handleGhange}
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
  }
}

const mapDispatchToProps = {
  onSubmit: authOperations.logIn,
};

export default connect(null, mapDispatchToProps)(LoginPage);
