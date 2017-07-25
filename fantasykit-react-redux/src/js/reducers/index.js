import { combineReducers } from "redux"

import tweets from "./tweetsReducer"
import user from "./userReducer"
import players from "./playerReducer"

export default combineReducers({
  tweets,
  user,
  players,
})
