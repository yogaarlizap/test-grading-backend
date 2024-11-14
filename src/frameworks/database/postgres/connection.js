const { Sequelize } = require('sequelize')

const postgresConnection = (config) => {
  var log = {}
  if (config.nodeEnv == 'production') {
    log = { logging: false }
  }

  // Database Configuration...
  const sequelize = new Sequelize({
    ...{
      host: config.database.host,
      port: config.database.port,
      username: config.database.username,
      password: config.database.password,
      database: config.database.dbname,
      dialect: config.database.dialect
    },
    ...log
  })

  sequelize
    .authenticate()
    .then(() => {
      console.log('database connected')
    })
    .catch((err) => {
      console.log(err)
    })

  return sequelize
}

module.exports = postgresConnection
