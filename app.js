const express = require('express')
const logger = require('morgan')

const { handleError } = require('./utils/error')

const indexRouter = require('./routes/index')
const survivorRouter = require('./routes/survivor')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', indexRouter)
app.use('/', survivorRouter)

// error handler
app.use((err, req, res, next) => {
  handleError(err, res)
})

module.exports = app
