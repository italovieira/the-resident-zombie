const express = require('express')
const router = express.Router()
const createError = require('http-errors')

const Survivor = require('../models/Survivor')

router.use('/:id', async (req, res, next) => {
  const survivor = await Survivor.findOne({ id: req.params.id })

  if (!survivor) {
    next(createError(404, 'Survivor not found'))
  }

  res.locals.survivor = survivor
  next()
})

router.post('/', async (req, res, next) => {
  const { id, name, age, gender, latitude, longitude, inventory } = req.body

  try {
    const survivor = new Survivor({
      id,
      name,
      age,
      gender,
      latitude,
      longitude,
      inventory,
    })
    res.json(await survivor.save())
  } catch (err) {
    if (err.name === 'MongoError' && err.code === 11000) {
      next(createError(422, 'Survivor already exists'))
    }
    next(err)
  }
})

router.put('/:id/location', async (req, res, next) => {
  const survivor = res.locals.survivor

  const { latitude, longitude } = req.body
  survivor.latitude = latitude
  survivor.longitude = longitude

  res.json(await survivor.save())
})

router.post('/:id/infected', async (req, res, next) => {
  const survivor = res.locals.survivor

  const { id } = req.body
  const flaggedInfected = await Survivor.findOne({ id })

  if (!flaggedInfected) {
    next(createError(404, 'Survivor to flag as infected not found'))
  }

  // If survivor has not already been flagged
  if (flaggedInfected.flaggedBy.indexOf(survivor.id) === -1) {
    flaggedInfected.flaggedBy.push(survivor.id)
  }

  res.json(await flaggedInfected.save())
})

module.exports = router
