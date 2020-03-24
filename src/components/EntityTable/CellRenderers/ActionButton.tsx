import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import defaultActions from '../../../lib/defaultActions';

import IconButton from '@material-ui/core/IconButton';
import { Delete, Edit } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    actionButton: {
      marginRight: theme.spacing(1),
    },
  })
);


const TextButton = (actionButton: any, handleClick: any, actionType: any) => {
  // const { actionButton, handleClick, actionType } = props;
  return (
    <Button variant="contained" className={actionButton} onClick={handleClick}>
     {actionType}
    </Button>
  );
} 

const DeleteButton = (actionButton: any, handleClick: any, actionType: any) => {
  // const { actionButton, handleClick, actionType } = props;
  return (
    <IconButton aria-label="delete" variant="contained" className={classes.actionButton} onClick={handleClick}>
     <Delete />
    </IconButton>
  );
}


const EditButton = (actionButton: any, handleClick: any, actionType: any) => {
  // const { actionButton, handleClick, actionType } = props;
  return (
    <IconButton aria-label="edit" variant="contained" className={classes.actionButton} onClick={handleClick}>
     <Edit />
    </IconButton>
  );
}

const ActionButton = (props: any) => {
  const { actionType, entityName, entityId, actions } = props;

  const history = useHistory();
  const classes = useStyles();

  function handleClick(e: any) {
    e.preventDefault();
    defaultActions[actionType](entityName, entityId, { history, actions });
  }

  console.log('actionType',actionType);

  var buttonToRender = TextButton;
  switch(actionType) {
    case "delete":
        buttonToRender = DeleteButton;
        break;
      case "edit":
        buttonToRender = EditButton;
        break;
    }

  return (
    <Tooltip title={actionType}>
      <div>
        {TextButton(classes.actionButton, handleClick, actionType)}
        {buttonToRender}
      </div>
    </Tooltip>
  );
};

export default ActionButton;
