import React, { setState, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable } from 'react-table';

import TableToolbar from './TableToolbar'
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';

import TablePaginationActions from './TablePaginationActions';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useCreateUserMutation } from '../../graphql';

export default function EntityTable(props) {
  const {
    columns = [],
    data,
    actions,
    entityName,
    loading,
    fetchData,
    defaultPageSize = 2,
    pageCount: controlledPageCount,
  } = props;

  const pageSizeOptions = [1, 2, 10, 20, 50, 100];

  var currentPageSize = defaultPageSize;
  if ("pageSize" in window) {
    currentPageSize =  pageSize;
  }
  var currentPageIndex = -1;
  if ("pageIndex" in window) {
    currentPageIndex = pageIndex;
  }

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    pageOptions,
    pageCount,
    page,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { selectedRowIds, pageSize, pageIndex, sortBy, hiddenColumns, entityName: entityNameFromTable, actions: actionsFromTable, globalFilter },
    gotoPage,
    previousPage,
    nextPage,
    setPageSize,
    canPreviousPage,
    canNextPage,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: currentPageSize,
        // pageIndex: 0,
        pageIndex: currentPageIndex,
        entityName,
        actions,
        // manualPagination: true,
        // pageCount: controlledPageCount,
      },
      manualPagination: true,
      pageCount: controlledPageCount,
      // @todo
      useGlobalFilter,
      useSortBy,
      usePagination,
      useRowSelect
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
);

  React.useEffect(() => {
    fetchData({ pageIndex, pageSize });
  }, [fetchData, pageIndex, pageSize]);

  const [oldPageIndex, setOldPageIndex] = React.useState(0);

  var newPageIndex = oldPageIndex;
  if (pageIndex > -1 && pageIndex != oldPageIndex ) {
    newPageIndex = pageIndex;
    setOldPageIndex(newPageIndex);
  }

  const deleteUserHandler = event => {
    const newData = removeByIndexs(
      data,
      Object.keys(selectedRowIds).map(x => parseInt(x, 10))
    )
    setData(newData)
  }

  const history = useHistory();

  const addUserHandler = user => {
    const newData = data.concat([user])

    const [create, { loading, error }] = useCreateUserMutation({
      variables: {
        name: user.name,
        email: user.email
      },
      onCompleted: () => {
        console.log('onCompleted')
        history.goBack();
      },
    });
  }

  // const currntNumSelected = Object.keys(selectedRowIds).length;
  const currntNumSelected = 0;

  // Render the UI for your table
  return loading ? (
    <CircularProgress />
  ) : (
    <div>
      <TableToolbar
        // numSelected={Object.keys(selectedRowIds).length}
        numSelected={currntNumSelected}
        deleteUserHandler={deleteUserHandler}
        addUserHandler={addUserHandler}
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        globalFilter={globalFilter || ''}
      />
      <Table {...getTableProps()}>
      <TableHead>
          {headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <TableCell
                  {...(column.id === 'selection'
                    ? column.getHeaderProps()
                    : column.getHeaderProps(column.getSortByToggleProps()))}
                >
                  {column.render('Header')}
                  {column.id !== 'selection' ? (
                    <TableSortLabel
                      active={column.isSorted}
                      // react-table has a unsorted state which is not treated here
                      direction={column.isSortedDesc ? 'desc' : 'asc'}
                    />
                  ) : null}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>;
                })}
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              count={controlledPageCount}
              page={newPageIndex}
              rowsPerPage={pageSize}
              rowsPerPageOptions={pageSizeOptions}
              labelRowsPerPage="Show"
              onChangeRowsPerPage={(e) => {
                const newPageSize = Number(e.target.value);
                setPageSize(newPageSize);
                currentPageSize = newPageSize;
                // this.forceUpdate();
                // setData({data});
                // setverState({page});
              }}
              onChangePage={(e, page) => gotoPage(e, page)}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
