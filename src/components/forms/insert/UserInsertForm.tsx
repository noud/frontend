import React from 'react';
import { useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useCreateUserMutation } from '../../../graphql';
import UserForm from '../UserForm';

export default function UserUpdateForm() {
  const history = useHistory();

  const [create, { loading, error }] = useCreateUserMutation({
    onCompleted: () => history.goBack(),
  });

  return <UserForm type="insert" handleSubmit={create} />;
}
