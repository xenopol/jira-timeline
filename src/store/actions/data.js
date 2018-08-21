export const SET_SPRINT = 'SET_SPRINT'
export const SET_ISSUE_STATE = 'SET_ISSUE_SATE'

export const setSprint = sprint => ({
  type: SET_SPRINT,
  payload: sprint,
})

export const setIssueState = issueState => ({
  type: SET_ISSUE_STATE,
  payload: issueState,
})
