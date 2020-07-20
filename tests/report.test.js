const Survivor = require('../models/Survivor')
const app = require('../app')
const request = require('supertest')(app)
const { setupDb } = require('./testSetup')

setupDb('report')

test('should return successful response', async () => {
  const res = await request.get('/report')
  expect(res.status).toBe(200)
})

test('should report percentage of infected survivors correctly', async () => {
  const res = await request.get('/report')
  const infected = res.body.infected

  expect(infected.total).toBe(2)
  expect(infected.percentage).toBe(25)
})

test('should report percentage of non-infected survivors correctly', async () => {
  const res = await request.get('/report')
  const nonInfected = res.body.nonInfected

  expect(nonInfected.total).toBe(6)
  expect(nonInfected.percentage).toBe(75)
})

test('should report the average amount of each kind of resource by the survivor correctly', async () => {
  const res = await request.get('/report')
  const items = res.body.averageResourcesPerSurvivor

  expect(items['Fiji Water']).toBe((41 + 13 + 34 + 12 + 22 + 30) / 6)
  expect(items['Campbell Soup']).toBe((36 + 7 + 24 + 42 + 21 + 6) / 6)
  expect(items['First Aid Pouch']).toBe((43 + 2 + 7 + 14 + 30) / 6)
  expect(items['AK47']).toBe((0 + 4 + 9 + 13 + 5 + 3) / 6)
})

test('should report points lost because of infected survivor correctly', async () => {
  const res = await request.get('/report')
  expect(res.body.lostPoints).toBe(
    (9 + 5) * 14 + (8 + 11) * 12 + (10 + 13) * 10 + (0 + 6) * 8
  )
})
