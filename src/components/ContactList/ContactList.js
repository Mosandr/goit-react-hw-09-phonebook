import { Component } from "react";
import { connect } from "react-redux";

import operations from "../../redux/contacts/contacts-operations";
import { onEdit } from "../../redux/contacts/contacts-actions";
import {
  getFilteredItems,
  getIsEdit,
} from "../../redux/contacts/contacts-selectors";

import PropTypes from "prop-types";
import styles from "./ContactList.module.scss";
import { Button } from "react-bootstrap";

class ContactList extends Component {
  componentDidMount() {
    this.props.fetchContacts();
  }

  render() {
    const { contacts, onDelete, onEditClick } = this.props;
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
  }
}

const mapStateToProps = (state) => {
  return {
    contacts: getFilteredItems(state),
    isEdit: getIsEdit(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  onDelete: (id) => dispatch(operations.deleteContact(id)),
  onEditClick: (id) => dispatch(onEdit(id)),
  fetchContacts: () => dispatch(operations.fetchContacts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);

PropTypes.ContactList = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),

  onDelete: PropTypes.func.isRequired,
};
