const express = require('express')
const axios = require('axios')
const editChange = require('./changes')
const changes = require('./data/changes.json')

const router = express.Router()

const baseUrl = 'https://jira.tdc.dk/rest/agile/1.0'
const BOARD_ID = 2066

const getOptions = credentials => ({
  headers: {
    'Authorization': `Basic ${credentials}`,
  },
  responseType: 'json',
})

router.get('/login', ({ query: { credentials } }, response) => {
  const oneYear = 365 * 24 * 60 * 60 * 1000

  axios.get(`${baseUrl}/board/${BOARD_ID}`, getOptions(credentials))
    .then(res => {
      response.cookie('credentials', credentials, { maxAge: oneYear })
      response.status(200).send(res.data)
    })
    .catch(({ response: { data } }) => response.status(401).send(data))
})

router.get('/active-sprint', ({ cookies: { credentials } }, response) => {
  axios.get(`${baseUrl}/board/${BOARD_ID}/sprint?state=active`, getOptions(credentials))
    .then(res => response.status(200).send(res.data))
    .catch(({ response: { data } }) => response.status(401).send(data))
})

// TODO: integrate pagination
router.get('/issue', ({ cookies: { credentials }, query: { sprintId } }, response) => {
  axios.get(`${baseUrl}/board/${BOARD_ID}/sprint/${sprintId}/issue`, getOptions(credentials))
    .then(res => response.status(200).send(res.data))
    .catch(({ response: { data } }) => response.status(401).send(data))
})

router.get('/change', (request, response) => {
  const sprintId = request.query.sprintId
  const { sprints = [] } = changes
  const { changes: sprintChanges = [] } = sprints.find(s => s.id === Number(sprintId)) || {}
  return response.status(200).send({ changes: sprintChanges })
})

router.get('/change/save', (request, response) => {
  const change = request.query.change
  editChange(change)
    .then(() => response.status(200).send({ status: 'success', message: 'State saved' }))
    .catch(error => response.status(400).send({ status: 'error', message: error }))
})

module.exports = router