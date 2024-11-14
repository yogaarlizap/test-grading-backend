const { QueryTypes } = require('sequelize')
const generateMd5 = require('../../../helpers/generate-md5')
const fs = require('fs')

module.exports = async (sequelize, fileRepository) => {
  const courses = await sequelize.query(
    'SELECT * FROM diklats WHERE deleted_at IS NULL ORDER BY created_at',
    { type: QueryTypes.SELECT }
  )

  const results = []
  const courseCertificates = []
  for (const course of courses) {
    results.push({
      id: course.id,
      parentCourseId: course.jenis_diklat_id,
      batchName: course.angkatan_gol_ta,
      openDate: course.tanggal_buka,
      closeDate: course.tanggal_tutup,
      method: course.metode,
      curriculumId: course.kurikulum_id,
      certificateType: course.jenis_sertifikat,
      createdAt: course.created_at,
      updatedAt: course.updated_at
    })

    courseCertificates.push({
      courseId: course.id,
      frontPosition: course.jabatan_kepala_1_1,
      frontField: course.jabatan_kepala_2_1,
      frontName: course.nama_kepala_1,
      frontNrp: course.pangkat_kepala_1,
      frontSignature: course.ttd_kepala_1
        ? certificatePath(course.ttd_kepala_1, course.id, 'front')
        : null,
      backPosition: course.jabatan_kepala_1_2,
      backField: course.jabatan_kepala_2_2,
      backName: course.nama_kepala_2,
      backNrp: course.pangkat_kepala_2,
      backSignature: course.ttd_kepala_2
        ? certificatePath(course.ttd_kepala_2, course.id, 'back')
        : null,
      createdAt: course.created_at,
      updatedAt: course.updated_at
    })
  }

  await uploadSignature(fileRepository, courseCertificates)

  return { courses: results, courseCertificates }
}

const certificatePath = (filename, courseId, type) => {
  const courseIdHash = generateMd5(`${courseId}`)

  return `courses/${courseIdHash}/certificate/${type}-${filename}`
}

const uploadSignature = (fileRepository, courseCertificates) => {
  for (const certificate of courseCertificates) {
    if (certificate.frontSignature) upload(certificate.frontSignature)
    if (certificate.backSignature) upload(certificate.backSignature)

    function upload(filename) {
      try {
        fs.readFile(
          __dirname +
            '/../../../../../storage/courses/' +
            filename.split('/')[3],

          function (err, data) {
            fileRepository.put(data, filename)
          }
        )
      } catch (e) {
        throw e
      }
    }
  }
}
