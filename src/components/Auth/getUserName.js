import { useGetUserQuery } from '../../graphql';

function getUserName(idValue) {
  var userName = 'placeholder';

  const { data, loading, error, refetch, variables } = useGetUserQuery({
    fetchPolicy: 'cache-and-network',
    variables: { id: idValue },
  });

  if (typeof data != "undefined") {
    userName = data.apolloSingleUser.name;
  }

  return userName;
}

export { getUserName };
