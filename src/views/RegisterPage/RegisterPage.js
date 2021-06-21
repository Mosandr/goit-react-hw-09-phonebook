//registration form

import { useState } from "react";
import { connect } from "react-redux";
import shortId from "shortid";
import authOperations from "../../redux/auth/auth-operations";

import Container from "../../components/Container";
import styles from "./RegisterPage.module.scss";
import { Button } from "react-bootstrap";

const RegisterPage = ({ onSubmit }) => {
  const [user, setUser] = useState({
    name: "",
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

  const { name, email, password } = user;

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
          onChange={handleChange}
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
