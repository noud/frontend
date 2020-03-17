import React from 'react';
import { AutoField, SelectField } from 'uniforms-material';

export default function AutoFormField(props) {
  const { name, field, options = [] } = props;

  if (field.relationshipType == 'belongsTo') {
    return <SelectField key={name} name={name} options={options} />;
  } else {
    return <AutoField key={name} name={name} />;
  }
}
