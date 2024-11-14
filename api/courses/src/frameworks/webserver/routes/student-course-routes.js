const express = require('express')

const studentCourseRoutes = (controllers) => {
  const router = express.Router()
  const { studentCourseController } = controllers

  router.get('/student/:studentId', studentCourseController.indexByStudent)
  router.get('/student', studentCourseController.index)
  router.get('/:id', studentCourseController.show)
  router.post('/', studentCourseController.store)
  router.post('/bulk', studentCourseController.storeBulk)
  router.put('/:id', studentCourseController.update)
  router.delete('/:id', studentCourseController.drop)
  router.post('/get', studentCourseController.indexByIds)
  router.post('/check', studentCourseController.check)

  return router
}

module.exports = studentCourseRoutes
