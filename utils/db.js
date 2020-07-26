const {
  DB_PROTOCOL,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_OPTIONS,
} = require('../config')

const mongoUri = `${DB_PROTOCOL}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?${DB_OPTIONS}`

module.exports = { mongoUri }
