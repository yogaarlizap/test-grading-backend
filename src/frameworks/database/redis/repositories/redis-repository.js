module.exports = (client) => {
  /**
   * Get Data From Redis
   * @param key
   * @returns {Promise<unknown>}
   */
  const getData = (key) => {
    return new Promise((resolve) => {
      client.get(key, (err, data) => {
        if (err) console.log(err)
        resolve(JSON.parse(data))
      })
    })
  }
  /**
   * Get Data From Redis
   * @param key
   * @returns {Promise<unknown>}
   */
  const getManyData = (keys) => {
    return new Promise((resolve) => {
      client.mGet(keys, (err, data) => {
        if (err) console.log(err)
        const cb = data.map((res) => {
          return JSON.parse(res)
        })
        resolve(cb)
      })
    })
  }

  /**
   * Get Data From Redis
   * @param regex
   * @returns {Promise<array>}
   */
  const getKeysByRegex = (regex) => {
    return new Promise((resolve) => {
      client.keys(regex, (err, data) => {
        if (err) console.log(err)
        resolve(data)
      })
    })
  }

  /**
   * Save Data To Redis
   * @param key
   * @param value
   * @returns {Promise<void>}
   */
  const setData = async (key, value) => {
    console.log(`Success save data to redis: ${key}`)
    await client.set(key, JSON.stringify(value))
  }

  /**
   * Delete Redis Data From Key
   * @param key
   * @returns {Promise<void>}
   */
  const destroyData = async (key) => {
    console.log(`Success delete data from redis: ${key}`)
    await client.del(key)
  }

  return { getData, getManyData, getKeysByRegex, setData, destroyData }
}
