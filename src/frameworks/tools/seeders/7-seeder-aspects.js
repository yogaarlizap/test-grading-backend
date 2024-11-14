'use strict'

const { faker } = require('@faker-js/faker')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = []
    for (let i = 0; i < 10; i++) {
      data.push({
        curriculumId: i + 1,
        name: faker.name.jobTitle(),
        weight: faker.random.numeric(2)
      })
    }
    await queryInterface.bulkInsert('aspects', data)
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
