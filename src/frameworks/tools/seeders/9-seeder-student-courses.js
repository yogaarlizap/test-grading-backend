'use strict'

const { faker } = require('@faker-js/faker')
const _ = require('lodash')

//repo service
const profileRepository = require('../../services/repositories/user-repository')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const getProfileIds = await arrayProfileId()
    const data = []
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 5; j++) {
        data.push({
          courseId: i + 1,
          // studentId: i * 5 + j + 1,
          studentId: arrayRandom(getProfileIds),
          status: 'Aktif'
        })
      }
    }
    await queryInterface.bulkInsert('student_courses', data)
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
}

const arrayProfileId = async () => {
  const profileRepo = profileRepository()
  const getProfiles = await profileRepo.getAll({
    isCandidate: false,
    typeAcc: 'siswa'
  })
  const profiles = getProfiles
  const profileIds = [...new Set(_.map(profiles, 'id'))]
  return profileIds
}

const arrayRandom = (items) => {
  return items[Math.floor(Math.random() * items.length)]
}
