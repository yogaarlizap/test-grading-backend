require('dotenv').config()

const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  appUrl: process.env.APP_URL || 'http://localhost:3000',
  database: {
    host: process.env.DB_HOST || '127.0.0.1',
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    dbname: process.env.DB_NAME || '',
    port: process.env.DB_PORT || 3306,
    dialect: process.env.DB_DIALECT || 'mysql'
  },
  redis: {
    uri: process.env.REDIS_URL || 'redis://localhost:6379',
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || '6379'
  },
  rabbitmq: {
    host: process.env.RABBITMQ_HOST || 'amqp://localhost',
    exchange: process.env.RABBITMQ_EXCHANGE || 'queue',
    notification_exchange: process.env.NOTIFICATION_EXCHANGE || 'queue',
    alumnus_exchange: process.env.ALUMNUS_EXCHANGE || 'queue',
    assessment_exchange: process.env.ASSESSMENT_EXCHANGE || 'queue'
  },
}

module.exports = config
