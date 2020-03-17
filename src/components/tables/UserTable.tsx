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
    fetchPolicy: 'cache-and-network',
    variables: { first: defaultPageSize, page: 0 },
  });

  const fetchIdRef = React.useRef(0);

  const [pageCount, setPageCount] = React.useState(0);

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

  const result = data && data.users ? data.users : {};

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
        data={result.data || []}
        loading={getLoading}
        fetchData={fetchData}
        defaultPageSize={defaultPageSize}
        pageCount={pageCount}
      />
    </SimpleCard>
  );
}
