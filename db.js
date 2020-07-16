const mongoose = require('mongoose')

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_OPTIONS,
} = require('./config')

const mongoUri = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?${DB_OPTIONS}`
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })

module.exports = mongoose
