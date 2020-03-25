import React from 'react';
import Helmet from 'react-helmet';
import { hot } from 'react-hot-loader/root';

import { ApolloProvider } from '@apollo/react-components';
import { ApolloClient } from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { StoreProvider } from '../stores/Store';

import { CssBaseline } from '@material-ui/core';
import { Global } from '@emotion/core';
import { ThemeProvider } from '@material-ui/styles';
import Themes from '../themes';
import globalStyles from '../styles';

import Routes from '../routes';

import ScrollTop from './ScrollTop/ScrollTop';

interface RootProps {
  apolloClient: ApolloClient<NormalizedCacheObject>;
}

const Root: React.FunctionComponent<RootProps> = (props: RootProps): JSX.Element => {
  const { apolloClient } = props;
  return (
    <>
      <CssBaseline />
      <Global styles={globalStyles} />
      <Helmet>
        <title>React GraphQL front</title>
      </Helmet>
      <ScrollTop>
        <ThemeProvider theme={Themes.default}>
          <ApolloProvider client={apolloClient}>
            <StoreProvider App={Routes} />
          </ApolloProvider>
        </ThemeProvider>
      </ScrollTop>
    </>
  );
};

export default hot(Root);