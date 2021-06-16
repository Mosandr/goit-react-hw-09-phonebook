// add form, filter, contacts

import { Component } from "react";
import { connect } from "react-redux";
import {
  getLoading,
  getErrorMessage,
  getIsEdit,
} from "../../redux/contacts/contacts-selectors";

import Container from "../../components/Container";
import ContactForm from "../../components/ContactForm";
import ContactList from "../../components/ContactList";
import Filter from "../../components/Filter";
import EditModal from "../../components/EditModal";

const ContactsPage = ({ isLoading, errorMessage, isEdit }) => {
  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      {isEdit && <EditModal />}
      <Filter />
      <ContactList />
      {isLoading && <h2>Loading...</h2>}
      {errorMessage && <h2>{errorMessage}</h2>}
    </Container>
  );
};

const mapStateToProps = (state) => ({
  isLoading: getLoading(state),
  errorMessage: getErrorMessage(state),
  isEdit: getIsEdit(state),
});

export default connect(mapStateToProps, null)(ContactsPage);
