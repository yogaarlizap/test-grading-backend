'use strict'

const { faker } = require('@faker-js/faker')

/** @type {import('sequelize-cli').Migration} */

const type = ['Teknis', 'Fungsional', 'Latsar']

const arrayRandom = (items) => {
  return items[Math.floor(Math.random() * items.length)]
}

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = []
    for (let i = 0; i < 50; i++) {
      data.push({
        name: faker.name.jobArea(),
        code: faker.finance.currencyCode(),
        type: arrayRandom(type)
      })
    }
    await queryInterface.bulkInsert('parent_courses', data)
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
