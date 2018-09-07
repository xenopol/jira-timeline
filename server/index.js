const express = require('express')
const cookieParser = require('cookie-parser')
const fs = require('fs')
const path = require('path')

const app = express()
const port = process.env.port || 3000

const changesFilePath = path.resolve(__dirname, 'Jira', 'data', 'changes.json')
if (!fs.existsSync(changesFilePath)) {
  fs.writeFileSync(changesFilePath, '{}', 'utf8', err => {
    if (err) throw err
  })
}

const corsOptions = (req, res, next) => {
  if (req.headers.origin) res.header('Access-Control-Allow-Origin', req.headers.origin)
  else res.header('Access-Control-Allow-Origin', '*')

  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,PATCH')
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, accept, authorization, cache-control, content-type, expires, pragma'
  )
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
}

app.use(corsOptions)
app.use(cookieParser())
app.use('/api/jira/', require('./Jira'))

const server = app.listen(port, () => {
  console.log('Server is listening on port %s', port)
})

module.exports = server