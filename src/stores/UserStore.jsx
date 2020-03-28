import { createStore } from './Store';

const UserStore = createStore('user', {
  userId: typeof localStorage !== 'undefined' && !!localStorage.getItem('user_id'),
});

function getUser(getUserQuery, id) {
  if (!!id) {
    getUserQuery[0]({
      variables: { id: id },
    });
  }
}

export { getUser };

export default UserStore;
