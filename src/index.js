import React from "react";
import ReactDOM from "react-dom";
import "modern-normalize";
import "./styles.scss";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store from "./redux/store";

import App from "./App";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store.store}>
        <PersistGate loading={null} persistor={store.persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
