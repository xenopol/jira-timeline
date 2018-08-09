import axios from 'axios'

const baseUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:4000/api/jira' : ''

export const getActiveSprint = () => axios.get(`${baseUrl}/active-sprint`)
export const getIssues = sprintId => axios.get(`${baseUrl}/issue?sprintId=${sprintId}`)
