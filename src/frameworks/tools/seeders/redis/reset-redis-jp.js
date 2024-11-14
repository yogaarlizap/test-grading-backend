let redis = require('../../../webserver/redis')
const redisRepo = require('../../../database/redis/repositories/redis-repository')

;(async () => {
  const redisServer = await redis.startServer()
  const redisRepository = redisRepo(await redisServer)

  const keys = await redisRepository.getKeysByRegex('tekfunghan_jp:*')
  for (const key of keys) {
    await redisRepository.destroyData(key)
  }

  setTimeout(() => {
    process.exit()
  }, 2000)
})()
