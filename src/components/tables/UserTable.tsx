import React from 'react';

import SimpleCard from '../SimpleCard/SimpleCard';
import EntityTable from '../EntityTable/EntityTable';
import UserSchema from '../schemas/UserSchema';
import { useGetUsersQuery, useDeleteUserMutation } from '../../graphql';
import { getColumnDefinitions } from '../../lib';

const columnDefinitions = getColumnDefinitions(UserSchema);

export default function UsersTable() {
  const defaultPageSize = 10;

  const { data, loading: getLoading, error, refetch, variables } = useGetUsersQuery({
  // const { data, loading, error, refetch } = useGetUsersQuery({
    // fetchPolicy: 'cache-first',
    fetchPolicy: 'network-only',
    // fetchPolicy: 'cache-and-network',
    variables: { first: defaultPageSize, page: 0 },
  });

  console.log('UsersTable data', data);
  console.log('UsersTable loading', getLoading);
  console.log('UsersTable error', error);

  // const { data, loading: getLoading, error, refetch, variables } = all;

  // console.log('UsersTable all', all);
 
  // if (data === undefined) {
  //   return (
  //     <SimpleCard
  //       heading="Users"
  //       button={{
  //         text: 'add',
  //         link: '/app/user/insert',
  //       }}
  //       removeSpacing={true}
  //     >
  //     </SimpleCard>
  //   );
  // }

  console.log('UsersTable data 1', data);

  const fetchIdRef = React.useRef(0);
  const [pageCount, setPageCount] = React.useState(0);

  // console.log('UsersTable pageSize', pageSize);
  // console.log('UsersTable pageIndex', pageIndex);

  const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
    console.log('UsersTable pageSize', pageSize);
    console.log('UsersTable pageIndex', pageIndex);

    // Give this fetch an ID
    const fetchId = ++fetchIdRef.current;
    console.log('UsersTable fetchId', fetchId);

    // Only update the data if this is the latest fetch (and not the first, because we already fetched above)
    if (fetchId > 1 && fetchId === fetchIdRef.current) {
      variables.first = pageSize;
      variables.page = pageIndex + 1; // Note: we add 1 because backend expects the first page to equal 1 (not 0)

      refetch(variables);
    }
  }, []);

  console.log('UsersTable data 2', data);

  const result = data && data.apollo_paginated_users ? data.apollo_paginated_users : {};

  console.log('UsersTable result', result);

  // Update the pageCount if necessary
  if (result.paginatorInfo) {
    const newPageCount = Math.ceil(result.paginatorInfo.total / result.paginatorInfo.perPage);

    if (newPageCount !== pageCount) {
      setPageCount(newPageCount);
    }
  }

  const [deleteMutation, { loading: deleteLoading }] = useDeleteUserMutation({
    onCompleted: () => refetch(variables),
  });

  const remove = (variables: any) => {
    deleteMutation({ variables: variables });
  };

  return (
    <SimpleCard
      heading="Users"
      button={{
        text: 'add',
        link: '/app/user/insert',
      }}
      removeSpacing={true}
    >
      <EntityTable
        entityName="user"
        columns={columnDefinitions}
        actions={{ remove }}
        data={result || []}
        loading={getLoading}
        fetchData={fetchData}
        defaultPageSize={defaultPageSize}
        pageCount={pageCount}
      />
    </SimpleCard>
  );
}
