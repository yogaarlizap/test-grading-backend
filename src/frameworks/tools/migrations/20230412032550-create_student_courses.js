'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('student_courses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      courseId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      studentId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false
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

    await queryInterface.addConstraint('student_courses', {
      type: 'foreign key',
      fields: ['courseId'],
      references: {
        table: 'courses',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.removeConstraint(
      'student_courses',
      'student_courses_courseId_courses_fk'
    )

    await queryInterface.dropTable('student_courses')
  }
}
