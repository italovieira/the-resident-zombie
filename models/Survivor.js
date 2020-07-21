const db = require('../db')
const {
  mergeWith,
  toMap,
  add,
  subtract,
  product,
  divide,
} = require('../utils/general')

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

  mergeWith(product)(points, this.inventory)
  return Array.from(points.values()).reduce(add)
}

survivorSchema.methods.addItems = function (items) {
  mergeWith(add)(this.inventory, toMap(items))
}

survivorSchema.methods.removeItems = function (items) {
  mergeWith(subtract)(this.inventory, toMap(items))
}

survivorSchema.statics.getAverageResources = function (survivors) {
  const emptyInventory = new Map()
  emptyInventory.set('Fiji Water', 0)
  emptyInventory.set('Campbell Soup', 0)
  emptyInventory.set('First Aid Pouch', 0)
  emptyInventory.set('AK47', 0)

  // To divide by the total
  const fakeInventory = new Map()
  const total = survivors.length
  fakeInventory.set('Fiji Water', total)
  fakeInventory.set('Campbell Soup', total)
  fakeInventory.set('First Aid Pouch', total)
  fakeInventory.set('AK47', total)

  const inventories = survivors.map(survivor => survivor.inventory)
  return mergeWith(divide)(
    inventories.reduce(mergeWith(add), emptyInventory),
    fakeInventory
  )
}

module.exports = db.model('Survivor', survivorSchema)
