import axios from 'axios';
export const USERS_FETCH_SUCCESS = 'USERS_FETCH_SUCCESS'

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
}
