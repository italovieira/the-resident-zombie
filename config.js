const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  PORT: process.env.PORT,
  DB_PROTOCOL: process.env.DB_PROTOCOL,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_NAME: process.env.DB_NAME,
  DB_OPTIONS: process.env.DB_OPTIONS,
}
