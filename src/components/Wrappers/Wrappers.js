import React from 'react';

import { withStyles, Badge as BadgeBase, Typography as TypographyBase, Button as ButtonBase } from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/styles';
import classnames from 'classnames';

// styles
const useStyles = makeStyles((theme) => ({
  badge: {
    fontWeight: 600,
    height: 16,
    minWidth: 16,
  },
}));

function Badge({ children, color, ...props }) {
  const classes = useStyles();
  const theme = useTheme();
  const Styled = createStyled({
    badge: {
      backgroundColor: getColor(color, theme),
    },
  });

  return (
    <Styled>
      {(styledProps) => (
        <BadgeBase
          classes={{
            badge: classnames(classes.badge, styledProps.classes.badge),
          }}
          {...props}
        >
          {children}
        </BadgeBase>
      )}
    </Styled>
  );
}

function Typography({ children, weight, size, color, ...props }) {
  const theme = useTheme();

  return (
    <TypographyBase
      style={{
        color: getColor(color, theme),
        fontWeight: getFontWeight(weight),
        fontSize: getFontSize(size, props.variant, theme),
      }}
      {...props}
    >
      {children}
    </TypographyBase>
  );
}

function Button({ children, color, ...props }) {
  const theme = useTheme();

  const Styled = createStyled({
    button: {
      backgroundColor: getColor(color, theme),
      boxShadow: theme.customShadows.widget,
      color: 'white',
      '&:hover': {
        backgroundColor: getColor(color, theme, 'light'),
        boxShadow: theme.customShadows.widgetWide,
      },
    },
  });

  return (
    <Styled>
      {({ classes }) => (
        <ButtonBase classes={{ root: classes.button }} {...props}>
          {children}
        </ButtonBase>
      )}
    </Styled>
  );
}

export { Badge, Typography, Button };

// ########################################################################

function getColor(color, theme) {
  if (color && theme.palette[color] && theme.palette[color]) {
    return theme.palette[color];
  }
}

function getFontWeight(style) {
  switch (style) {
    case 'light':
      return 300;
    case 'medium':
      return 500;
    case 'bold':
      return 600;
    default:
      return 400;
  }
}

function getFontSize(size, variant = '', theme) {
  let multiplier;

  switch (size) {
    case 'sm':
      multiplier = 0.8;
      break;
    case 'md':
      multiplier = 1.5;
      break;
    case 'xl':
      multiplier = 2;
      break;
    case 'xxl':
      multiplier = 3;
      break;
    default:
      multiplier = 1;
      break;
  }

  const defaultSize = variant && theme.typography[variant] ? theme.typography[variant].fontSize : theme.typography.fontSize + 'px';

  return `calc(${defaultSize} * ${multiplier})`;
}

function createStyled(styles, options) {
  const Styled = function(props) {
    const { children, ...other } = props;
    return children(other);
  };

  return withStyles(styles, options)(Styled);
}
