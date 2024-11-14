'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('subject_weights', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      numHn: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      jpVariant: {
        allowNull: true,
        type: DataTypes.JSON
      },
      aspectId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      subjectId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    })

    await queryInterface.addConstraint('subject_weights', {
      type: 'foreign key',
      fields: ['aspectId'],
      references: {
        table: 'aspects',
        field: 'id'
      },
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT'
    })

    await queryInterface.addConstraint('subject_weights', {
      type: 'foreign key',
      fields: ['subjectId'],
      references: {
        table: 'subjects',
        field: 'id'
      },
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT'
    })
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('subject_weights')
  }
}
