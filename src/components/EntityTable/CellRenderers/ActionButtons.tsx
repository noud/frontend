import React from 'react';
import ActionButton from './ActionButton';

export default function ActionButtons(props) {
  const { row = [], data = [], initialState = {} } = props;

  const { id } = row.original;
  const { entityName, actions } = initialState;

  return (
    <React.Fragment>
      <ActionButton key="view" entityId={id} entityName={entityName} actionType="view" />
      <ActionButton key="edit" entityId={id} entityName={entityName} actionType="edit" />
      <ActionButton key="delete" entityId={id} entityName={entityName} actionType="delete" actions={actions} />
    </React.Fragment>
  );
}
