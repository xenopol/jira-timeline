export const LOADING = 'LOADING'
export const loading = status => ({
  type: LOADING,
  payload: status,
})

export const ERROR = 'ERROR'
export const error = error => ({
  type: ERROR,
  payload: error,
})