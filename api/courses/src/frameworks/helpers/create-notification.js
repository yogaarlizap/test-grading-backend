const createNotification = async (repositories, config, params) => {
  const { notifRabbitRepository } = repositories
  const { user_ids, provider, data } = params

  await notifRabbitRepository.publishQueueWoTrust(
    'notif:create',
    {
      user_ids: user_ids,
      provider: provider,
      data: data,
      institute: config.institute,
      app: config.app
    },
    0
  )
}

module.exports = createNotification
