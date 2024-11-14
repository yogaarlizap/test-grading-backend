'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('curriculums', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      metaData: {
        allowNull: true,
        type: DataTypes.JSON
      },
      parentCourseId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.fn('now')
      }
    })

    await queryInterface.addConstraint('curriculums', {
      type: 'foreign key',
      fields: ['parentCourseId'],
      references: {
        table: 'parent_courses',
        field: 'id'
      },
      onUpdate: 'SET NULL',
      onDelete: 'SET NULL'
    })
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.removeConstraint(
      'curriculums',
      'curriculums_parentCourseId_parent_courses_fk'
    )

    await queryInterface.dropTable('curriculums')
  }
}
