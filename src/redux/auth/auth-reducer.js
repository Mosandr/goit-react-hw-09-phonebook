import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";
import {
  registerRequest,
  registerSucces,
  registerError,
  loginRequest,
  loginSucces,
  loginError,
  logOutRequest,
  logOutSucces,
  logOutError,
  getCurrentUserRequest,
  getCurrentUserSucces,
  getCurrentUserError,
} from "./auth-actions";

const initialUserState = { name: null, email: null };
const user = createReducer(initialUserState, {
  [registerSucces]: (_, { payload }) => payload.user,
  [loginSucces]: (_, { payload }) => payload.user,
  [logOutSucces]: () => initialUserState,
  [getCurrentUserSucces]: (_, { payload }) => payload,
});
const token = createReducer(null, {
  [registerSucces]: (_, { payload }) => payload.token,
  [loginSucces]: (_, { payload }) => payload.token,
  [logOutSucces]: () => null,
});
const error = createReducer(null, {
  [registerError]: (_, { payload }) => payload,
  [loginError]: (_, { payload }) => payload,
  [logOutError]: (_, { payload }) => payload,
  [getCurrentUserError]: (_, { payload }) => payload,
});

const isAuthenticated = createReducer(false, {
  [registerSucces]: () => true,
  [loginSucces]: () => true,
  [getCurrentUserSucces]: () => true,
  [registerError]: () => false,
  [loginError]: () => false,
  [getCurrentUserError]: () => false,
  [logOutSucces]: () => false,
});

export default combineReducers({ user, token, error, isAuthenticated });
