import { LOGGING_IN } from '../actions/login'

const isLoggedIn = document.cookie.includes('credentials=')

const login = (state = isLoggedIn, { type }) => {
  switch (type) {
    case LOGGING_IN:
      return true
    default:
      return state
  }
}

export default login
