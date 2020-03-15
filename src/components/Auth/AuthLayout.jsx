import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import logo from '../../public/images/logo.svg';
import useStyles from './styles';

function Login({ children }) {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <Typography className={classes.logotypeText}></Typography>
        <img src={logo} alt="Logo" className={classes.logotypeImage} />
        <Typography className={classes.underscript}>Software as a service (SaaS)</Typography>
        <Typography color="primary" className={classes.copyright}>
          © {new Date().getFullYear()} Noud de Brouwer
        </Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>{children}</div>
      </div>
    </Grid>
  );
}

export default Login;
