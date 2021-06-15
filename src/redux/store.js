import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// import logger from "redux-logger";
import contactsReducer from "./contacts/contacts-reducer";
import authReducer from "./auth/auth-reducer";

// const myMiddleware = (store) => (next) => (action) => {
//   console.log("My Middleware!");
//   next(action);
// };

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  // logger,
];

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    auth: persistReducer(authPersistConfig, authReducer),
  },
  middleware,
  devTools: process.env.NODE_ENV === "development",
});

const persistor = persistStore(store);

export default { store, persistor };
