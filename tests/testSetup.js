const mongoose = require('mongoose')
const { mongoUri } = require('../utils/db')

const Survivor = require('../models/Survivor')
const survivors = require('./seeds/survivor')

const seedDatabase = async () => {
  await Survivor.create(survivors)
}

const dropDatabase = async () => {
  await Survivor.collection.drop()
}

module.exports = {
  setupDb(databaseName) {
    // connect to database
    beforeAll(async () => {
      // Replace database name in URI
      const mongoUriTest = mongoUri.replace(
        /\/(?!.*\/).*?\?/,
        `/${databaseName}?`
      )

      await mongoose.connect(mongoUriTest, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })

      await seedDatabase()
    })

    // disconnect database
    afterAll(async () => {
      await dropDatabase()
      await mongoose.connection.close()
    })
  },
}
