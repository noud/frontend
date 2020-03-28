import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import queryString from 'query-string';
import { updateForgottenPassword } from '../../stores/AuthStore';

import { CircularProgress, Typography, Button, Tabs, Tab, TextField, Fade } from '@material-ui/core';
import AuthLayout from './AuthLayout';
import useStyles from './styles';

import { callOnEnter } from '../../lib';

export default function ResetPassword(props) {
  const { location } = props;
  const { search } = location;
  const params = queryString.parse(search);
  const { email, token } = params;

  const history = useHistory();
  const classes = useStyles();
  const { t, i18n } = useTranslation('auth');

  // local
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [loginValue, setLoginValue] = useState(email);
  const [passwordValue, setPasswordValue] = useState('');
  const [passwordConfirmationValue, setPasswordConfirmationValue] = useState('');

  const updateForgottenPasswordMutation = useMutation(
    gql`
      mutation updateForgottenPassword($email: String!, $token: String!, $password: String!, $password_confirmation: String!) {
        updateForgottenPassword(input: { email: $email, token: $token, password: $password, password_confirmation: $password_confirmation }) {
          status
          message
        }
      }
    `,
    {
      onCompleted: ({ updateForgottenPassword }) => {
        setIsLoading(false);

        if (updateForgottenPassword.status === 'PASSWORD_UPDATED') {
          history.push('/login');
        } else {
          setMessage(updateForgottenPassword.message);
        }
      },
      onError: (data) => {
        setIsLoading(false);

        setMessage('Unknown error');
      },
    }
  );

  const isUpdateForgottenPasswordSubmitDisabled = () => {
    return (
      (loginValue.length === 0 && t('The email field is required')) ||
      (passwordValue.length < 8 && t('The password should be 8 characters or longer')) ||
      (passwordValue !== passwordConfirmationValue && t('The provided passwords do not match'))
    );
  };

  const submitUpdateForgottenPasswordForm = () => {
    if (!isUpdateForgottenPasswordSubmitDisabled()) {
      setIsLoading(true);

      setMessage(null);

      updateForgottenPassword(updateForgottenPasswordMutation, loginValue, token, passwordValue, passwordConfirmationValue);
    }
  };

  const updatePasswordMessage = isUpdateForgottenPasswordSubmitDisabled() || message;

  return (
    <AuthLayout>
      <Typography variant="h1" className={classes.greeting}>
        {t('Update password')}
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
        onKeyDown={callOnEnter(submitUpdateForgottenPasswordForm)}
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
        onKeyDown={callOnEnter(submitUpdateForgottenPasswordForm)}
        margin="normal"
        placeholder={t('New password')}
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
        onKeyDown={callOnEnter(submitUpdateForgottenPasswordForm)}
        margin="normal"
        placeholder={t('Repeat password')}
        type="password"
        variant="outlined"
        fullWidth
      />
      <div className={classes.formButtons}>
        {isLoading ? (
          <CircularProgress size={26} className={classes.loginLoader} />
        ) : (
          <Button
            disabled={!!isUpdateForgottenPasswordSubmitDisabled()}
            onClick={() => {
              submitUpdateForgottenPasswordForm();
            }}
            variant="contained"
            color="primary"
            size="large"
            fullWidth
          >
            {t('Reset password')}
          </Button>
        )}
      </div>
      <br />
      <Fade in={!!updatePasswordMessage}>
        <Typography color="secondary" className={classes.errorMessage}>
          {updatePasswordMessage}
        </Typography>
      </Fade>
    </AuthLayout>
  );
}
