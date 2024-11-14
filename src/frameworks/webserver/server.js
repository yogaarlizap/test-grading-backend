const config = require('../../config/config')
const { port } = config

const server = (app) => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
}

module.exports = server
