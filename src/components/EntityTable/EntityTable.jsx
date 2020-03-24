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

// var state = {
//   data: data,
// };
// const [data, setData] = React.useState(data);

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
    state: { pageIndex, pageSize, selectedRowIds, globalFilter },
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

  // const changePage = (e, page) => {
  //   // NOTE: without this check, there is an issue with "material-ui" TablePagination component
  //   // which triggers changePage() with e = null, page = 0.
  //   if(e) {
  //     // props.changePage(e, page);
  //     gotoPage(e, page);
  //   }
  // };

  // const onChangePage = (event, page) => {
  //   console.log('event',event);
  //   // const { onChangePage } = this.props
  //   if (event && "function" === typeof onChangePage) {
  //     // if (event) {
  //     // only handle user initiated onChangePage events
  //     // onChangePage(page);
  //     console.log('event gotoPage', page);
  //     gotoPage(event, page);
  //   }
  // }

  const [oldPageIndex, setOldPageIndex] = React.useState(0);

  // var newPageIndex = (pageIndex > 0 && data.length === pageSize ) ? pageIndex : 0;
  // var newPageIndex = (pageIndex > 0 && pageIndex != oldPageIndex ) ? pageIndex : oldPageIndex;
  var newPageIndex = oldPageIndex;
  if (pageIndex > -1 && pageIndex != oldPageIndex ) {
    newPageIndex = pageIndex;
    setOldPageIndex(newPageIndex);
  }
  
  // var newPageIndex = pageIndex;

  console.log('newPageIndex',newPageIndex);
  
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
    // setData(newData)
    const [create, { loading, error }] = useCreateUserMutation({
      variables: {
        name: user.name,
        email: user.email
      },
      onCompleted: () => {
        console.log('onCompleted')
        history.goBack();
      },
      // onCompleted: () => history.goBack(),
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
        globalFilter={globalFilter}
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
