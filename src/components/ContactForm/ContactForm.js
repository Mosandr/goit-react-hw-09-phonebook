import { useState } from "react";
import { connect } from "react-redux";
import operations from "../../redux/contacts/contacts-operations";
import { getItems } from "../../redux/contacts/contacts-selectors";
import shortId from "shortid";
import styles from "./ContactForm.module.scss";
import { Button } from "react-bootstrap";

const ContactForm = ({ contacts, onSubmit }) => {
  const [user, setUser] = useState({
    name: "",
    number: "",
  });

  const { name, number } = user;

  const handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const isContainsInputedName = () => {
    const inputedName = name;
    return !!contacts.find(
      (contact) => contact.name.toLowerCase() === inputedName.toLowerCase()
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isContainsInputedName()) {
      alert(`${user.name} is already in contacts`);
      return;
    }

    const data = user;
    onSubmit(data);
    setUser({ name: "", number: "" });
  };

  const idForName = shortId.generate();
  const idForNumber = shortId.generate();

  return (
    <form className={styles.ContactForm} onSubmit={handleSubmit}>
      <label className={styles.label} htmlFor={idForName}>
        Name
      </label>
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
      <label className={styles.label} htmlFor={idForNumber}>
        Number
      </label>
      <input
        className={styles.input}
        id={idForNumber}
        onChange={handleChange}
        type="tel"
        name="number"
        value={number}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
        required
      />
      <Button variant="success" type="submit">
        Add contact
      </Button>
    </form>
  );
};

const mapStateToProps = (state) => ({
  contacts: getItems(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (contact) => dispatch(operations.addContact(contact)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
