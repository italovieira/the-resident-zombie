const Survivor = require('../models/Survivor')
const app = require('../app')
const request = require('supertest')(app)
const { setupDb } = require('./testSetup')

setupDb('survivor')

const survivors = [
  {
    id: 'batman',
    name: 'Batman',
    age: '40',
    gender: 'm',
    latitude: 10,
    longitude: -10,
    inventory: {
      'Fiji Water': 41,
      'Campbell Soup': 36,
      'First Aid Pouch': 43,
      AK47: 0,
    },
  },
  {
    id: 'robin',
    name: 'Robin',
    age: '22',
    gender: 'f',
    latitude: -78,
    longitude: -14,
    inventory: {
      'Fiji Water': 13,
      'Campbell Soup': 7,
      'First Aid Pouch': 5,
      AK47: 4,
    },
  },
  {
    id: 'wonderwoman',
    name: 'Wonder Woman',
    age: '39',
    gender: 'f',
    latitude: 90,
    longitude: 0,
    inventory: {
      'Fiji Water': 34,
      'Campbell Soup': 24,
      'First Aid Pouch': 2,
      AK47: 9,
    },
  },
  {
    id: 'joker',
    name: 'Joker',
    age: '46',
    gender: 'm',
    latitude: -30,
    longitude: 116,
    inventory: {
      'Fiji Water': 12,
      'Campbell Soup': 42,
      'First Aid Pouch': 7,
      AK47: 13,
    },
  },
  {
    id: 'alfred',
    name: 'Alfred',
    age: '70',
    gender: 'm',
    latitude: 80,
    longitude: 2,
    inventory: {
      'Fiji Water': 9,
      'Campbell Soup': 8,
      'First Aid Pouch': 10,
      AK47: 0,
    },
  },
  {
    id: 'harleyquinn',
    name: 'Harley Quinn',
    age: '31',
    gender: 'f',
    latitude: -43,
    longitude: 101,
    inventory: {
      'Fiji Water': 22,
      'Campbell Soup': 21,
      'First Aid Pouch': 14,
      AK47: 5,
    },
  },
  {
    id: 'penguin',
    name: 'Penguin',
    age: '46',
    gender: 'm',
    latitude: -43,
    longitude: 101,
    inventory: {
      'Fiji Water': 12,
      'Campbell Soup': 11,
      'First Aid Pouch': 13,
      AK47: 6,
    },
  },
]

beforeAll(async () => {
  await Survivor.create(survivors)
})

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

    const res = await request.post('/survivors/trades').send(data)

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

afterAll(async () => {
  // Removes the Survivor collection
  await Survivor.collection.drop()
})
