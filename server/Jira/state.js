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
  const { sprintId, changes } = JSON.parse(stateData)

  if (!sprintId) return Promise.reject(`'sprintId' is required`)

  if (!state.sprints) state.sprints = []

  const { sprints } = state
  const activeSprint = sprints.find(sprint => sprint.id === sprintId)
  if (!activeSprint) {
    sprints.push({ id: sprintId, changes })
    return writeState(state)
  }

  activeSprint.changes = changes
  return writeState(state)
}

module.exports = editState
