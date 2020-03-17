import React from 'react';
import { Route } from 'react-router-dom';
import UserTable from '../../components/tables/UserTable';
import UserInsertForm from '../../components/forms/insert/UserInsertForm';
import UserUpdateForm from '../../components/forms/update/UserUpdateForm';
import UserView from '../../components/view/UserView';

export const Table = (
  <Route exact key={`user.table`} path={`/user`} component={() => (<UserTable />)} />
);

export const Insert = (
  <Route exact key={`user.insert`} path={`/user/insert`} component={() => (<UserInsertForm />)} />
);

export const Update = (
  <Route exact key={`user.update`} path={`/user/:id/edit`} component={() => (<UserUpdateForm />)} />
);

export const View = (
  <Route exact key={`user.view`} path={`/user/:id`} component={() => (<UserView />)} />
);

export default {
  Table,
  Insert,
  View,
  Update,
};
