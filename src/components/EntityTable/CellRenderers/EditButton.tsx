import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import defaultActions from '../../../lib/defaultActions';

import IconButton from '@material-ui/core/IconButton';
import { Edit } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    actionButton: {
      marginRight: theme.spacing(1),
    },
  })
);

const EditButton = (props: any) => {
  const { actionType, entityName, entityId, actions } = props;

  const history = useHistory();
  const classes = useStyles();

  function handleClick(e: any) {
    e.preventDefault();
    defaultActions[actionType](entityName, entityId, { history, actions });
  }
  return (
    <Tooltip title={actionType}>
      <div>
        <IconButton
          aria-label="edit"
          className={classes.actionButton}
          onClick={handleClick}
          variant="contained"
        >
          <Edit />
        </IconButton>
      </div>
    </Tooltip>
  );
};

export default EditButton;