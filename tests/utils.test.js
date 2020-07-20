const { mergeWith, subtract } = require('../utils/general')

test('test merge common keys in first object with source object by applying a function', () => {
  const map = new Map()
  map.set('a', 6)
  map.set('b', -5)

  const obj = { a: 9, b: -5 }

  mergeWith(subtract)(map, obj)
  expect(map.get('a')).toBe(6 - 9)
  expect(map.get('b')).toBe(-5 + 5)
})
