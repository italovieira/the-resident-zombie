const express = require('express')
const router = express.Router()

const Survivor = require('../models/Survivor')
const { mergeWith, add, subtract } = require('../utils/general')

router.post('/', async (req, res, next) => {
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
