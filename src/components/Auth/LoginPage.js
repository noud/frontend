import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import UserStore, { loginUser, registerUser, forgotPassword } from '../../stores/UserStore';

import { CircularProgress, Typography, Button, Tabs, Tab, TextField, Fade } from '@material-ui/core';
import AuthLayout from './AuthLayout';
import useStyles from './styles';

import { callOnEnter } from '../../lib';

export default function Login() {
  const { t } = useTranslation('login');
  const history = useHistory();
  const classes = useStyles();

  // local
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [activeTabId, setActiveTabId] = useState(0);
  const [nameValue, setNameValue] = useState('');
  const [loginValue, setLoginValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [passwordConfirmationValue, setPasswordConfirmationValue] = useState('');

  const switchToTab = (id) => {
    setMessage(null);
    setIsLoading(false);

    setActiveTabId(id);
  };

  const loginMutation = useMutation(
    gql`
      mutation Login($username: String!, $password: String!) {
        login(input: { username: $username, password: $password }) {
          access_token
          refresh_token
          expires_in
          token_type
          user {
            id
            email
            name
          }
        }
      }
    `,
    {
      onCompleted: ({ login }) => {
        setIsLoading(false);

        localStorage.setItem('id_token', login.access_token);
        localStorage.setItem('user_name', login.user.name);

        UserStore.set(
          {
            isAuthenticated: true,
          },
          () => {
            history.push('/app');
          }
        );
      },
      onError: (data) => {
        setIsLoading(false);

        setMessage('Unknown error');
      },
    }
  );

  const registerMutation = useMutation(
    gql`
      mutation Register($name: String!, $username: String!, $password: String!, $password_confirmation: String!) {
        register(input: { name: $name, email: $username, password: $password, password_confirmation: $password_confirmation }) {
          tokens {
            access_token
            refresh_token
            expires_in
            token_type
          }
          status
        }
      }
    `,
    {
      onCompleted: ({ register }) => {
        setIsLoading(false);

        localStorage.setItem('id_token', register.tokens.access_token);

        UserStore.set(
          {
            isAuthenticated: true,
          },
          () => {
            history.push('/app');
          }
        );
      },
      onError: (data) => {
        setIsLoading(false);

        setMessage('Unknown error');
      },
    }
  );

  const forgotPasswordMutation = useMutation(
    gql`
      mutation forgotPassword($email: String!) {
        forgotPassword(input: { email: $email }) {
          status
          message
        }
      }
    `,
    {
      onCompleted: ({ forgotPassword = {} }) => {
        setIsLoading(false);

        setMessage(forgotPassword.message);
      },
      onError: (data) => {
        setIsLoading(false);

        setMessage('Unknown error');
      },
    }
  );

  const isRegisterSubmitDisabled = () => {
    return (
      (nameValue.length === 0 && t('The name field is required')) ||
      (loginValue.length === 0 && t('The email field is required')) ||
      (passwordValue.length < 8 && t('The password should be 8 characters or longer')) ||
      (passwordValue !== passwordConfirmationValue && t('The provided passwords do not match'))
    );
  };

  const submitLoginForm = () => {
    setMessage(null);
    setIsLoading(true);
    loginUser(loginMutation, loginValue, passwordValue);
  };

  const submitRegisterForm = () => {
    if (!isRegisterSubmitDisabled()) {
      setMessage(null);
      setIsLoading(true);
      registerUser(registerMutation, nameValue, loginValue, passwordValue, passwordConfirmationValue);
    }
  };

  const submitForgotPasswordForm = () => {
    setMessage(null);
    setIsLoading(true);
    forgotPassword(forgotPasswordMutation, loginValue);
  };

  const registerMessage = isRegisterSubmitDisabled() || message;

  return (
    <AuthLayout>
      <Tabs value={activeTabId} onChange={(e, id) => switchToTab(id)} indicatorColor="primary" textColor="primary" centered>
        <Tab label={t('Login')} classes={{ root: classes.tab }} />
        <Tab label={t('Register')} classes={{ root: classes.tab }} />
        <Tab label={t('Forgot password')} classes={{ root: classes.tab }} style={{ display: 'none' }} />
      </Tabs>
      {activeTabId === 0 && (
        <React.Fragment>
          <Typography variant="h2" className={classes.greeting}>
            {t('greeting')}
          </Typography>
          <br />
          <TextField
            id="email"
            InputProps={{
              classes: {
                input: classes.textField,
              },
            }}
            value={loginValue}
            onChange={(e) => setLoginValue(e.target.value)}
            onKeyDown={callOnEnter(submitLoginForm)}
            margin="normal"
            placeholder={t('Email Address')}
            type="email"
            variant="outlined"
            fullWidth
          />
          <TextField
            id="password"
            InputProps={{
              classes: {
                input: classes.textField,
              },
            }}
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
            onKeyDown={callOnEnter(submitLoginForm)}
            margin="normal"
            placeholder={t('Password')}
            type="password"
            variant="outlined"
            fullWidth
          />
          <div className={classes.formButtons}>
            {isLoading ? (
              <CircularProgress size={26} className={classes.loginLoader} />
            ) : (
              <Button
                disabled={loginValue.length === 0 || passwordValue.length === 0}
                onClick={() => {
                  submitLoginForm();
                }}
                variant="contained"
                color="primary"
                size="large"
              >
                {t('Login')}
              </Button>
            )}
            <Button
              color="primary"
              size="large"
              className={classes.forgetButton}
              onClick={() => {
                switchToTab(2);
              }}
            >
              {t('Forgot Password')}
            </Button>
          </div>
          <br />
          <Fade in={!!message}>
            <Typography color="secondary" className={classes.errorMessage}>
              {t('Login credentials error')}
            </Typography>
          </Fade>
        </React.Fragment>
      )}
      {activeTabId === 1 && (
        <React.Fragment>
          <Typography variant="h2" className={classes.subGreeting}>
            {t('Create your account')}
          </Typography>
          <br />
          <TextField
            id="name"
            InputProps={{
              classes: {
                input: classes.textField,
              },
            }}
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
            onKeyDown={callOnEnter(submitRegisterForm)}
            margin="normal"
            placeholder={t('Full Name')}
            type="text"
            variant="outlined"
            fullWidth
          />
          <TextField
            id="email"
            InputProps={{
              classes: {
                input: classes.textField,
              },
            }}
            value={loginValue}
            onChange={(e) => setLoginValue(e.target.value)}
            onKeyDown={callOnEnter(submitRegisterForm)}
            margin="normal"
            placeholder={t('Email Address')}
            type="email"
            variant="outlined"
            fullWidth
          />
          <TextField
            id="password"
            InputProps={{
              classes: {
                input: classes.textField,
              },
            }}
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
            onKeyDown={callOnEnter(submitRegisterForm)}
            margin="normal"
            placeholder={t('Password')}
            type="password"
            variant="outlined"
            fullWidth
          />
          <TextField
            id="password_confirmation"
            InputProps={{
              classes: {
                input: classes.textField,
              },
            }}
            value={passwordConfirmationValue}
            onChange={(e) => setPasswordConfirmationValue(e.target.value)}
            onKeyDown={callOnEnter(submitRegisterForm)}
            margin="normal"
            placeholder={t('Repeat password')}
            type="password"
            variant="outlined"
            fullWidth
          />
          <div className={classes.creatingButtonContainer}>
            {isLoading ? (
              <CircularProgress size={26} />
            ) : (
              <Button
                onClick={submitRegisterForm}
                disabled={!!isRegisterSubmitDisabled()}
                size="large"
                variant="contained"
                color="primary"
                fullWidth
                className={classes.createAccountButton}
              >
                {t('Create your account')}
              </Button>
            )}
          </div>
          <br />
          <Fade in={!!registerMessage}>
            <Typography color="secondary" className={classes.errorMessage}>
              {registerMessage}
            </Typography>
          </Fade>
        </React.Fragment>
      )}
      {activeTabId === 2 && (
        <React.Fragment>
          <Typography variant="h2" className={classes.greeting}>
            {t('Forgot Password')}
          </Typography>
          <br />
          <TextField
            id="forgotPasswordEmail"
            InputProps={{
              classes: {
                input: classes.textField,
              },
            }}
            value={loginValue}
            onChange={(e) => setLoginValue(e.target.value)}
            onKeyDown={callOnEnter(submitForgotPasswordForm)}
            margin="normal"
            placeholder={t('Email Address')}
            type="email"
            variant="outlined"
            fullWidth
          />
          <div className={classes.formButtons}>
            {isLoading ? (
              <CircularProgress size={26} className={classes.loginLoader} />
            ) : (
              <Button disabled={loginValue.length === 0} onClick={submitForgotPasswordForm} variant="contained" color="primary" size="large">
                {t('Reset Password')}
              </Button>
            )}
          </div>
          <br />
          <Fade in={!!message}>
            <Typography color="secondary" className={classes.errorMessage}>
              {message}
            </Typography>
          </Fade>
        </React.Fragment>
      )}
    </AuthLayout>
  );
}
