const { mergeWith, subtract } = require('../utils/general')

test('test merge common keys in Maps', () => {
  const map1 = new Map()
  map1.set('a', 6)
  map1.set('b', -5)

  const map2 = new Map()
  map2.set('a', 9)
  map2.set('b', -5)

  mergeWith(subtract)(map1, map2)
  expect(map1.get('a')).toBe(6 - 9)
  expect(map1.get('b')).toBe(-5 + 5)
})
