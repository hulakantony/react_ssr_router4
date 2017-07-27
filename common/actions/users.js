import axios from 'axios';
export const USERS_FETCH_SUCCESS = 'USERS_FETCH_SUCCESS'

const shouldFetchUsers = state => {
  const users = state.users;
  if (users.readyStatus === USERS_FETCH_SUCCESS) return false;
  return true;
};
export const fetchUsers = () => (dispatch) => {
  return axios('https://jsonplaceholder.typicode.com/users')
  .then(res => {
      dispatch({
        type: USERS_FETCH_SUCCESS,
        payload: res.data
      });
  }).catch(err => {
    console.log(err);
  })
};

export const fetchUsersIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchUsers(getState())) {
    return dispatch(fetchUsers());
  }
  return null;
}
