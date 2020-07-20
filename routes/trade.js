const express = require('express')
const router = express.Router()

const Survivor = require('../models/Survivor')

router.post('/', async (req, res, next) => {
  const [obj1, obj2] = req.body

  const survivor1 = await Survivor.findOne({ id: obj1.id })
  const survivor2 = await Survivor.findOne({ id: obj2.id })

  survivor1.removeItems(obj1.items)
  survivor1.addItems(obj2.items)

  survivor2.removeItems(obj2.items)
  survivor2.addItems(obj1.items)

  res.json([
    { id: obj1.id, items: await survivor1.save().inventory },
    { id: obj2.id, items: await survivor2.save().inventory },
  ])
})

module.exports = router
