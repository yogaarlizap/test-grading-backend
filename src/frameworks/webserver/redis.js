const { createClient } = require('redis')
const config = require('../../config/config')

const startServer = async () => {
  const REDIS_PORT = config.redis.port
  const REDIS_HOST = config.redis.host
  const redisClient = createClient({
    legacyMode: true,
    socket: {
      port: REDIS_PORT,
      host: REDIS_HOST
    }
  })

  redisClient.on('error', function (error) {
    console.error(error)
  })

  await redisClient.connect().catch(console.error)
  console.log("connected to redis");
  return redisClient
}

module.exports = { startServer }
