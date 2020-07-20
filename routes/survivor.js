const express = require('express')
const router = express.Router()
const createError = require('http-errors')

const Survivor = require('../models/Survivor')
const { mergeWith, add, subtract } = require('../utils/general')

router.post('/survivors', async (req, res) => {
  const { id, name, age, gender, latitude, longitude, inventory } = req.body
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
})

router.put('/survivors/:id/location', async (req, res, next) => {
  const survivor = await Survivor.findOne({ id: req.params.id })

  if (!survivor) {
    next(createError(404, 'Survivor not found'))
  }

  const { latitude, longitude } = req.body
  survivor.latitude = latitude
  survivor.longitude = longitude

  res.json(await survivor.save())
})

router.post('/survivors/:id/infected', async (req, res, next) => {
  const survivor = await Survivor.findOne({ id: req.params.id })

  if (!survivor) {
    next(createError(404, 'Survivor not found'))
  }

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

router.post('/trades', async (req, res, next) => {
  const [obj1, obj2] = req.body

  const survivor1 = await Survivor.findOne({ id: obj1.id })
  const survivor2 = await Survivor.findOne({ id: obj2.id })

  mergeWith(subtract)(survivor1.inventory, obj1.items)
  mergeWith(add)(survivor1.inventory, obj2.items)

  mergeWith(subtract)(survivor2.inventory, obj2.items)
  mergeWith(add)(survivor2.inventory, obj1.items)

  res.json([await survivor1.save().a, await survivor2.save().b])
})

module.exports = router
