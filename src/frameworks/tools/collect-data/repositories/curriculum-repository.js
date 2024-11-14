const { QueryTypes } = require('sequelize')

module.exports = async (sequelize) => {
  const curriculums = await sequelize.query(
    'SELECT * FROM kurikulums WHERE deleted_at IS NULL ORDER BY created_at',
    { type: QueryTypes.SELECT }
  )

  const results = []
  for (const curriculum of curriculums)
    results.push({
      id: curriculum.id,
      parentCourseId: curriculum.jenis_diklat_id,
      metaData: {
        code: curriculum.kode,
        number: curriculum.nomor,
        date: curriculum.tanggal,
        notes: curriculum.ketentuan_diklat
      },
      createdAt: curriculum.created_at,
      updatedAt: curriculum.updated_at
    })

  return results
}
