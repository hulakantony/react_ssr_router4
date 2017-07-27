import { USERS_FETCH_SUCCESS } from '../actions/users'
const initialState = {
   readyStatus: '',
   list: []
};
const users = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case USERS_FETCH_SUCCESS:
      return { ...state, list: payload, readyStatus: type };
    default:
      return state;
  }
}

export default users
