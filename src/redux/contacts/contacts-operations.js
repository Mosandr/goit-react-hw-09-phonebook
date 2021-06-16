import {
  addRequest,
  addSuccess,
  addError,
  deleteRequest,
  deleteSuccess,
  deleteError,
  fetchRequest,
  fetchSuccess,
  fetchError,
  editRequest,
  editSuccess,
  editError,
} from "../contacts/contacts-actions";

import { getIsEdit } from "./contacts-selectors";

import axios from "axios";

const fetchContacts = () => (dispatch) => {
  dispatch(fetchRequest());

  axios
    .get("/contacts")
    .then(({ data }) => dispatch(fetchSuccess(data)))
    .catch((error) => dispatch(fetchError(error.message)));
};

const addContact = (contact) => async (dispatch) => {
  dispatch(addRequest());

  axios
    .post("/contacts", contact)
    .then(({ data }) => {
      dispatch(addSuccess(data));
    })
    .catch((error) => {
      dispatch(addError(error.message));
    });
};

const deleteContact = (id) => async (dispatch) => {
  dispatch(deleteRequest());

  try {
    await axios.delete(`/contacts/${id}`);
    dispatch(deleteSuccess(id));
  } catch (error) {
    dispatch(deleteError(error.message));
  }
};

const editContact = (contact) => async (dispatch, getState) => {
  dispatch(editRequest());

  const id = getIsEdit(getState());

  try {
    const { data } = await axios.patch(`/contacts/${id}`, contact);
    dispatch(editSuccess(data));
  } catch (error) {
    dispatch(editError(error.message));
  }
};

export default {
  fetchContacts,
  addContact,
  deleteContact,
  editContact,
};
