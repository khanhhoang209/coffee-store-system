import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import apiRoutes from './routes'
import errorHandler from './middlewares/errorHandler'

dotenv.config()

const createApp = () => {
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
    res.json({ sucess: true, message: 'API is running' })
  })

  // Routes
  app.use('/api', apiRoutes)

  // Error handler
  app.use(errorHandler)

  return app
}

export default createApp
