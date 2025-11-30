import { Request, Response, NextFunction } from 'express'
import { createLogger } from '~/configs/logger/logger.config'
import { verifyToken } from '~/utils/jwt.util'
import ApiError from '~/utils/api-error.util'

const logger = createLogger(__filename)

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      logger.warn('No token provided in Authorization header')
      throw new ApiError(401, 'Vui lòng đăng nhập để tiếp tục!')
    }

    const token = authHeader.split(' ')[1] as string

    const decoded = verifyToken(token)

    if (typeof decoded === 'string') {
      logger.warn('Token is invalid')
      throw new ApiError(401, 'Token không hợp lệ!')
    }

    req.user = {
      userId: decoded.sub as string,
      email: decoded.email as string,
      role: decoded.role as string
    }
    next()
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'TokenExpiredError') {
      logger.warn('Token has expired')
      throw new ApiError(401, 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!')
    }
    logger.error('Invalid token or token has been revoked')
    throw new ApiError(403, 'Token không hợp lệ hoặc đã bị thu hồi!')
  }
}

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      logger.warn('Unauthorized access attempt without authentication')
      throw new ApiError(401, 'Vui lòng đăng nhập để tiếp tục!')
    }

    if (!roles.includes(req.user.role)) {
      logger.warn(
        `${req.user.email} with role ${req.user.role} is trying to access a restricted resource`
      )
      throw new ApiError(403, 'Bạn không có quyền truy cập tài nguyên này!')
    }

    next()
  }
}
