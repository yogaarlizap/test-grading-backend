const express = require('express')

const courseRoutes = (controllers) => {
  const router = express.Router()
  const { courseController } = controllers

  router.get('/', courseController.index)
  router.get('/year', courseController.getYearUnique)
  router.get('/:id', courseController.show)
  router.get('/:id/students', courseController.showStudents)
  router.post('/', courseController.store)
  router.post('/get', courseController.getByIds)
  router.put('/:id', courseController.update)
  router.delete('/:id', courseController.drop)
  router.post(
    '/file',
    courseController.uploadFile,
    courseController.processFile
  )

  router.post('/:id/legalities', courseController.storeLegalities)
  router.put('/legalities/:id', courseController.updateLegalities)
  router.delete('/legalities/:id', courseController.deleteLegalities)

  router.post('/:id/check-subjects', courseController.checkSubjects)

  router.get('/:id/subjects', courseController.subjects)

  // export
  router.get('/export/excel', courseController.exportExcel)
  router.get('/:id/export/excel', courseController.exportExcelById)

  return router
}

module.exports = courseRoutes
