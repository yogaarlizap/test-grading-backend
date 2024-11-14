'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    queryInterface.addColumn(
      'certificate_course_data',
      'headFinalScorePosition',
      { type: DataTypes.STRING, allowNull: true }
    )

    queryInterface.addColumn('certificate_course_data', 'headFinalScoreField', {
      type: DataTypes.STRING,
      allowNull: true
    })

    queryInterface.addColumn('certificate_course_data', 'headFinalScoreName', {
      type: DataTypes.STRING,
      allowNull: true
    })

    queryInterface.addColumn('certificate_course_data', 'headFinalScoreNrp', {
      type: DataTypes.STRING,
      allowNull: true
    })

    queryInterface.addColumn(
      'certificate_course_data',
      'headFinalScoreSignature',
      { type: DataTypes.STRING, allowNull: true }
    )
  },

  async down(queryInterface, DataTypes) {}
}
