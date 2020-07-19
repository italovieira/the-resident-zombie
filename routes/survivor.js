const express = require('express')
const router = express.Router()

const Survivor = require('../models/Survivor')

router.post('/signup', async (req, res) => {
  const { name, age, gender, latitude, longitude, inventory } = req.body
  const survivor = new Survivor({
    name,
    age,
    gender,
    latitude,
    longitude,
    inventory,
  })
  res.json(await survivor.save())
})

module.exports = router
