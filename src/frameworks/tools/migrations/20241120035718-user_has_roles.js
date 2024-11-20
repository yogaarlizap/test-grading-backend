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
    await queryInterface.createTable('user_has_roles', {
      id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: "users"
          },
          key: "id"
        }
      },
      roleId: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });

    // await queryInterface.addConstraint('user_has_roles', {
    //   type: 'foreign key',
    //   fields: ['userId'],
    //   references: {
    //     table: 'users',
    //     field: 'id'
    //   },
    //   onUpdate: 'CASCADE',
    //   onDelete: 'CASCADE'
    // });

    await queryInterface.addConstraint('user_has_roles', {
      type: 'foreign key',
      fields: ['roleId'],
      references: {
        table: 'roles',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint(
      'user_has_roles',
      'user_has_roles_userId_users_fk'
    );

    await queryInterface.removeConstraint(
      'user_has_roles',
      'user_has_roles_roleId_roles_fk'
    );

    await queryInterface.dropTable('users');
  }
};
