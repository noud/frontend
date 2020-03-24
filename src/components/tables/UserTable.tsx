import React from 'react';

import EntityTable from '../EntityTable/EntityTable';
import UserSchema from '../schemas/UserSchema';
import { useGetUsersQuery, useDeleteUserMutation } from '../../graphql';
import { getColumnDefinitions } from '../../lib';

import TableContainer from '@material-ui/core/TableContainer'

const columnDefinitions = getColumnDefinitions(UserSchema);

export default function UsersTable() {
  const defaultPageSize = 2;

  // const [qRefresh, setQRefresh] = React.useState(0)

  const { data, loading: getLoading, error, refetch, variables } = useGetUsersQuery({
    // returnPartialData: true,
    // errorPolicy: "all",
    // onCompleted: (...params) => {
    //   setQRefresh(qRefresh + 1)
    // },
    fetchPolicy: 'cache-and-network',
    variables: { first: defaultPageSize, page: -1 },
  });

  const fetchIdRef = React.useRef(0);

  const [pageCount, setPageCount] = React.useState(0);

  const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
    // Give this fetch an ID
    const fetchId = ++fetchIdRef.current;

    // Only update the data if this is the latest fetch (and not the first, because we already fetched above)
    if (fetchId > 1 && fetchId === fetchIdRef.current) {
      variables.first = pageSize;
      // variables.page = variables.page;
      if (pageIndex != -1) {
        console.log('fetchData pageSize',pageSize);
        console.log('fetchData pageIndex',pageIndex);
        console.log('fetchData variables.first',variables.first);
        console.log('fetchData variables.page',variables.page);

        variables.page = pageIndex + 1; // Note: we add 1 because backend expects the first page to equal 1 (not 0)
        refetch(variables);
        console.log('fetchData refetch',variables);
      }

      // refetch(variables);
    }
  }, []);

  // const result = data && data.apollo_users ? data.apollo_users : [];
  const result = data && data.apollo_paginated_users ? data.apollo_paginated_users : {};

  // Update the pageCount if necessary
  if (result.paginatorInfo) {
    const newPageCount = Math.ceil(result.paginatorInfo.total / result.paginatorInfo.perPage);
    // console.log('set pageCount',pageCount,newPageCount);

    if (newPageCount !== pageCount) {
      setPageCount(newPageCount);
      // console.log('set newPageCount',newPageCount);
    }
  }

  const [deleteMutation, { loading: deleteLoading }] = useDeleteUserMutation({
    onCompleted: () => refetch(variables),
  });

  const remove = (variables: any) => {
    deleteMutation({ variables: variables });
  };

  return (
    <TableContainer>
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
    </TableContainer>
  );
}
