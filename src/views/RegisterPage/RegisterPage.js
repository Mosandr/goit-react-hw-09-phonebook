//registration form

import { useState } from "react";
import { connect } from "react-redux";
import shortId from "shortid";
import authOperations from "../../redux/auth/auth-operations";

import Container from "../../components/Container";
import styles from "./RegisterPage.module.scss";
import { Button } from "react-bootstrap";

const RegisterPage = ({ onSubmit }) => {
  const [name, setName] = useState("");

  const handleNameGhange = (event) => {
    setName(event.target.value);
  };

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
    const userData = { name, email, password };
    onSubmit(userData);
  };

  const idForName = shortId.generate();
  const idForEmail = shortId.generate();
  const idForPassword = shortId.generate();

  return (
    <Container>
      <h1>Registration</h1>
      <form className={styles.RegisterForm} onSubmit={handleSubmit}>
        <label htmlFor={idForName}>Name</label>
        <input
          className={styles.input}
          id={idForName}
          onChange={handleNameGhange}
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
          Register
        </Button>
      </form>
    </Container>
  );
};

const mapDispatchToProps = {
  onSubmit: authOperations.register,
};

export default connect(null, mapDispatchToProps)(RegisterPage);
