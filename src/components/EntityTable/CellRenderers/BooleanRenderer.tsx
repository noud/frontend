import React from 'react';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

export default function BooleanRenderer({ cell }) {
  return cell.value === true ? <CheckIcon color="primary" /> : cell.value === false ? <ClearIcon color="disabled" /> : null;
}
