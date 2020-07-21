const express = require('express')
const router = express.Router()

const Survivor = require('../models/Survivor')
const { add } = require('../utils/general')

router.get('/', async (req, res, next) => {
  const survivors = await Survivor.find()
  const total = survivors.length

  const infectedSurvivors = survivors.filter(survivor => survivor.isInfected())
  const infected = {}
  infected.total = infectedSurvivors.length
  infected.percentage = (100 * infected.total) / total

  const nonInfectedSurvivors = survivors.filter(
    survivor => !survivor.isInfected()
  )
  const nonInfected = {}
  nonInfected.total = total - infected.total
  nonInfected.percentage = 100 - infected.percentage

  const lostPoints = infectedSurvivors
    .map(infected => infected.getPoints())
    .reduce(add)

  const averageResourcesPerSurvivor = Object.fromEntries(
    Survivor.getAverageResources(nonInfectedSurvivors)
  )

  res.json({
    infected,
    nonInfected,
    lostPoints,
    averageResourcesPerSurvivor,
  })
})

module.exports = router
