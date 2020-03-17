import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// Application
import AppRoutes from './AppRoutes';
import EntityRoutes from './entities';
// import UserRoutes from './entities/UserRoutes';

// Default pages
import ErrorPage from '../components/Error/ErrorPage';
import LoginPage from '../components/Auth/LoginPage';
import ResetPasswordPage from '../components/Auth/ResetPasswordPage';

// Contexts
import UserStore from '../stores/UserStore';

export default function Routes() {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={AppRoutes} />
      <PrivateRoute path="/app" component={EntityRoutes} />
      {/* <Route exact path="/app" render={() => <Redirect to="/app/dashboard" />} /> */}
      <PublicRoute path="/login" component={LoginPage} />
      <PublicRoute path="/password/reset" component={ResetPasswordPage} />
      <Route component={ErrorPage} />
    </Switch>
  );
}

export function PrivateRoute({ component, ...rest }) {
  const { isAuthenticated } = UserStore.use();

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          React.createElement(component, props)
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                from: props.location,
              },
            }}
          />
        )
      }
    />
  );
}

export function PublicRoute({ component, ...rest }) {
  const { isAuthenticated } = UserStore.use();

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Redirect
            to={{
              pathname: '/',
            }}
          />
        ) : (
          React.createElement(component, props)
        )
      }
    />
  );
}
