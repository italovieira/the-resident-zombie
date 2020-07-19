const db = require('../db')

const survivorSchema = new db.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    match: /[a-zA-Z0-9]+/,
  },
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
  flaggedBy: {
    type: [String],
  },
})

module.exports = db.model('Survivor', survivorSchema)
