// Takes one Map and one object and merge the common keys (only those in the object) by applying a function between its values
const mergeWith = f => (map, obj) => {
  Object.keys(obj).forEach(key => {
    map.set(key, f(map.get(key), obj[key]))
  })
}

const add = (x, y) => x + y

const subtract = (x, y) => x - y

const product = (x, y) => x * y

module.exports = { mergeWith, add, subtract, product }
