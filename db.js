const mongoose = require('mongoose')
const { mongoUri } = require('./utils/db')

const connect = () => {
  return mongoose
    .connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => {
      console.log('Database connection established successfully')
    })
    .catch(err => {
      console.err('Unable to connect to database')
    })
}

module.exports = {
  Schema: mongoose.Schema,
  model: mongoose.model,
  connect,
}
