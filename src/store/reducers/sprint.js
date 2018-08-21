import { SET_SPRINT, SET_ISSUE_STATE } from '../actions/data'

const sprint = (state = {}, action) => {
  switch (action.type) {
    case SET_SPRINT:
      return {
        ...state,
        ...action.payload,
      }
    case SET_ISSUE_STATE:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

export default sprint
