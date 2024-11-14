const { QueryTypes } = require('sequelize')
const _ = require('lodash')

module.exports = async (sequelize) => {
  const parentSubjects = await sequelize.query(
    'SELECT * FROM bidang_studis WHERE deleted_at IS NULL ORDER BY created_at',
    { type: QueryTypes.SELECT }
  )
  const subjects = await sequelize.query(
    'SELECT * FROM mata_diklats WHERE deleted_at IS NULL AND bidang_studi_id IS NOT NULL ORDER BY created_at',
    { type: QueryTypes.SELECT }
  )

  const results = []

  for (const parentSubject of parentSubjects) {
    results.push({
      id: parentSubject.id,
      name: parentSubject.bidang_studi,
      metaData: {},
      code: '-',
      isMainSubject: true,
      parentId: null,
      createdAt: parentSubject.created_at,
      updatedAt: parentSubject.updated_at
    })

    const subjectsByParent = _.filter(subjects, {
      bidang_studi_id: Number(parentSubject.id)
    })
    for (const subject of subjectsByParent)
      results.push({
        id: subject.id,
        name: subject.nama,
        metaData: {
          objective: subject.tujuan_pel,
          mainTopic: subject.pokok_bahasan,
          reference: subject.keterangan
        },
        code: subject.kode,
        isMainSubject: false,
        parentId: parentSubject.id,
        createdAt: subject.created_at,
        updatedAt: subject.updated_at
      })
  }

  return results
}
