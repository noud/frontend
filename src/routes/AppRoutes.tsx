import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../components/app/Dashboard/Dashboard';
import AppLayout from '../components/app/Layout/AppLayout';

const Routes = [<Route key="app.home" path="/" component={Dashboard} />];

export default function AppRoutes() {
  return (
    <AppLayout>
      <Switch>{Routes}</Switch>
    </AppLayout>
  );
}
