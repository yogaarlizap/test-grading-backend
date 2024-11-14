'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('legalities', {
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
      name: {
        type: DataTypes.STRING,
        allowNull: true
      }
    })

    await queryInterface.addConstraint('legalities', {
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
      'legalities',
      'legalities_courseId_courses_fk'
    )

    await queryInterface.dropTable('legalities')
  }
}
