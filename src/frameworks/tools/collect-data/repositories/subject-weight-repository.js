const { QueryTypes } = require('sequelize')
const _ = require('lodash')

module.exports = async (sequelize, aspects, subjects) => {
  const aspectIds = _.map(aspects, 'id')
  const subjectIds = _.map(subjects, 'id')
  const subjectWeights = await sequelize.query(
    `SELECT * FROM mata_diklat_jps WHERE deleted_at IS NULL AND aspek_id = ANY(ARRAY[${aspectIds}]) AND mata_diklat_id = ANY(ARRAY[${subjectIds}]) ORDER BY created_at`,
    { type: QueryTypes.SELECT }
  )

  const results = []
  for (const subjectWeight of subjectWeights)
    results.push({
      id: subjectWeight.id,
      aspectId: subjectWeight.aspek_id,
      subjectId: subjectWeight.mata_diklat_id,
      jpVariant: {
        numJpTeori: subjectWeight.jml_jp_t,
        numJpPraktek: subjectWeight.jml_jp_p,
        numJpUjian: subjectWeight.jml_jp_u
      },
      numHn: subjectWeight.jml_hn_md,
      createdAt: subjectWeight.created_at,
      updatedAt: subjectWeight.updated_at
    })

  return results
}
