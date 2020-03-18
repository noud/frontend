import React from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';

import pluralize from 'pluralize';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Delete as DeleteIcon } from '@material-ui/icons';

import SimpleCard from '../SimpleCard/SimpleCard';
import EntityTable from '../EntityTable/EntityTable';
import EntityLink from '../EntityLink/EntityLink';
import Schema from '../schemas/UserSchema';
import { useGetUserQuery, useDeleteUserMutation } from '../../graphql';
import { getColumnDefinitions } from '../../lib';

const relatedSchemas = {
  // Customer: CustomerSchema,
};

const UserView = function() {
  const history = useHistory();
  const { id } = useParams();
  const { data, dataLoading, dataError } = useGetUserQuery({variables: {id: id}});
  const [deleteUserMutation, { delData, delLoading, delError }] = useDeleteUserMutation();
  const deleteUser = function() {
    deleteUserMutation({variables: {id: id}});
    history.push('/app/user');
  }

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      button: {
        margin: theme.spacing(1),
      },
      table: {
        minWidth: 650,
      },
    }),
  );
  const classes = useStyles();

  return data && data! ? (
    <SimpleCard
      heading="View user"
      arrowBack={{
        link: '/app/user',
      }}
    >
      <div>
        <Button className={classes.button} startIcon={<DeleteIcon />} onClick={ deleteUser }>
          Delete
        </Button>
      </div>
      <Table className={classes.table} size="small">
        <TableBody>{Schema.objectKeys().map((key: string) => getTableRow(key, data))}</TableBody>
      </Table>
    </SimpleCard>
  ) : (
    <CircularProgress />
  );
}

const getTableRow = function(key: string, data: object) {
  const fieldTypes: [] = Schema.get(key, 'type').map((type: object) => type.type.name);

  const isArray = fieldTypes.includes('Array');

  return /\w+.\$$/.test(key) ? null : (
    <TableRow key={key}>
      <TableCell component="th" scope="row">
        {isArray ? pluralize.plural(key) : key}
      </TableCell>
      <TableCell align="left">{getPrintValue(data[(isArray ? pluralize.plural(key) : key)])}</TableCell>
    </TableRow>
  );
};

const getPrintValue = function(rowData: object) {
  // For arrays (... to many)
  if (Array.isArray(rowData)) {
    if (rowData.length == 0) {
      return <span style={{opacity: .5}}>None</span>;
    } else if (rowData.length == 1) {
      return <EntityLink data={rowData[0]} />;
    }

    return <EntityTable columnDefs={getColumnDefinitions(relatedSchemas[rowData[0].__typename])} tableData={rowData} entityName='activity' />;
  }

  // For objects (... to one)
  if (typeof rowData === 'object') {
    return <EntityLink data={rowData} />;
  }

  // For a primitive type
  if (rowData != null) {
    return rowData;
  }

  // No data
  return <span style={{opacity: .5}}>None</span>;
};

export default UserView;