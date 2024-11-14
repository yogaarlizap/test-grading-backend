'use strict'

const config = require('../../../config/config')
const postgresConnection = require('../../database/postgres/connection')
const subjectUseCases = require('../../../application/use-cases/subject/index')
const subjectRepository = require('../../database/postgres/repositories/subject-repository')
const Subject = require('../../database/postgres/models/subject')

const sequelize = postgresConnection(config)

const { faker } = require('@faker-js/faker')
const _ = require('lodash')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const subjectUseCase = subjectUseCases({
      subjectRepo: subjectRepository({ subjectModel: await Subject(sequelize) })
    })
    const { findAllSubjectsWithPaginate } = subjectUseCase

    const { data: subjects } = await findAllSubjectsWithPaginate({
      limit: -1,
      page: 1,
      query: { isMainSubject: false }
    })

    const data = []
    for (let i = 0; i < 10; i++) {
      const subjectIds = _.map(subjects, 'id')

      for (let j = 0; j < 5; j++) {
        const indexKe = _.random(0, subjectIds.length - 1)
        const subjectId = subjectIds[indexKe]
        subjectIds.splice(indexKe, 1)

        data.push({
          aspectId: i + 1,
          subjectId,
          numHn: faker.random.numeric(3),
          jpVariant: JSON.stringify({
            numJpTeori: 30 ?? faker.random.numeric(),
            numJpPraktek: 30 ?? faker.random.numeric(),
            numJpUjian: 30 ?? faker.random.numeric()
          })
        })
      }
    }
    await queryInterface.bulkInsert('subject_weights', data)
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
