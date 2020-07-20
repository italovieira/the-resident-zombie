const db = require('../db')
const { mergeWith, add, subtract, product } = require('../utils/general')

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

survivorSchema.methods.isInfected = function () {
  return this.flaggedBy.length >= 5
}

survivorSchema.methods.getPoints = function () {
  const points = new Map()
  points.set('Fiji Water', 14)
  points.set('Campbell Soup', 12)
  points.set('First Aid Pouch', 10)
  points.set('AK47', 8)

  mergeWith(product)(points, Object.fromEntries(this.inventory))
  return Array.from(points.values()).reduce(add)
}

survivorSchema.methods.addItems = function (items) {
  mergeWith(add)(this.inventory, items)
}

survivorSchema.methods.removeItems = function (items) {
  mergeWith(subtract)(this.inventory, items)
}

module.exports = db.model('Survivor', survivorSchema)
