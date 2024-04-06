const { MongoMemoryServer } = require('mongodb-memory-server')

let mongoserver
let userservice
let authservice
let gatewayservice

async function startServer() {
  console.log('Starting MongoDB memory server...')
  mongoserver = await MongoMemoryServer.create()
  const mongoUri = mongoserver.getUri()
  process.env.MONGODB_URI = mongoUri
  userservice = await require('../../users/userservice/src/index.ts')
  authservice = await require('../../users/authservice/src/index.ts')
  gatewayservice = await require('../../gatewayservice/src/index.ts')
}

startServer()
