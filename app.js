const express = require('express')
const logger = require('morgan')
const db = require('./db')

const { PORT } = require('./config')
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

db.connect()

app.listen(PORT, () => console.log('API started listening at port %s', PORT))

module.exports = app
