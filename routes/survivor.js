const express = require('express')
const router = express.Router()
const createError = require('http-errors')

const Survivor = require('../models/Survivor')

router.post('/signup', async (req, res) => {
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

router.put('/update_location/:id', async (req, res, next) => {
  const survivor = await Survivor.findOne({ id: req.params.id })

  if (!survivor) {
    next(createError(404, 'Survivor not found'))
  }

  const { latitude, longitude } = req.body
  survivor.latitude = latitude
  survivor.longitude = longitude

  res.json(await survivor.save())
})

module.exports = router
