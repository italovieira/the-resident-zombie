const mongoose = require('mongoose')
const { mongoUri } = require('./utils/db')

mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database connection established successfully')
  })
  .catch(err => {
    console.err('Unable to connect to database')
  })

module.exports = mongoose
