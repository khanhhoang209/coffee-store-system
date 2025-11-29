import { Request, Response, NextFunction } from 'express'
import { createLogger } from '../configs/logs/logger.config'
import { BaseServiceResponse } from '../common/service-response.type'
import ApiError from '../utils/api-error.util'

const logger = createLogger(__filename)

const errorHandlerMiddleware = (
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

export default errorHandlerMiddleware
