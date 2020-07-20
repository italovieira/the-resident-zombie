const express = require('express')
const logger = require('morgan')
const createError = require('http-errors')

const { handleError } = require('./utils/error')

const indexRouter = require('./routes/index')
const survivorRouter = require('./routes/survivor')
const tradeRouter = require('./routes/trade')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', indexRouter)
app.use('/survivors', survivorRouter)
app.use('/trades', tradeRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  handleError(err, res)
})

module.exports = app
