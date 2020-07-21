const express = require('express')
const createError = require('http-errors')

const router = express.Router()

const Survivor = require('../models/Survivor')

router.post('/', async (req, res, next) => {
  const [obj1, obj2] = req.body

  const survivor1 = await Survivor.findOne({ id: obj1.id })
  const survivor2 = await Survivor.findOne({ id: obj2.id })

  if (survivor1.isInfected() || survivor2.isInfected()) {
    return next(
      createError(403, 'Trade cannot be made. One of the survivors is infected')
    )
  }

  survivor1.removeItems(obj1.items)
  survivor1.addItems(obj2.items)

  survivor2.removeItems(obj2.items)
  survivor2.addItems(obj1.items)

  const savedSurvivor1 = await survivor1.save()
  const savedSurvivor2 = await survivor2.save()

  res.json([
    { id: obj1.id, items: savedSurvivor1.inventory },
    { id: obj2.id, items: savedSurvivor2.inventory },
  ])
})

module.exports = router
