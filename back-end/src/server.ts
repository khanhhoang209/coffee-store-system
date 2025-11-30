import dotenv from 'dotenv'
import createApp from '~/app'
import connectDB from '~/configs/database/mongo.config'
import { createLogger } from '~/configs/logger/logger.config'

dotenv.config({ quiet: true })
const logger = createLogger(__filename)
const HOST_PORT = process.env.HOST_PORT || 80
const PORT = process.env.PORT || 8080

const startServer = async () => {
  try {
    await connectDB()

    const app = createApp()

    app.listen(PORT, () => {
      logger.info(`Server is running on container port ${PORT}`)
      logger.info(`Server is running on host port ${HOST_PORT}`)
      logger.info(`Test API (Docker): http://localhost:${HOST_PORT}/api`)
      logger.info(`Test API (Dev): http://localhost:${PORT}/api`)
    })
  } catch (error) {
    logger.error('Failed to start server: ' + (error as Error).message)
    process.exit(1)
  }
}

startServer()
