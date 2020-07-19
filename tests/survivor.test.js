const Survivor = require('../models/Survivor')
const app = require('../app')
const request = require('supertest')(app)
const { setupDb } = require('./testSetup')

setupDb('survivor')

test('should save survivor to database', async done => {
  const res = await request.post('/signup').send({
    name: 'Foo',
    age: '10',
    gender: 'm',
    latitude: 10,
    longitude: -10,
    inventory: {
      'Fiji Water': 1,
      'Campbell Soup': 1,
      'First Aid Pouch': 10,
      AK47: 1,
    },
  })

  const survivor = await Survivor.findOne({ name: 'Foo' })

  expect(survivor.name).toBeTruthy()

  done()
})
