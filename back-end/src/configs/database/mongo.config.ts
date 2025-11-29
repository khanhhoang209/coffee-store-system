import mongoose from 'mongoose'
import { createLogger } from '~/configs/logs/logger.config'
import { buildMongoURI } from '~/configs/database/mongo.connection'

const logger = createLogger(__filename)

const connectDB = async () => {
  const mongoURI = buildMongoURI()
  if (!mongoURI) {
    logger.error('MongoURI failed to be created')
    process.exit(1)
  }

  try {
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
      socketTimeoutMS: 45000
    })
    logger.info('MongoDB connected')
  } catch (error) {
    logger.error('MongoDB connection error: ' + (error as Error).message)
    process.exit(1)
  }
}

export default connectDB
