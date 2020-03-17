import React from 'react';
import { Route, Switch } from 'react-router-dom';
import UserRoutes from './entities';
import Dashboard from '../components/app/Dashboard/Dashboard';
import AppLayout from '../components/app/Layout/AppLayout';

const CustomRoutes = [<Route key="app.dashboard" path="/app/dashboard" component={Dashboard} />];

const CrudRoutes: Array<JSX.Element> = [];

Object.values(UserRoutes).forEach((Entity) => {
  Object.values(Entity).forEach((Route) => {
    CrudRoutes.push(Route);
  });
});

const Routes = [...CrudRoutes, ...CustomRoutes];

export default function EntityRoutes() {
  return (
    <AppLayout>
      <Switch>{Routes}</Switch>
    </AppLayout>
  );
}
