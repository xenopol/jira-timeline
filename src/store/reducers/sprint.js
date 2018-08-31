import { SET_SPRINT_SUCCESS } from '../actions/sprint'

const sprint = (state = {}, { type, payload }) => {
  switch (type) {
    case SET_SPRINT_SUCCESS:
      return { ...payload }
    default:
      return state
  }
}

export default sprint
