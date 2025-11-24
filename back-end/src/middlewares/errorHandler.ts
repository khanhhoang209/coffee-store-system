import { Request, Response, NextFunction } from 'express'
import { BaseServiceResponse } from '../common/serviceResponse'
import ApiError from '../utils/ApiError'
import { createLogger } from '../config/logger/logger'

const logger = createLogger(__filename)

const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500
  let message = 'Lỗi không xác định từ hệ thống!'

  if (err instanceof ApiError) {
    statusCode = err.statusCode
    message = err.message
  }

  if (statusCode === 500) {
    logger.error(
      `Internal Server Error:
      Method: ${req.method}
      URL: ${req.originalUrl}
      Stack: ${err.stack}`
    )
  }

  const response: BaseServiceResponse = {
    success: false,
    message,
  }

  res.status(statusCode).json(response)
}

export default errorHandler
