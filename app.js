const express = require('express')
const logger = require('morgan')

const { PORT } = require('./config')
const { handleError } = require('./utils/error')

const indexRouter = require('./routes/index')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', indexRouter)

// error handler
app.use((err, req, res, next) => {
  handleError(err, res)
})

app.listen(PORT)

module.exports = app
