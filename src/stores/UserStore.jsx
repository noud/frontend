import { createStore } from './Store';

const UserStore = createStore('user', {
  isAuthenticated: typeof localStorage !== 'undefined' && !!localStorage.getItem('id_token'),
});

function loginUser(loginMutation, login, password) {
  if (!!login && !!password) {
    loginMutation[0]({
      variables: {
        username: login,
        password: password,
      },
    });
  }
}

function registerUser(registerMutation, name, login, password, passwordConfirmation) {
  if (!!name && !!login && !!password && !!passwordConfirmation) {
    registerMutation[0]({
      variables: {
        name: name,
        username: login,
        password: password,
        password_confirmation: passwordConfirmation,
      },
    });
  }
}

function forgotPassword(forgotPasswordMutation, email) {
  if (!!email) {
    forgotPasswordMutation[0]({
      variables: { email: email },
    });
  }
}

function updateForgottenPassword(updateForgottenPasswordMutation, email, token, password, passwordConfirmation) {
  if (!!email && !!token && !!password && !!passwordConfirmation) {
    updateForgottenPasswordMutation[0]({
      variables: {
        email: email,
        token: token,
        password: password,
        password_confirmation: passwordConfirmation,
      },
    });
  }
}

function signOut(history) {
  localStorage.removeItem('id_token');
  localStorage.removeItem('user_name');

  UserStore.set({
    isAuthenticated: false,
  });

  history.push('/login');
}

export { loginUser, registerUser, forgotPassword, updateForgottenPassword, signOut };

export default UserStore;
