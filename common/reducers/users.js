import { USERS_FETCH_SUCCESS } from '../actions/users'
const initialState = [];
const users = (state = initialState, action) => {
  switch (action.type) {
    case USERS_FETCH_SUCCESS:
      return action.payload;
    default:
      return state
  }
}

export default users
