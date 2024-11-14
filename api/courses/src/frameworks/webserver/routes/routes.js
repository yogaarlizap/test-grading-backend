const routeNotFoundController = require('../../../adapters/controllers/route-not-found-controller')
const aspectRoutes = require('./aspect-routes')
const courseRoutes = require('./course-routes')
const curriculumRoutes = require('./curriculum-routes')
const parentCourseRoutes = require('./parent-course-routes')
const studentCourseRoutes = require('./student-course-routes')
const subjectRoutes = require('./subject-routes')
const subjectWeightRoutes = require('./subject-weight-routes')

const routes = (app, controllers) => {
  app.use('/api/v1/parent-courses', parentCourseRoutes(controllers))
  app.use('/api/v1/curriculums', curriculumRoutes(controllers))
  app.use('/api/v1/courses', courseRoutes(controllers))
  app.use('/api/v1/subjects', subjectRoutes(controllers))
  app.use('/api/v1/aspects', aspectRoutes(controllers))
  app.use('/api/v1/subject-weights', subjectWeightRoutes(controllers))
  app.use('/api/v1/student-courses', studentCourseRoutes(controllers))

  app.all('*', routeNotFoundController)
}

module.exports = routes
