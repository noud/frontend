import React, { FunctionComponent } from 'react';

import AppHeader from './AppHeader';
import useStyles from './styles';

// @todo remove?
interface IProps {
  children: FunctionComponent;
  // any other props that come into the component
}

export default function AppLayout({ children }: IProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppHeader />
      <div className={classes.fakeToolbar} />
      <div className={classes.content}>{children}</div>
    </div>
  );
}
