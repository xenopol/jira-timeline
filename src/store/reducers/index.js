import { combineReducers } from 'redux'
import isLoggedIn from './login'
import status from './status'
import sprint from './sprint'
import storyChanges from './story-change'
import stepSize from './step-size'

export default combineReducers({
  isLoggedIn,
  status,
  sprint,
  storyChanges,
  stepSize,
})