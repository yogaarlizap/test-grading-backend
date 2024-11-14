const { QueryTypes } = require('sequelize')
const _ = require('lodash')

module.exports = async (sequelize, curriculums) => {
  const curriculumIds = _.map(curriculums, 'id')
  const aspects = await sequelize.query(
    `SELECT * FROM aspeks WHERE deleted_at IS NULL AND kurikulum_id = ANY(ARRAY[${curriculumIds}]) ORDER BY created_at`,
    { type: QueryTypes.SELECT }
  )

  const results = []
  for (const aspect of aspects)
    results.push({
      id: aspect.id,
      name: aspect.nama,
      curriculumId: aspect.kurikulum_id,
      weight: aspect.bobot,
      createdAt: aspect.created_at,
      updatedAt: aspect.updated_at
    })

  return results
}
