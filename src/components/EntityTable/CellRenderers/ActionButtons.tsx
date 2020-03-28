import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

const useStyles = makeStyles(theme => ({
  root: {
      display: "inline-flex",
  },
}));

export default function ActionButtons(props) {
  const { row = [], data = [], initialState = {} } = props;

  const { id } = row.original;
  const { entityName, actions } = initialState;

  const classes = useStyles();

  return (
    <React.Fragment>
      <div>
        <div className={classes.root}>
          <EditButton key="edit" entityId={id} entityName={entityName} actionType="edit" actions={actions} />
        </div>
        <div className={classes.root}>
          <DeleteButton key="delete" entityId={id} entityName={entityName} actionType="delete" actions={actions} />
        </div>
      </div>
    </React.Fragment>
  );
}
