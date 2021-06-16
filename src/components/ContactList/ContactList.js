import { useEffect } from "react";
import { connect } from "react-redux";

import operations from "../../redux/contacts/contacts-operations";
import { onEdit } from "../../redux/contacts/contacts-actions";
import { getFilteredItems } from "../../redux/contacts/contacts-selectors";

import styles from "./ContactList.module.scss";
import { Button } from "react-bootstrap";

const ContactList = ({ contacts, fetchContacts, onDelete, onEditClick }) => {
  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  return (
    <ul className={styles.ContactList}>
      {contacts.map((contact) => {
        const { id, name, number } = contact;
        return (
          <li key={id} className={styles.item}>
            <p className={styles.contactInfo}>
              <span className={styles.name}>{name}:</span>
              <span> {number}</span>
            </p>
            <div>
              <Button
                variant="success"
                className={styles.editButton}
                onClick={() => onEditClick(id)}
              >
                Edit
              </Button>

              <Button variant="danger" onClick={() => onDelete(id)}>
                Delete
              </Button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

const mapStateToProps = (state) => {
  return {
    contacts: getFilteredItems(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  onDelete: (id) => dispatch(operations.deleteContact(id)),
  onEditClick: (id) => dispatch(onEdit(id)),
  fetchContacts: () => dispatch(operations.fetchContacts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
