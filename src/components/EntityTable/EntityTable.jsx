import React from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';

import TablePaginationActions from './TablePaginationActions';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function EntityTable({
  columns = [],
  data,
  actions,
  entityName,
  loading,
  fetchData,
  defaultPageSize = 10,
  pageCount: controlledPageCount,
}) {
  const pageSizeOptions = [1, 10, 20, 50, 100];

  // console.log('EntityTable data', data);

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    pageOptions,
    pageCount,
    page,
    state: { pageIndex, pageSize },
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
        pageSize: defaultPageSize,
        pageIndex: 0,
        entityName,
        actions,
      },
      manualPagination: true,
      pageCount: controlledPageCount,
    },
    useSortBy,
    usePagination
  );

  React.useEffect(() => {
    let pi = pageIndex;
    fetchData({ pageIndex: pi, pageSize });
  }, [fetchData, pageIndex, pageSize]);

  // Render the UI for your table
  return loading ? (
    <CircularProgress />
  ) : (
    <div>
      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
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
              page={pageIndex}
              rowsPerPage={pageSize}
              rowsPerPageOptions={pageSizeOptions}
              labelRowsPerPage="Show"
              onChangeRowsPerPage={(e) => {
                setPageSize(Number(e.target.value));
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
