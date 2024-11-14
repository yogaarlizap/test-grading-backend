const { QueryTypes } = require('sequelize')
const _ = require('lodash')

module.exports = async (sequelize, courses) => {
  const courseIds = _.map(courses, 'id')
  const legalities = await sequelize.query(
    `SELECT * FROM legalitases WHERE deleted_at IS NULL AND diklat_id = ANY(ARRAY[${courseIds}]) ORDER BY created_at`,
    { type: QueryTypes.SELECT }
  )

  const results = []
  for (const legality of legalities)
    results.push({
      id: legality.id,
      name: legality.nama,
      courseId: legality.diklat_id,
      createdAt: legality.created_at,
      updatedAt: legality.updated_at
    })

  return results
}
