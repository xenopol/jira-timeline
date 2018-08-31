import { SET_STEP_SIZE } from '../actions/step-size'

const stepSize = (state = 0, { type, payload }) => {
  switch (type) {
    case SET_STEP_SIZE:
      return payload
    default:
      return state
  }
}

export default stepSize
