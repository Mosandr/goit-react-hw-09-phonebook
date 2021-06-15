//registration form

import { Component } from "react";
import { connect } from "react-redux";
import shortId from "shortid";
import authOperations from "../../redux/auth/auth-operations";

import Container from "../../components/Container";
import styles from "./RegisterPage.module.scss";
import { Button } from "react-bootstrap";

class RegisterPage extends Component {
  state = {
    name: "",
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
      name: "",
      email: "",
      password: "",
    });
  };

  render() {
    const { name, email, password } = this.state;
    const idForName = shortId.generate();
    const idForEmail = shortId.generate();
    const idForPassword = shortId.generate();

    return (
      <Container>
        <h1>Registration</h1>
        <form className={styles.RegisterForm} onSubmit={this.handleSubmit}>
          <label htmlFor={idForName}>Name</label>
          <input
            className={styles.input}
            id={idForName}
            onChange={this.handleGhange}
            type="text"
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
          />

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
            Register
          </Button>
        </form>
      </Container>
    );
  }
}

const mapDispatchToProps = {
  onSubmit: authOperations.register,
};

export default connect(null, mapDispatchToProps)(RegisterPage);
