const express = require('express')

const parentCourseRoutes = (controllers) => {
  const router = express.Router()
  const { parentCourseController } = controllers

  router.get('/', parentCourseController.index)
  router.get('/:id', parentCourseController.show)
  router.post('/', parentCourseController.store)
  router.put('/:id', parentCourseController.update)
  router.delete('/:id', parentCourseController.drop)

  // export
  router.get('/export/excel/', parentCourseController.exportExcel)
  router.get('/:id/export/excel', parentCourseController.exportExcelById)

  return router
}

module.exports = parentCourseRoutes
