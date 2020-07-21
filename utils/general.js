// Takes two Maps and merge the common keys into the first by applying a function between its values
const mergeWith = f => (map1, map2) => {
  Array.from(map2.keys()).forEach(key => {
    map1.set(key, f(map1.get(key), map2.get(key)))
  })
  return map1
}

// Convert a given Object to Map
const toMap = obj => new Map(Object.entries(obj))

const add = (x, y) => x + y

const subtract = (x, y) => x - y

const product = (x, y) => x * y

const divide = (x, y) => x / y

module.exports = { mergeWith, add, subtract, product, divide, toMap }
