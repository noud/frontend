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
import UserTable from '../components/tables/UserTable';
import UserInsertForm from '../components/forms/insert/UserInsertForm';
import UserUpdateForm from '../components/forms/update/UserUpdateForm';
import UserView from '../components/view/UserView';

// Contexts
import UserStore from '../stores/UserStore';

export default function Routes() {
  return (
    <Switch>
  <Route exact key={`user.insert`} path={`/user/insert`} component={() => (<UserInsertForm />)} />
  <Route exact key={`user.table`} path={`/user`} component={() => (<UserTable />)} />
  <Route exact key={`user.update`} path={`/user/:id/edit`} component={() => (<UserUpdateForm />)} />
  <Route exact key={`user.view`} path={`/user/:id`} component={() => (<UserView />)} />
      <PrivateRoute exact path="/" component={AppRoutes} />
      {/* <PrivateRoute path="/app" component={EntityRoutes} /> */}

      <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
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
