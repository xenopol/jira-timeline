const util = require('util')
const path = require('path')
const fs = require('fs')
const state = require('./data/state.json')

const writeFile = util.promisify(fs.writeFile)

const writeState = (state) => {
  return writeFile(
    path.resolve(__dirname, 'data', 'state.json'),
    JSON.stringify(state, null, 2),
    'utf8'
  )
}

const editState = async stateData => {
  const { sprintId, issueId, newState } = JSON.parse(stateData)
  const { sprints } = state

  if (!sprintId || !issueId) return Promise.reject(`'sprintId' and 'issueId' are required`)

  if (!sprints) {
    state.sprints = []
    state.sprints.push({
      id: sprintId,
      issues: [
        { id: issueId, markers: [], ...newState }
      ]
    })
    return writeState(state)
  }

  const activeSprint = sprints.find(s => s.id === sprintId)
  const { issues } = activeSprint
  const activeIssue = issues.find(i => i.id === issueId)

  if (!activeIssue) {
    activeSprint.issues.push({ id: issueId, markers: [], ...newState })
    return writeState(state)
  }

  const { marker } = newState
  const { markers } = activeIssue
  let activeMarker = marker && markers.find(m => m.id === marker.id)

  if (activeMarker) {
    activeMarker = marker
    return writeState(state)
  }
  if (marker) {
    markers.push(marker)
    return writeState(state)
  }

  Object.keys(newState).forEach(key => activeIssue[key] = newState[key])
  return writeState(state)
}

module.exports = editState
