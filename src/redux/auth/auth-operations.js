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

import axios from "axios";

axios.defaults.baseURL = "https://connections-api.herokuapp.com";

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

const register = (credentials) => async (dispatch) => {
  dispatch(registerRequest());

  try {
    const { data } = await axios.post("/users/signup", credentials);
    token.set(data.token);
    dispatch(registerSucces(data));
  } catch (error) {
    dispatch(registerError(error.message));
  }
};

const logIn = (credentials) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const { data } = await axios.post("/users/login", credentials);
    token.set(data.token);
    dispatch(loginSucces(data));
  } catch (error) {
    dispatch(loginError(error.message));
  }
};

const logOut = () => async (dispatch) => {
  dispatch(logOutRequest());

  try {
    await axios.post("/users/logout");
    token.unset();
    dispatch(logOutSucces());
  } catch (error) {
    dispatch(logOutError(error.message));
  }
};

const getCurrentUser = () => async (dispatch, getState) => {
  const {
    auth: { token: persistedToken },
  } = getState();

  if (!persistedToken) {
    return;
  }
  token.set(persistedToken);

  dispatch(getCurrentUserRequest());

  try {
    const { data } = await axios.get("/users/current");
    dispatch(getCurrentUserSucces(data));
  } catch (error) {
    dispatch(getCurrentUserError(error.message));
  }
};

export default { register, logIn, logOut, getCurrentUser };
