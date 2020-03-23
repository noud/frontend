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

export default function EntityTable(props) {

const {
  columns = [],
  data,
  actions,
  entityName,
  loading,
  fetchData,
  defaultPageSize = 10,
  pageCount: controlledPageCount,
} = props;

  const pageSizeOptions = [1, 10, 20, 50, 100];

  var currentPageSize = 1;
  if ("pageSize" in window) {
    currentPageSize =  pageSize;
  }
  var currentPageIndex = 0;
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
        pageSize: currentPageSize,
        pageIndex: 0,
        // pageIndex: currentPageIndex,
        entityName,
        actions,
        // manualPagination: true,
        // pageCount: controlledPageCount,
      },
      manualPagination: true,
      pageCount: controlledPageCount,
      // usePagination
    },
    useSortBy,
    usePagination
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
  if (pageIndex > 0 && pageIndex != oldPageIndex ) {
    newPageIndex = pageIndex;
    setOldPageIndex(newPageIndex);
  }
  
  // var newPageIndex = pageIndex;

  console.log('newPageIndex',newPageIndex);

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
              page={newPageIndex}
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
