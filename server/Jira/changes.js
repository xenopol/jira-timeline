const util = require('util')
const path = require('path')
const fs = require('fs')
const changes = require('./data/changes.json')

const writeFile = util.promisify(fs.writeFile)

const writeChange = (change) => {
  return writeFile(
    path.resolve(__dirname, 'data', 'changes.json'),
    JSON.stringify(change, null, 2),
    'utf8'
  )
}

const editChange = async changesData => {
  const { sprintId, changes: incomingChanges } = JSON.parse(changesData)

  if (!sprintId) return Promise.reject(`'sprintId' is required`)

  if (!changes.sprints) changes.sprints = []

  const { sprints } = changes
  const activeSprint = sprints.find(sprint => sprint.id === sprintId)
  if (!activeSprint) {
    sprints.push({ id: sprintId, changes: incomingChanges })
    return writeChange(changes)
  }

  activeSprint.changes = incomingChanges
  return writeChange(changes)
}

module.exports = editChange
