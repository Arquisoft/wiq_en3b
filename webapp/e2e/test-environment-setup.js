const { MongoMemoryServer } = require('mongodb-memory-server')

async function startServer() {
  console.log('Starting MongoDB memory server...')
  const mongoserver = await MongoMemoryServer.create()
  const mongoUri = mongoserver.getUri()
  process.env.MONGODB_URI = mongoUri
  require('../../users/userservice/src/index.ts')
  require('../../users/authservice/src/index.ts')
  require('../../gatewayservice/src/index.ts')
  require('../../questionservice/src/index.ts')
}

startServer()
