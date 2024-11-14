'use strict'

const { faker } = require('@faker-js/faker')
const _ = require('lodash')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = []
    for (let i = 0; i < 50; i++) {
      const nowDate = _.sample([
        new Date(Date.now()),
        addYears(new Date(Date.now()), 0.2)
      ])
      data.push({
        parentCourseId: i + 1,
        curriculumId: i + 1,
        batchName: faker.company.name(),
        openDate: nowDate,
        closeDate: _.sample([nowDate, addYears(nowDate, 1)]),
        method: 'Online',
        certificateType: _.sample(['STTP', 'SRTF'])
      })
    }
    await queryInterface.bulkInsert('courses', data)
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

function addYears(date, years) {
  return new Date(date.getTime() + years * 1000 * 60 * 60 * 24 * 30 * 12)
}
