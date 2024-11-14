'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('aspects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      weight: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      curriculumId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    })

    await queryInterface.addConstraint('aspects', {
      type: 'foreign key',
      fields: ['curriculumId'],
      references: {
        table: 'curriculums',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.removeConstraint(
      'aspects',
      'aspects_curriculumId_curriculums_fk'
    )

    await queryInterface.dropTable('aspects')
  }
}
