const express = require('express')

const curriculumRoutes = (controllers) => {
  const router = express.Router()
  const { curriculumController, aspectController, subjectWeightController } =
    controllers

  router.get('/', curriculumController.index)
  router.get('/:id', curriculumController.show)
  router.post('/', curriculumController.store)
  router.put('/:id', curriculumController.update)
  router.delete('/:id', curriculumController.drop)

  router.get('/:id/aspects', aspectController.index)
  router.post('/:id/aspects', aspectController.store)
  router.post(
    '/:id/aspects/bulk',
    aspectController.storeBulk,
    subjectWeightController.storeBulk
  )
  router.get('/:id/subject-weights', aspectController.indexWithSubjects)

  // export
  router.get('/export/excel', curriculumController.exportExcel)
  router.get('/:id/aspects/export/excel', aspectController.exportExcel)

  return router
}

module.exports = curriculumRoutes
