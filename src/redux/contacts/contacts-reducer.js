import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";
import {
  addRequest,
  addSuccess,
  addError,
  deleteRequest,
  deleteSuccess,
  deleteError,
  filterChange,
  fetchSuccess,
  fetchRequest,
  fetchError,
  editError,
  editSuccess,
  editRequest,
  onEdit,
  onEditCancel,
} from "../contacts/contacts-actions";

const items = createReducer([], {
  [fetchSuccess]: (_, { payload }) => payload,
  [addSuccess]: (state, { payload }) => {
    return [payload, ...state];
  },
  [editSuccess]: (state, { payload }) =>
    state.map((item) => {
      if (item.id === payload.id) {
        return payload;
      }
      return item;
    }),
  [deleteSuccess]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload),
});

const loading = createReducer(false, {
  [addRequest]: () => true,
  [addSuccess]: () => false,
  [addError]: () => false,
  [deleteRequest]: () => true,
  [deleteSuccess]: () => false,
  [deleteError]: () => false,
  [fetchRequest]: () => true,
  [fetchSuccess]: () => false,
  [fetchError]: () => false,
  [editRequest]: () => true,
  [editSuccess]: () => false,
  [editError]: () => false,
});

const error = createReducer("", {
  [addError]: (_, { payload }) => payload,
  [deleteError]: (_, { payload }) => payload,
  [fetchError]: (_, { payload }) => payload,
  [editError]: (_, { payload }) => payload,
  [addSuccess]: () => "",
  [deleteSuccess]: () => "",
  [fetchSuccess]: () => "",
  [addRequest]: () => "",
  [deleteRequest]: () => "",
  [fetchRequest]: () => "",
});

const isEdit = createReducer("", {
  [onEdit]: (_, { payload }) => payload,
  [onEditCancel]: () => "",
  [editSuccess]: () => "",
});

const filterReducer = createReducer("", {
  [filterChange]: (_, { payload }) => payload,
});

export default combineReducers({
  items,
  filter: filterReducer,
  isEdit,
  loading,
  error,
});
