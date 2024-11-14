require('dotenv').config()
const fs = require('fs').promises
const realDataConfig = require('./config/config')
const appConfig = require('../../../config/config')

const postgresConnection = require('../../database/postgres/connection')
const appSequelize = postgresConnection({ ...appConfig, nodeEnv: 'production' })
const realDataSequelize = postgresConnection(realDataConfig)

/*=====================IMPORT MODELS===================== */
const Aspect = require('../../database/postgres/models/aspect')
const CertificateCourseData = require('../../database/postgres/models/certificate-course-data')
const Course = require('../../database/postgres/models/course')
const Curriculum = require('../../database/postgres/models/curriculum')
const Legality = require('../../database/postgres/models/legality')
const ParentCourse = require('../../database/postgres/models/parent-course')
const StudentCourse = require('../../database/postgres/models/student-course')
const SubjectWeight = require('../../database/postgres/models/subject-weight')
const Subject = require('../../database/postgres/models/subject')

const parentCourseRepository = require('./repositories/parent-course-repository')
const subjectRepository = require('./repositories/subject-repository')
const curriculumRepository = require('./repositories/curriculum-repository')
const aspectRepository = require('./repositories/aspect-repository')
const subjectWeightRepository = require('./repositories/subject-weight-repository')
const courseRepository = require('./repositories/course-repository')
const legalityRepository = require('./repositories/legality-repository')
const studentCourseRepository = require('./repositories/student-course-repository')
let fileRepository = require('../../filesystem/' + appConfig.filesystem)

;(async () => {
  /*=====================DEFINE MODELS===================== */
  const models = {
    aspectModel: await Aspect(appSequelize),
    certificateCourseDataModel: await CertificateCourseData(appSequelize),
    courseModel: await Course(appSequelize),
    curriculumModel: await Curriculum(appSequelize),
    legalityModel: await Legality(appSequelize),
    parentCourseModel: await ParentCourse(appSequelize),
    studentCourseModel: await StudentCourse(appSequelize),
    subjectWeightModel: await SubjectWeight(appSequelize),
    subjectModel: await Subject(appSequelize)
  }

  // await writeLog(data.subjects)

  const data = await collectData()

  await insertData(models, data)

  process.exit()
})()

const collectData = async () => {
  const { courses, courseCertificates } = await courseRepository(
    realDataSequelize,
    await fileRepository
  )
  const subjects = await subjectRepository(realDataSequelize)
  const curriculums = await curriculumRepository(realDataSequelize)
  const aspects = await aspectRepository(realDataSequelize, curriculums)
  const parentCourses = await parentCourseRepository(realDataSequelize)
  const subjectWeights = await subjectWeightRepository(
    realDataSequelize,
    aspects,
    subjects
  )
  const legalities = await legalityRepository(realDataSequelize, courses)
  const studentCourses = await studentCourseRepository(courses)

  console.log('--- Success Get All Real Data From Previous Server ---')

  return {
    parentCourses,
    subjects,
    curriculums,
    aspects,
    subjectWeights,
    courses,
    courseCertificates,
    legalities,
    studentCourses
  }
}

const insertData = async (models, data) => {
  const {
    aspectModel,
    certificateCourseDataModel,
    courseModel,
    curriculumModel,
    legalityModel,
    parentCourseModel,
    studentCourseModel,
    subjectWeightModel,
    subjectModel
  } = models
  const {
    parentCourses,
    subjects,
    curriculums,
    aspects,
    subjectWeights,
    courses,
    courseCertificates,
    legalities,
    studentCourses
  } = data

  await parentCourseModel.bulkCreate(parentCourses)
  await subjectModel.bulkCreate(subjects)
  await curriculumModel.bulkCreate(curriculums)
  await aspectModel.bulkCreate(aspects)
  await subjectWeightModel.bulkCreate(subjectWeights)
  await courseModel.bulkCreate(courses)
  await certificateCourseDataModel.bulkCreate(courseCertificates)
  await legalityModel.bulkCreate(legalities)
  await studentCourseModel.bulkCreate(studentCourses)
  await appSequelize.query(
    `SELECT setval('parent_courses_id_seq', (SELECT MAX(id) FROM parent_courses)+1);`
  )
  await appSequelize.query(
    `SELECT setval('subjects_id_seq', (SELECT MAX(id) FROM subjects)+1);`
  )
  await appSequelize.query(
    `SELECT setval('curriculums_id_seq', (SELECT MAX(id) FROM curriculums)+1);`
  )
  await appSequelize.query(
    `SELECT setval('aspects_id_seq', (SELECT MAX(id) FROM aspects)+1);`
  )
  await appSequelize.query(
    `SELECT setval('subject_weights_id_seq', (SELECT MAX(id) FROM subject_weights)+1);`
  )
  await appSequelize.query(
    `SELECT setval('courses_id_seq', (SELECT MAX(id) FROM courses)+1);`
  )
  await appSequelize.query(
    `SELECT setval('certificate_course_data_id_seq', (SELECT MAX(id) FROM certificate_course_data)+1);`
  )
  await appSequelize.query(
    `SELECT setval('legalities_id_seq', (SELECT MAX(id) FROM legalities)+1);`
  )
  await appSequelize.query(
    `SELECT setval('student_courses_id_seq', (SELECT MAX(id) FROM student_courses)+1);`
  )

  console.log('--- Success Save All Real Data To New Server ---')
}

const writeLog = async (data, filename = 'data') => {
  await fs.writeFile(
    `./${filename}.json`,
    JSON.stringify({ rows: data.length, data })
  )
}
