import { createAction } from "@reduxjs/toolkit";

export const registerRequest = createAction("auth/registerRequest");
export const registerSucces = createAction("auth/registerSucces");
export const registerError = createAction("auth/registerError");

export const loginRequest = createAction("auth/loginRequest");
export const loginSucces = createAction("auth/loginSucces");
export const loginError = createAction("auth/loginError");

export const logOutRequest = createAction("auth/logOutRequest");
export const logOutSucces = createAction("auth/logOutSucces");
export const logOutError = createAction("auth/logOutError");

export const getCurrentUserRequest = createAction("auth/getCurrentUserRequest");
export const getCurrentUserSucces = createAction("auth/getCurrentUserSucces");
export const getCurrentUserError = createAction("auth/getCurrentUserError");
