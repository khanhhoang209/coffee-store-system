import path from 'path'
import winston from 'winston'
import 'winston-daily-rotate-file'
import loggerColors from '~/configs/logs/logger.color'

winston.addColors(loggerColors)

const getContextFromFile = (filepath: string) => {
  return path.basename(filepath, path.extname(filepath))
}

const consoleFormat = winston.format.combine(
  winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
  winston.format.colorize({ all: true }),
  winston.format.printf((info) => {
    const context = info.context ? ` [${info.context}]` : ''
    return `[${info.timestamp}] [${info.level}]${context}: ${info.message}`
  })
)

const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
  winston.format.printf((info) => {
    const context = info.context ? ` [${info.context}]` : ''
    return `[${info.timestamp}] [${info.level}]${context}: ${info.message}`
  })
)

const baseLogger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console({
      format: consoleFormat
    }),
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: fileFormat
    }),
    new winston.transports.File({
      filename: 'logs/combined.log',
      format: fileFormat
    }),
    new winston.transports.DailyRotateFile({
      filename: 'logs/%DATE%.log',
      datePattern: 'DD-MM-YYYY',
      maxSize: '20m',
      maxFiles: '14d',
      format: fileFormat
    })
  ]
})

export const createLogger = (filename: string) => {
  const context = getContextFromFile(filename)

  return {
    info: (message: string) => baseLogger.info(message, { context }),
    warn: (message: string) => baseLogger.warn(message, { context }),
    error: (message: string) => baseLogger.error(message, { context })
  }
}

export default baseLogger
