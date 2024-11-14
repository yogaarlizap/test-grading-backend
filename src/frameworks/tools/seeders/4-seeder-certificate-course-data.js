'use strict'

const { faker } = require('@faker-js/faker')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = []
    for (let i = 0; i < 50; i++) {
      data.push({
        courseId: i + 1,
        frontPosition: faker.name.jobTitle(),
        frontField: faker.name.jobArea(),
        frontName: faker.name.fullName(),
        frontNrp: faker.company.companySuffix(),
        frontSignature: 'test.jpg',
        backPosition: faker.name.jobTitle(),
        backField: faker.name.jobArea(),
        backName: faker.name.fullName(),
        backNrp: faker.company.companySuffix(),
        backSignature: 'test.jpg',
        headFinalScorePosition: faker.name.jobTitle(),
        headFinalScoreField: faker.name.jobArea(),
        headFinalScoreName: faker.name.fullName(),
        headFinalScoreNrp: faker.company.companySuffix(),
        headFinalScoreSignature: 'test.jpg'
      })
    }
    await queryInterface.bulkInsert('certificate_course_data', data)
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
