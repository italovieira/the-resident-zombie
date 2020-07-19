const db = require('../db')

const survivorSchema = new db.Schema({
  name: String,
  age: Number,
  gender: String,
  latitude: {
    type: Number,
    min: -90,
    max: 90,
  },
  longitude: {
    type: Number,
    min: -180,
    max: 180,
  },
  inventory: {
    type: Map,
    of: Number,
  },
})

module.exports = db.model('Survivor', survivorSchema)
