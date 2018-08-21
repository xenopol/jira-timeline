import { SET_STEP_SIZE } from '../actions/setStepSize'

const stepSize = (state = {}, action) => {
  switch (action.type) {
    case SET_STEP_SIZE:
      return action.payload
    default:
      return state
  }
}

export default stepSize
