'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('certificate_course_data', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      courseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
      },
      frontPosition: {
        type: DataTypes.STRING,
        allowNull: true
      },
      frontField: {
        type: DataTypes.STRING,
        allowNull: true
      },
      frontName: {
        type: DataTypes.STRING,
        allowNull: true
      },
      frontNrp: {
        type: DataTypes.STRING,
        allowNull: true
      },
      frontSignature: {
        type: DataTypes.STRING,
        allowNull: true
      },
      backPosition: {
        type: DataTypes.STRING,
        allowNull: true
      },
      backField: {
        type: DataTypes.STRING,
        allowNull: true
      },
      backName: {
        type: DataTypes.STRING,
        allowNull: true
      },
      backNrp: {
        type: DataTypes.STRING,
        allowNull: true
      },
      backSignature: {
        type: DataTypes.STRING,
        allowNull: true
      }
    })

    await queryInterface.addConstraint('certificate_course_data', {
      type: 'foreign key',
      fields: ['courseId'],
      references: { table: 'courses', field: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.removeConstraint(
      'certificate_course_data',
      'certificate_course_data_courseId_courses_fk'
    )

    await queryInterface.dropTable('certificate_course_data')
  }
}
