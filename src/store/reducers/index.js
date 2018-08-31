import { combineReducers } from 'redux'
import status from './status'
import sprint from './sprint'
import storyChanges from './story-change'
import stepSize from './step-size'

export default combineReducers({
  status,
  sprint,
  storyChanges,
  stepSize,
})