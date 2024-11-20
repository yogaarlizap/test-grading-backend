'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('project_has_tasks', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      projectId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      taskId: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });

    await queryInterface.addConstraint('project_has_tasks', {
      type: 'foreign key',
      fields: ['projectId'],
      references: {
        table: 'projects',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addConstraint('project_has_tasks', {
      type: 'foreign key',
      fields: ['taskId'],
      references: {
        table: 'tasks',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint(
      'project_has_tasks',
      'project_has_tasks_projectId_projects_fk'
    );

    await queryInterface.removeConstraint(
      'project_has_tasks',
      'project_has_tasks_taskId_tasks_fk'
    );

    await queryInterface.dropTable('project_has_tasks');
  }
};
