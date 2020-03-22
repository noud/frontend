import React from 'react';
import { Link } from 'react-router-dom';

export default function EntityLink(props) {
  const { data } = props;

  return data ? <Link to={'/' + data.__typename.toLowerCase() + '/' + data.id}>{data.displayField}</Link> : <span></span>;
}
