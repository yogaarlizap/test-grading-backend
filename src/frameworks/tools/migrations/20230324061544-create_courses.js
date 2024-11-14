'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('courses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      batchName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      openDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      closeDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      method: {
        type: DataTypes.STRING,
        allowNull: true
      },
      parentCourseId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      curriculumId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      certificateType: { type: DataTypes.STRING, allowNull: false },
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

    await queryInterface.addConstraint('courses', {
      type: 'foreign key',
      fields: ['parentCourseId'],
      references: {
        table: 'parent_courses',
        field: 'id'
      },
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT'
    })

    await queryInterface.addConstraint('courses', {
      type: 'foreign key',
      fields: ['curriculumId'],
      references: {
        table: 'curriculums',
        field: 'id'
      },
      onUpdate: 'RESTRICT',
      onDelete: 'SET NULL'
    })
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.removeConstraint(
      'courses',
      'courses_curriculumId_curriculums_fk'
    )

    await queryInterface.removeConstraint(
      'courses',
      'courses_parentCourseId_parent_courses_fk'
    )

    await queryInterface.dropTable('courses')
  }
}
