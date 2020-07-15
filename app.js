const express = require('express')
const logger = require('morgan')

const { PORT } = require('./config')

const indexRouter = require('./routes/index')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', indexRouter)

app.listen(PORT)

module.exports = app
