import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useGetUserQuery, useUpdateUserMutation } from '../../../graphql';
import UserForm from '../UserForm';

export default function UserUpdateForm() {
  const { id } = useParams();
  const history = useHistory();

  const { data, dataLoading, dataError } = useGetUserQuery({
    variables: {
      id: id
    },
  });

  const [update, { data: updateData, loading, error }] = useUpdateUserMutation({
    onCompleted: () => history.push('/app/user'),
  });

  return data && data!.user! ? (
    <UserForm type="update" handleSubmit={update} data={ data.user } />
  ) : (
    <CircularProgress />
  );
}
