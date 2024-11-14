'use strict'

const { faker } = require('@faker-js/faker')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = []
    const totalBidangStudi = 5
    const totalSubject = 5

    // creating bidang studi
    for (let i = 1; i <= totalBidangStudi; i++) {
      data.push({
        name: faker.animal.type(),
        metaData: JSON.stringify({}),
        code: '-',
        isMainSubject: true,
        parentId: null
      })
    }

    for (let i = 1; i <= totalBidangStudi; i++) {
      for (let j = 0; j < totalSubject; j++) {
        data.push({
          name: faker.music.songName(),
          metaData: JSON.stringify({
            objective: faker.lorem.paragraph(),
            mainTopic: faker.lorem.paragraph(),
            reference: faker.lorem.paragraph()
          }),
          code: Math.floor(1000 + Math.random() * 9000),
          isMainSubject: false,
          parentId: i
        })
      }
    }

    await queryInterface.bulkInsert('subjects', data)
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
