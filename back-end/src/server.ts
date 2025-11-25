import dotenv from 'dotenv'
import createApp from './app'
import connectDB from './config/db'
import { createLogger } from './config/logs/logger'

dotenv.config()
const PORT = process.env.PORT || 8080
const HOST_PORT = process.env.HOST_PORT || 80

const startServer = async () => {
  const logger = createLogger('Server')
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
