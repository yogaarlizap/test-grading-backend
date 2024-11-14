'use strict'

const { faker } = require('@faker-js/faker')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = []
    for (let i = 0; i < 50; i++) {
      data.push({
        parentCourseId: i + 1,
        metaData: JSON.stringify({
          name: 'test'
        })
      })
    }
    await queryInterface.bulkInsert('curriculums', data)
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
