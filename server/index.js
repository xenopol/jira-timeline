const express = require('express')
const cors = require('cors')
const config = require('./config')
// const { resolve } = require('path')
const app = express()
const port = process.env.port || 3000

if (!config.jiraCookie) throw new Error('Missing environment variables!')

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Authorization, X-Authorization',
  preflightContinue: false,
  optionsSuccessStatus: 204
}

app.use(cors(corsOptions))
app.use('/api/jira/', require('./Jira'))

// static file handling
// app.use(express.static(resolve(__dirname, '../build')))

const server = app.listen(port, () => {
  console.log('Server is listening on port %s', port)
})

module.exports = server