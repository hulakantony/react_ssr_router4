import { combineReducers } from 'redux'
import counter from './counter'
import users from './users'

const rootReducer = combineReducers({
  counter,
  users
})

export default rootReducer
