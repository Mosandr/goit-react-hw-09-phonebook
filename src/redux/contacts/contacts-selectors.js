import { createSelector } from "reselect";

export const getLoading = (state) => state.contacts.loading;
export const getFilter = (state) => state.contacts.filter;
export const getErrorMessage = (state) => state.contacts.error;
export const getItems = (state) => state.contacts.items;
export const getIsEdit = (state) => state.contacts.isEdit;

export const getFilteredItems = createSelector(
  [getFilter, getItems],
  (filter, items) => {
    const normalizedFilter = filter.toLowerCase();
    return items.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  }
);

export const getEditItem = createSelector(
  [getIsEdit, getItems],
  (editId, items) => items.find(({ id }) => id === editId)
);
