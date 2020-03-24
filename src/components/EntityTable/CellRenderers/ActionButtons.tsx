import React from 'react';
import ActionButton from './ActionButton';

import IconButton from '@material-ui/core/IconButton';
import { Delete, Edit } from '@material-ui/icons';

export default function ActionButtons(props) {
  const { row = [], data = [], initialState = {} } = props;

  const { id } = row.original;
  const { entityName, actions } = initialState;

  return (
    <React.Fragment>
      <IconButton aria-label="edit" key="edit" entityId={id} entityName={entityName} actionType="edit" actions={actions}>
        <Edit />
      </IconButton>
      <IconButton aria-label="delete" key="delete" entityId={id} entityName={entityName} actionType="delete" actions={actions}>
        <Delete />
      </IconButton>
    </React.Fragment>
  );
}
