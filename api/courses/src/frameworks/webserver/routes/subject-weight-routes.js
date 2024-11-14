const express = require('express')

const subjectWeightRoutes = (controllers) => {
  const router = express.Router()
  const { subjectWeightController } = controllers

  router.get('/', subjectWeightController.indexInternal)
  router.get(
    '/:courseId/:subjectId',
    subjectWeightController.jpByCourseAndSubject
  )
  router.get(
    '/get/:courseId/:subjectId',
    subjectWeightController.subjectWeightByCourseAndSubject
  )
  router.post('/:courseId/:subjectId', subjectWeightController.useJp)
  router.get('/:id', subjectWeightController.show)
  router.put('/:id', subjectWeightController.update)
  router.delete('/:id', subjectWeightController.drop)

  return router
}

module.exports = subjectWeightRoutes
