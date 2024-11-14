const config = require("../../../config/config")

const RabbitMqRepository = async (
  rabbit,
  rabbitHelper,
  exchange = config.rabbitmq.exchange
) => {
  const channel = await rabbit

  const publishQueue = async (key, params, timer) => {
    try {
      channel.assertExchange(exchange, 'x-delayed-message', {
        durable: true,
        arguments: { 'x-delayed-type': 'direct' }
      })

      const publish = channel.publish(
        exchange,
        key,
        Buffer.from(JSON.stringify(params)),
        {
          headers: { 'x-delay': timer }
        }
      )

      if (publish === true)
        console.log(
          `------------------------------------ \n Success create event to ${exchange}, with timer: ${
            timer / 1000
          } s`
        )

      return publish
    } catch (error) {
      console.log(error)
    }
  }

  const subscribeQueue = async (key, cb) => {
    channel.assertExchange(exchange, 'x-delayed-message', {
      durable: true,
      arguments: { 'x-delayed-type': 'direct' }
    })

    const { queue } = await channel.assertQueue(key, { exclusive: false })

    channel.bindQueue(queue, exchange, key)

    channel.consume(key, async (msg) => {
      if (msg !== null) {
        const content = JSON.parse(msg.content.toString())
        cb(content)
        channel.ack(msg)
      }
    })
  }



  return {
    publishQueue,
    subscribeQueue,
  }
}

module.exports = RabbitMqRepository
