const express = require('express')

const aspectRoutes = (controllers) => {
  const router = express.Router()
  const { aspectController, subjectWeightController } = controllers

  router.get('/:id/subject-weights', subjectWeightController.index)
  router.post('/:id/subject-weights', subjectWeightController.store)
  router.get('/:id', aspectController.show)
  router.put('/:id', aspectController.update)
  router.delete('/:id', aspectController.drop)

  return router
}

module.exports = aspectRoutes
