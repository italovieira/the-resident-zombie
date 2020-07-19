const mongoose = require('mongoose')
const { mongoUri } = require('../utils/db')

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
    })

    // disconnect database
    afterAll(async () => {
      await mongoose.connection.close()
    })
  },
}
