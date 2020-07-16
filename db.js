const mongoose = require('mongoose')

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = require('./config')

const mongoUri = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
mongoose.connect(mongoUri, { useNewUrlParser: true })

module.exports = mongoose
