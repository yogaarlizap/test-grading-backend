const express = require('express')

const subjectRoutes = (controllers) => {
  const router = express.Router()
  const { subjectController } = controllers

  router.get('/', subjectController.index)
  router.get('/:id', subjectController.show)
  router.post('/', subjectController.store)
  router.post('/get', subjectController.getByIds)
  router.put('/:id', subjectController.update)
  router.delete('/:id', subjectController.drop)

  // export
  router.get('/export/excel', subjectController.exportExcel)
  router.get('/:id/export/excel', subjectController.exportExcelById)

  return router
}

module.exports = subjectRoutes
