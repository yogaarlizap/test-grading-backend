const withRelation = require('../../../helpers/relational-model')
const { DataTypes, Model } = require('sequelize')

module.exports = async (sequelize) => { 
  const Projects = sequelize.define(
    'project',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      tableName: 'projects',
      timestamp: true
    }
  )

  console.log(Projects);
  
  withRelation(["tasks"], "tasks", () => {
      Projects.hasMany('tasks', {
        through: 'project_has_tasks',
        foreignKey: 'projectId'
      })
  })

  return Projects
}
