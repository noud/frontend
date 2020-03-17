import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import defaultActions from '../../../lib/defaultActions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    actionButton: {
      marginRight: theme.spacing(1),
    },
  })
);

const ActionButton = (props: any) => {
  const { actionType, entityName, entityId, actions } = props;

  const history = useHistory();
  const classes = useStyles();

  function handleClick(e: any) {
    e.preventDefault();
    defaultActions[actionType](entityName, entityId, { history, actions });
  }

  return (
    <Tooltip title={actionType}>
      <Button variant="contained" className={classes.actionButton} onClick={handleClick}>
        {actionType}
      </Button>
    </Tooltip>
  );
};

export default ActionButton;
