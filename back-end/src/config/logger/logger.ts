import path from 'path'
import winston from 'winston'
import loggerColors from './logger.colors'

winston.addColors(loggerColors)

const getContextFromFile = (filepath: string) => {
  return path.basename(filepath, path.extname(filepath))
}

const baseLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
    winston.format.colorize({ all: true }),
    winston.format.printf((info) => {
      const context = info.context ? ` [${info.context}]` : ''
      return `[${info.timestamp}] ${info.level}${context}: ${info.message}`
    })
  ),
  transports: [new winston.transports.Console()],
})

export const createLogger = (filename: string) => {
  const context = getContextFromFile(filename)

  return {
    info: (msg: string) => baseLogger.info(msg, { context }),
    warn: (msg: string) => baseLogger.warn(msg, { context }),
    error: (msg: string) => baseLogger.error(msg, { context }),
  }
}

export default baseLogger
