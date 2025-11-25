import { createLogger } from '../logs/logger.config'

export const buildMongoURI = (): string => {
  const logger = createLogger(__filename)

  // Retrieve necessary environment variables
  const username = process.env.MONGO_INITDB_ROOT_USERNAME
  const password = process.env.MONGO_INITDB_ROOT_PASSWORD
  const database = process.env.MONGO_INITDB_DATABASE
  const port = process.env.MONGO_PORT
  const host = process.env.MONGO_HOST

  if (!username) {
    logger.error(
      'MONGO_INITDB_ROOT_USERNAME is not defined in environment variables'
    )
    process.exit(1)
  }

  if (!password) {
    logger.error(
      'MONGO_INITDB_ROOT_PASSWORD is not defined in environment variables'
    )
    process.exit(1)
  }

  if (!database) {
    logger.error(
      'MONGO_INITDB_DATABASE is not defined in environment variables'
    )
    process.exit(1)
  }

  if (!port) {
    logger.error('MONGO_PORT is not defined in environment variables')
    process.exit(1)
  }

  if (!host) {
    logger.error('MONGO_HOST is not defined in environment variables')
    process.exit(1)
  }

  const encodedUser = encodeURIComponent(username)
  const encodedPass = encodeURIComponent(password)

  logger.info('MongoURI created')
  logger.info(`MongoDB host: ${host}`)
  return `mongodb://${encodedUser}:${encodedPass}@${host}:${port}/${database}?authSource=admin`
}
