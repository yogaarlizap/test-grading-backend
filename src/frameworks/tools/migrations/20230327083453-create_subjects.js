'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('subjects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      metaData: {
        allowNull: true,
        type: DataTypes.JSON
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false
      },
      isMainSubject: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      parentId: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    })

    await queryInterface.addConstraint('subjects', {
      type: 'foreign key',
      fields: ['parentId'],
      references: {
        table: 'subjects',
        field: 'id'
      },
      onUpdate: 'SET NULL',
      onDelete: 'SET NULL'
    })
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.removeConstraint(
      'subjects',
      'subjects_parentId_subjects_fk'
    )

    await queryInterface.dropTable('subjects')
  }
}
