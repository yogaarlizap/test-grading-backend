
require('dotenv').config()
const config = require('./config/config')
const express = require('express')
const routes = require('./frameworks/webserver/routes/routes')
const server = require('./frameworks/webserver/server')
const postgresConnection = require('./frameworks/database/postgres/connection')
const expressConfig = require('./frameworks/webserver/express')
const rabbitmqConnection = require('./frameworks/webserver/rabbitmq')
const RabbitMqRepository = require('./frameworks/rabbitmq/repositories/rabbitmq-repository')

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


  //REPOSITORY

  //USE CASE


  //EVENT
  const events = require('./adapters/event/index')

  //CONTROLLER

  /*===================================================DEFINE========================================================== */
  //MODELS
  const models = {

  }

  //REPOSITORIES
  const repositories = {
    rabbitMqRepo: await RabbitMqRepository(mqConnection),
    redisRepository: redisRepository(await redis)
  }

  //USE CASES
  const useCases = {

  }

  //EVENTS
  await events(repositories, useCases)

  //CONTROLLERS
  const controllers = {

  }

  // DEFINE ROUTES
  routes(app, controllers)

  // RUN SERVER
  server(app)
})()
