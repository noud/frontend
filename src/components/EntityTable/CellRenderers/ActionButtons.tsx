import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function ActionButtons(props) {
  const { row = [], data = [], initialState = {} } = props;

  const { id } = row.original;
  const { entityName, actions } = initialState;

  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.root}>
        <EditButton key="edit" entityId={id} entityName={entityName} actionType="edit" actions={actions} />
        <DeleteButton key="delete" entityId={id} entityName={entityName} actionType="delete" actions={actions} />
      </div>
    </React.Fragment>
  );
}
