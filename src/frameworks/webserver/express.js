const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const expressConfig = (app) => {
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(cors())

  app.use(morgan('dev'))

  // serving static files
  app.use('/storage', express.static('storage'))
}

module.exports = expressConfig
