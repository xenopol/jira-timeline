const express = require('express')
const axios = require('axios')
const config = require('../config')
const editState = require('./state')
const state = require('./data/state.json')

const router = express.Router()

const baseUrl = 'https://jira.tdc.dk/rest/agile/1.0'
const BOARD_ID = 2066
const options = {
  headers: {
    cookie: config.jiraCookie,
  },
  responseType: 'json',
}

router.get('/active-sprint', (request, response) => {
  axios.get(`${baseUrl}/board/${BOARD_ID}/sprint?state=active`, options)
    .then(res => {
      return response.status(200).send(res.data)
    })
    .catch(error => {
      return response.status(400).send(error)
    })
})

// TODO: integrate pagination
router.get('/issue', (request, response) => {
  const sprintId = request.query.sprintId
  axios.get(`${baseUrl}/board/${BOARD_ID}/sprint/${sprintId}/issue`, options)
    .then(res => {
      return response.status(200).send(res.data)
    })
    .catch(error => {
      return response.status(400).send(error)
    })
})

router.get('/state', (request, response) => {
  const sprintId = request.query.sprintId
  const { sprints = [] } = state
  const { changes = [] } = sprints.find(s => s.id === Number(sprintId)) || {}
  return response.status(200).send({ changes })
})

router.get('/state/save', (request, response) => {
  const state = request.query.state
  editState(state)
    .then(() => response.status(200).send({ status: 'success', message: 'State saved' }))
    .catch(error => response.status(400).send({ status: 'error', message: error }))
})

module.exports = router