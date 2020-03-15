import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

/* Local */
import './lib/i18n';
import Root from '../components/root';
import { createClient } from './lib/apollo';

const client = createClient();
const history = createBrowserHistory();

const root = document.getElementById('root')!;

ReactDOM[root.innerHTML ? 'hydrate' : 'render'](
  <Router history={history}>
    <Root apolloClient={client} />
  </Router>,
  root
);
