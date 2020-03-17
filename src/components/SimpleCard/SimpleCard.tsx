import React from 'react';
import { Link } from 'react-router-dom';

import { Card, CardContent, IconButton, Typography, Button } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { createStyles, makeStyles } from '@material-ui/styles';

interface Props {
  arrowBack?: {
    link: string;
  };
  button?: {
    link: string;
    text: string;
  };
  heading: string;
  onSubmit?: any;
  subheading?: string;
  children?: any;
  removeSpacing?: boolean;
}

const useStyles = makeStyles(() =>
  createStyles({
    fixedOverflow: {
      overflow: 'visible',
    },
    arrowBack: {
      marginRight: '0.5em',
    },
    flex: {
      display: 'flex',
      alignItems: 'start',
    },
    flexGrow: {
      flexGrow: 1,
    },
  })
);

export default function SimpleCard(props: Props) {
  const { arrowBack, button, children, heading, onSubmit, subheading, removeSpacing = false } = props;
  const classes = useStyles();
  let renderButton, renderArrowBack;

  if (button) {
    renderButton = (
      <Button variant="outlined" component={Link} to={button.link}>
        {button.text}
      </Button>
    );
  }

  if (arrowBack) {
    renderArrowBack = (
      <IconButton onClick={onSubmit} className={classes.arrowBack} component={Link} to={arrowBack.link}>
        <ArrowBack />
      </IconButton>
    );
  }

  const renderContent = removeSpacing ? children : <CardContent>{children}</CardContent>;

  return (
    <div>
      <div className={classes.flex}>
        <h2 className={classes.flexGrow}>
          {renderArrowBack}
          {heading}
        </h2>
        {renderButton}
      </div>
      <Card className={classes.fixedOverflow}>
        {subheading && (
          <CardContent>
            <Typography variant="subtitle1">{subheading}</Typography>
          </CardContent>
        )}
        {renderContent}
      </Card>
    </div>
  );
}
