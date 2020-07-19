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
      'First Aid Pouch': 0,
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
    name: 'HarleyQuinn',
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
  const res = await request.post('/signup').send({
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
