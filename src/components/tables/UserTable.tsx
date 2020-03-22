import React from 'react';

import SimpleCard from '../SimpleCard/SimpleCard';
import EntityTable from '../EntityTable/EntityTable';
import UserSchema from '../schemas/UserSchema';
import { useGetUsersQuery, useDeleteUserMutation } from '../../graphql';
import { getColumnDefinitions } from '../../lib';

const columnDefinitions = getColumnDefinitions(UserSchema);

export default function UsersTable() {
  const defaultPageSize = 1;

  // const [qRefresh, setQRefresh] = React.useState(0)

  const { data, loading: getLoading, error, refetch, variables } = useGetUsersQuery({
    // fetchPolicy: 'cache-first',
    // returnPartialData: true,
    // errorPolicy: "all",
    // onCompleted: (...params) => {
    //   setQRefresh(qRefresh + 1)
    // },
  // fetchPolicy: 'network-only',
    fetchPolicy: 'no-cache',
    // pollInterval: 0,
    // fetchPolicy: 'cache-and-network',
    variables: { first: defaultPageSize, page: 0 },
  });
  // refetch(variables);

  // console.log('UsersTable data', data);
  // console.log('UsersTable loading', getLoading);
  // console.log('UsersTable error', error);

  // const { data, loading: getLoading, error, refetch, variables } = all;
  // refetch(variables);

  // console.log('UsersTable all: ', all);
 
  // if (data === undefined) {
  //   return (
  //     <SimpleCard
  //       heading="Users"
  //       button={{
  //         text: 'add',
  //         link: '/user/insert',
  //       }}
  //       removeSpacing={true}
  //     >
  //     </SimpleCard>
  //   );
  // }

  // console.log('UsersTable data 1', data);

  const fetchIdRef = React.useRef(0);
  const [pageCount, setPageCount] = React.useState(0);

  // console.log('UsersTable pageSize', pageSize);
  // console.log('UsersTable pageIndex', pageIndex);

  const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
    // Give this fetch an ID
    const fetchId = ++fetchIdRef.current;

    // Only update the data if this is the latest fetch (and not the first, because we already fetched above)
    if (fetchId > 1 && fetchId === fetchIdRef.current) {
      variables.first = pageSize;
      variables.page = pageIndex + 1; // Note: we add 1 because backend expects the first page to equal 1 (not 0)

      refetch(variables);
    }
  }, []);

  // console.log('UsersTable data 2', data);

  // const result = data && data.apollo_users ? data.apollo_users : [];
  const result = data && data.apollo_paginated_users ? data.apollo_paginated_users : {};
  // const resultData = result.data ? result.data : [];

  // console.log('UsersTable result', result);
  // console.log('UsersTable result.data', result.data);

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
        link: '/user/insert',
      }}
      removeSpacing={true}
    >
      <EntityTable
        entityName="user"
        columns={columnDefinitions}
        actions={{ remove }}
        data={result.data || []}
        loading={getLoading}
        fetchData={fetchData}
        defaultPageSize={defaultPageSize}
        pageCount={pageCount}
      />
    </SimpleCard>
  );
}
