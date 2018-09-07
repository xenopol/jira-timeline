import { login } from '../../api'
import { loading, error } from './status'

export const LOGGING_IN = 'LOGGING_IN'
const loggingIn = () => ({
  type: LOGGING_IN,
})

export const handleLogin = credentials => dispatch => {
  login(credentials)
    .then(data => {
      dispatch(error(null))
      dispatch(loading(true))
      dispatch(loggingIn())
    })
    .catch(err => dispatch(error('Wrong credentials')))
}
