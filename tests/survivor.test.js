const Survivor = require('../models/Survivor')
const app = require('../app')
const request = require('supertest')(app)
const { setupDb } = require('./testSetup')

setupDb('survivor')

test('should save survivor to database', async done => {
  const res = await request.post('/survivors').send({
    id: 'jimgordon',
    name: 'Jim Gordon',
    age: '58',
    gender: 'm',
    latitude: 90,
    longitude: -180,
    inventory: {
      'Fiji Water': 3,
      'Campbell Soup': 1,
      'First Aid Pouch': 3,
      AK47: 1,
    },
  })

  const survivor = await Survivor.findOne({ id: 'jimgordon' })

  expect(survivor.name).toBeTruthy()

  done()
})

test('should update survivor location', async done => {
  const data = { latitude: -18, longitude: 39 }
  const res = await request.put('/survivors/batman/location').send(data)

  const survivor = await Survivor.findOne({ id: 'batman' })

  expect(survivor.latitude).toBe(-18)
  expect(survivor.longitude).toBe(39)

  done()
})

test('should flag infected survivor', async done => {
  const data = { id: 'penguin' }

  const res = await request.post('/survivors/robin/infected').send(data)

  const flaggedInfected = await Survivor.findOne(data)

  expect(flaggedInfected.flaggedBy).toContain('robin')

  done()
})

test('should get sum of points per user', async () => {
  const survivor = await Survivor.findOne({ id: 'catwoman' })
  expect(survivor.getPoints()).toBe(30 * 14 + 6 * 12 + 30 * 10 + 3 * 8)
})

describe('trade items', () => {
  test('should trade items between given survivors', async done => {
    const data = [
      {
        id: 'joker',
        items: {
          'Campbell Soup': 6,
          AK47: 6,
        },
      },
      {
        id: 'harleyquinn',
        items: {
          'Fiji Water': 5,
          'First Aid Pouch': 5,
        },
      },
    ]

    const res = await request.post('/trades').send(data)

    const survivor1 = await Survivor.findOne({ id: 'joker' })

    // check Joker inventory
    expect(survivor1.inventory.get('Fiji Water')).toBe(12 + 5)
    expect(survivor1.inventory.get('Campbell Soup')).toBe(42 - 6)
    expect(survivor1.inventory.get('First Aid Pouch')).toBe(7 + 5)
    expect(survivor1.inventory.get('AK47')).toBe(13 - 6)

    // check  Harley Quinn inventory
    const survivor2 = await Survivor.findOne({ id: 'harleyquinn' })
    expect(survivor2.inventory.get('Fiji Water')).toBe(22 - 5)
    expect(survivor2.inventory.get('Campbell Soup')).toBe(21 + 6)
    expect(survivor2.inventory.get('First Aid Pouch')).toBe(14 - 5)
    expect(survivor2.inventory.get('AK47')).toBe(5 + 6)

    done()
  })

  test.todo('should fail if one of the survivors is infected')

  test.todo('should fail if one of the survivors do not have enough items')

  test.todo('should fail if the trade is not of equal value for both survivors')
})
