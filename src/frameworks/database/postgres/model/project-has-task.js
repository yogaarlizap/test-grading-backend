const withRelation = require('../../../helpers/relational-model')
const { DataTypes } = require('sequelize')

module.exports = async (sequelize) => {
  const Tasks = sequelize.define(
    'task',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false
      },
      startTime: {
        type: DataTypes.TIME,
        allowNull: false
      },
      endTime: {
        type: DataTypes.TIME,
        allowNull: false
      }
    },
    {
      tableName: 'tasks',
      timestamp: true
    }
  )
  
  withRelation(["*"], 'projects', () => {
    Tasks.belongsTo('projects', {
      through: 'project_has_tasks',
      foreignKey: 'id'
    });
  })

  return Tasks
}
