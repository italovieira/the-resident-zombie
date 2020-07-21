const express = require('express')
const createError = require('http-errors')

const router = express.Router()

const Survivor = require('../models/Survivor')
const { toMap } = require('../utils/general')

router.post('/', async (req, res, next) => {
  const [obj1, obj2] = req.body

  const survivor1 = await Survivor.findOne({ id: obj1.id })
  const survivor2 = await Survivor.findOne({ id: obj2.id })
  if (!survivor1 || !survivor2) {
    return next(createError(404, 'Survivor not found'))
  }

  if (survivor1.isInfected() || survivor2.isInfected()) {
    return next(
      createError(403, 'Trade cannot be made. One of the survivors is infected')
    )
  }

  const items1 = toMap(obj1.items)
  const items2 = toMap(obj2.items)

  if (Survivor.getPoints(items1) != Survivor.getPoints(items2)) {
    return next(
      createError(
        403,
        'Trade cannot be made. Items points must be equal for both survivors'
      )
    )
  }

  survivor1.removeItems(items1)
  survivor1.addItems(items2)

  survivor2.removeItems(items2)
  survivor2.addItems(items1)

  if (!survivor1.haveEnoughItems() || !survivor2.haveEnoughItems()) {
    return next(
      createError(
        403,
        'Trade cannot be made. One of the survivors do not have enough items in inventory'
      )
    )
  }

  const savedSurvivor1 = await survivor1.save()
  const savedSurvivor2 = await survivor2.save()

  res.json([
    { id: obj1.id, items: savedSurvivor1.inventory },
    { id: obj2.id, items: savedSurvivor2.inventory },
  ])
})

module.exports = router
