import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useGetUserQuery, useUpdateUserMutation } from '../../../graphql';
import UserForm from '../UserForm';

export default function UserUpdateForm() {
  const { id } = useParams();
  const history = useHistory();

  console.log(id);
  const { data, dataLoading, dataError } = useGetUserQuery({
    variables: {
      id: id,
      // name: 'name',
      // email: 'email'
    },
  });
  console.log(id);
  console.log(data);
  const [update, { data: updateData, loading, error }] = useUpdateUserMutation({
    variables: {
      id: id,
      name: 'name',
      email: 'email'
    },
    onCompleted: () => history.push('/user'),
  });
  console.log('id', id);
  console.log('data',data);

  return data ? (
    <UserForm type="update" handleSubmit={update} data={ data.apollo_single_user } />
  ) : (
    <CircularProgress />
  );
}
