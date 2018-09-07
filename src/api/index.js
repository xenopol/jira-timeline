import axios from 'axios'

const baseUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:4000/api/jira' : ''
const options = { withCredentials: true }

export const login = credentials => axios.get(
  `${baseUrl}/login?credentials=${credentials}`,
  options
)
export const getActiveSprint = () => axios.get(`${baseUrl}/active-sprint`, options)
export const getIssues = sprintId => axios.get(`${baseUrl}/issue?sprintId=${sprintId}`, options)
export const saveChangeToServer = change => axios.get(`${baseUrl}/change/save?change=${change}`)
export const getChangeFromServer = sprintId => axios.get(`${baseUrl}/change?sprintId=${sprintId}`)
