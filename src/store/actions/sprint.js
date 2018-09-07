import { getActiveSprint, getIssues } from '../../api'
import mockActiveSprint from '../../Mock/activeSprint'
import mockIssues from '../../Mock/issues'
import { initStoryChanges } from './story-change'
import { loading, error } from './status'

const getData = async () => {
  const { data: sprintData } = await getActiveSprint()
  const [activeSprint] = sprintData.values
  const { data: issuesData } = await getIssues(activeSprint.id)
  return {
    name: activeSprint.name,
    sprintId: activeSprint.id,
    sprintStart: activeSprint.startDate,
    sprintEnd: activeSprint.endDate,
    issues: issuesData.issues,
  }
}

const getMockData = async () => {
  const [activeSprint] = mockActiveSprint.values
  return {
    name: activeSprint.name,
    sprintId: activeSprint.id,
    sprintStart: activeSprint.startDate,
    sprintEnd: activeSprint.endDate,
    issues: mockIssues.issues,
  }
}

export const SET_SPRINT_SUCCESS = 'SET_SPRINT_SUCCESS'
const setSprintSuccess = sprint => ({
  type: SET_SPRINT_SUCCESS,
  payload: sprint,
})

export const setSprint = sprint => dispatch => {
  dispatch(loading(true))
  getData()
    .then(({ name, sprintId, sprintStart, sprintEnd, issues }) => {
      dispatch(setSprintSuccess({ name, sprintId, sprintStart, sprintEnd, issues }))
      dispatch(initStoryChanges())
    })
    .catch(err => dispatch(error(err)))
}
