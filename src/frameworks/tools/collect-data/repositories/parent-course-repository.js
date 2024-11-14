const { QueryTypes } = require('sequelize')

module.exports = async (sequelize) => {
  const parentCourses = await sequelize.query(
    'SELECT * FROM jenis_diklats WHERE deleted_at IS NULL ORDER BY created_at',
    { type: QueryTypes.SELECT }
  )

  const results = []
  for (const parentCourse of parentCourses)
    results.push({
      id: parentCourse.id,
      name: parentCourse.nama,
      code: parentCourse.kode,
      alias: parentCourse.alias,
      type: parentCourse.kategori,
      createdAt: parentCourse.created_at,
      updatedAt: parentCourse.updated_at
    })

  return results
}
