import React from 'react';
import { Link } from 'react-router-dom';
import pluralize from 'pluralize';
import EntityLink from '../../EntityLink/EntityLink';

export default function DefaultRenderer({ cell, row, initialState }) {
  const { value } = cell;
  const { entityName = '' } = initialState;

  if (Array.isArray(value)) {
    if (value.length == 0) {
      return <span>-</span>;
    }

    const firstValue = value[0];

    if (value.length == 1) {
      return <EntityLink data={firstValue} />;
    }

    return <Link to={'/app' + entityName + '/' + row.original.id}>{value.length + ' ' + pluralize.plural(firstValue.__typename)}</Link>;
  }

  if (typeof value == 'object') {
    return <EntityLink data={value} />;
  }

  return value;
}
