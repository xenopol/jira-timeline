import { LOADING, ERROR } from '../actions/status'

const initialState = {
  loading: true,
  error: null,
}

const status = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADING:
      return { ...state, loading: payload }
    case ERROR:
      return { loading: false, error: payload }
    default:
      return state
  }
}

export default status
