
require('dotenv').config()
const config = require('./config/config')
const express = require('express')
const routes = require('./frameworks/webserver/routes/routes')
const server = require('./frameworks/webserver/server')
const postgresConnection = require('./frameworks/database/postgres/connection')
const expressConfig = require('./frameworks/webserver/express')
const rabbitmqConnection = require('./frameworks/webserver/rabbitmq')
const RabbitMqRepository = require('./frameworks/rabbitmq/repositories/rabbitmq-repository')
const redisRepository = require("./frameworks/database/redis/repositories/redis-repository");

;(async () => {

  let redis = require('./frameworks/webserver/redis')
  
  // DEFINE EXPRESS
  const app = express()

  expressConfig(app)

  //REDIS
  redisConnection = await redis.startServer()

  //RABBIT
  const mqConnection = rabbitmqConnection(config)

  // RUN SEQUELIZE
  const sequelize = postgresConnection(config)
  
  
  // HELPERS
  /*===================================================IMPORT========================================================== */
  //MODEL
  const projectsModel = require("./frameworks/database/postgres/model/projects");
  const tasksModel = require("./frameworks/database/postgres/model/tasks");
  const usersModel = require("./frameworks/database/postgres/model/users");
  const rolesModel = require("./frameworks/database/postgres/model/roles");
  const projectHasTask = require("./frameworks/database/postgres/model/project-has-task");

  //REPOSITORY
  const projectRepository = require("./frameworks/database/postgres/repositories/project-repository");
  //USE CASE


  //EVENT
  // const events = require('./adapters/event/index')

  //CONTROLLER

  /*===================================================DEFINE========================================================== */
  //MODELS
  const models = {
    projects: await projectsModel(sequelize),
    tasks: await tasksModel(sequelize),
    projectHasTask: await projectHasTask(sequelize)
    // users: await usersModel(sequelize),
    // roles: await rolesModel(sequelize)
  }

  //REPOSITORIES
  const repositories = {
    rabbitMqRepo: await RabbitMqRepository(mqConnection),
    redisRepository: await redisRepository(redis),
    projectRepository: await projectRepository(models)
  }

  //USE CASES
  const useCases = {

  }

  //EVENTS
  // await events(repositories, useCases)

  //CONTROLLERS
  const controllers = {

  }

  // DEFINE ROUTES
  routes(app, controllers)

  // RUN SERVER
  server(app)
})()
