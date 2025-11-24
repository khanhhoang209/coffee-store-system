import mongoose from 'mongoose'
import { createLogger } from './logger/logger'

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI as string
  const logger = createLogger('MongoDB')

  if (!mongoURI) {
    logger.error('MONGO_URI is not defined in environment variables')
    process.exit(1)
  }

  try {
    await mongoose.connect(mongoURI)
    logger.info('MongoDB connected')
  } catch (error) {
    logger.error('MongoDB connection error: ' + (error as Error).message)
    process.exit(1)
  }
}

export default connectDB
