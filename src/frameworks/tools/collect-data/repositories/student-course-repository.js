let profileRepository = require('../../../services/repositories/user-repository')
const _ = require('lodash')
profileRepository = profileRepository()

module.exports = async (courses) => {
  const profiles = await profileRepository.getAll({})
  const courseIds = _.map(courses, 'id')

  const results = []
  for (const profile of profiles) {
    // hanya ambil data profile yang punya course id & dan course id nya ada di data course yg baru
    if (
      profile.profile.course &&
      _.includes(courseIds, String(profile.profile.course)) &&
      profile.profile.studentStatus
    )
      results.push({
        studentId: profile.id,
        courseId: profile.profile.course,
        status:
          profile.profile.studentStatus === 'Alumni' ? 'Sudah Lulus' : 'Aktif',
        createdAt: profile.createdAt,
        updatedAt: profile.updatedAt
      })
  }

  return results
}
