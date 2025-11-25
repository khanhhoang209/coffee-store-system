import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import apiRoutes from './routes'
import errorHandlerMiddleware from './middlewares/error-handler.middleware'
import { createLogger } from './configs/logs/logger.config'

dotenv.config()

const createApp = () => {
  const logger = createLogger(__filename)
  const app = express()
  const allowedOrigins = [
    process.env.FRONTEND_URL,
    'http://localhost:5173',
  ].filter(Boolean) as string[]

  app.use(
    cors({
      origin: allowedOrigins,
      credentials: true,
    })
  )
  app.use(express.json())

  // Health check
  app.get('/api', (req, res) => {
    logger.info('API is running')
    res.json({ success: true, message: 'API is running' })
  })

  // Routes
  app.use('/api', apiRoutes)

  // Error handler
  app.use(errorHandlerMiddleware)

  return app
}

export default createApp
