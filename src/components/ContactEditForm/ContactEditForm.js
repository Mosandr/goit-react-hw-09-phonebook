import { useState } from "react";
import { connect } from "react-redux";
import operations from "../../redux/contacts/contacts-operations";
import { getEditItem, getItems } from "../../redux/contacts/contacts-selectors";
import shortId from "shortid";
import styles from "./ContactEditForm.module.scss";
import { Button } from "react-bootstrap";

const ContactEditForm = ({ editContact, onSubmit }) => {
  const [user, setUser] = useState({
    name: editContact.name,
    number: editContact.number,
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

  const { name, number } = user;

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
        Edit contact
      </Button>
    </form>
  );
};

const mapStateToProps = (state) => ({
  editContact: getEditItem(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (contact) => dispatch(operations.editContact(contact)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactEditForm);
