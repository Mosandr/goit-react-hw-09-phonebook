import { useEffect } from "react";
import { Switch, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { Suspense, lazy } from "react";

import routes from "./routes";
import AppBar from "./components/AppBar";
import Container from "./components/Container";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

import authOperations from "./redux/auth/auth-operations";
import { getIsAuthenticated } from "./redux/auth/auth-selectors";

const HomePage = lazy(() =>
  import("./views/HomePage/HomePage" /* webpackChunkName: "home-page" */)
);

const RegisterPage = lazy(() =>
  import(
    "./views/RegisterPage/RegisterPage" /* webpackChunkName: "register-page" */
  )
);

const LoginPage = lazy(() =>
  import("./views/LoginPage/LoginPage" /* webpackChunkName: "login-page" */)
);

const ContactsPage = lazy(() =>
  import(
    "./views/ContactsPage/ContactsPage" /* webpackChunkName: "contacts-page"*/
  )
);

const App = ({ isAuthenticated, getCurrentUser }) => {
  useEffect(() => {
    isAuthenticated && getCurrentUser();
  }, [isAuthenticated, getCurrentUser]);

  return (
    <>
      <AppBar />
      <Suspense
        fallback={
          <Container>
            <h1>Loading</h1>
          </Container>
        }
      >
        <Switch>
          <PublicRoute exact path={routes.home} component={HomePage} />
          <PublicRoute
            restricted
            path={routes.register}
            component={RegisterPage}
            redirectTo={routes.contacts}
          />
          <PublicRoute
            restricted
            path={routes.login}
            component={LoginPage}
            redirectTo={routes.contacts}
          />
          <PrivateRoute
            path={routes.contacts}
            component={ContactsPage}
            redirectTo={routes.login}
          />
          <Redirect to={routes.home} />
        </Switch>
      </Suspense>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: getIsAuthenticated(state),
});

const mapDispatchToProps = {
  getCurrentUser: authOperations.getCurrentUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
