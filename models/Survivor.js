const db = require('../db')
const { mergeWith, add, subtract } = require('../utils/general')

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


survivorSchema.methods.addItems = function (items) {
  mergeWith(add)(this.inventory, items)
}

survivorSchema.methods.removeItems = function (items) {
  mergeWith(subtract)(this.inventory, items)
}

module.exports = db.model('Survivor', survivorSchema)
