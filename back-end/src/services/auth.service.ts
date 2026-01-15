import { BaseServiceResponse, DataServiceResponse } from '~/common/service-response.type'
import { LoginRequest, LoginResponse, RegisterRequest } from '~/types/auth.dto'
import { createLogger } from '~/configs/logger/logger.config'
import { hashPassword, verifyPassword } from '~/utils/password.util'
import { jwtConfig } from '~/configs/jwt/jwt.config'
import { generateEmailJwtToken, generateJwtToken, verifyEmailJwtToken } from '~/utils/jwt.util'
import { sendMail } from '~/services/email.service'
import User from '~/models/user.model'
import Role from '~/models/role.model'
import ApiError from '~/utils/api-error.util'
import dotenv from 'dotenv'
import {
  getVerifyEmailTemplate,
  getVerifyFailHtml,
  getVerifySuccessHtml
} from '~/utils/template.util'

dotenv.config({ quiet: true })

const logger = createLogger(__filename)

const register = async (input: RegisterRequest, roleName: string): Promise<BaseServiceResponse> => {
  // Business logic
  const email = await User.findOne({ email: input.email })
  if (email) {
    logger.warn(`Registration failed: Email ${input.email} already in use`)
    throw new ApiError(400, 'Email đã được sử dụng!')
  }

  const role = await Role.findOne({ name: roleName })
  if (!role) {
    logger.error(`Registration failed: Role ${roleName} not found`)
    throw new ApiError(404, 'Vai trò không tồn tại!')
  }

  const passwordHash = await hashPassword(input.password)

  const user = new User({
    email: input.email,
    passwordHash: passwordHash,
    fullName: input.fullName || '',
    phoneNumber: input.phoneNumber || '',
    role: role._id
  })

  const verifyToken = generateEmailJwtToken(input.email)

  const mailTeamplate = getVerifyEmailTemplate(
    input.fullName || 'User',
    `${process.env.FRONTEND_URL}/api/auth/verify-email?token=${encodeURIComponent(verifyToken)}`
  )

  const mailSent = sendMail({
    to: input.email,
    subject: 'Welcome to Coffee Store System',
    html: mailTeamplate
  })

  if (!mailSent) {
    logger.error(`Failed to send verification email to ${input.email}`)
    throw new ApiError(400, 'Gửi email xác thực thất bại, vui lòng thử lại sau!')
  }

  await user.save()

  // Return success response
  logger.info(`User registered with email: ${user.email}`)
  return {
    success: true,
    message: 'Đăng ký tài khoản thành công. Vui lòng kiểm tra email để xác thực tài khoản!',
    data: user._id.toString()
  } as DataServiceResponse<string>
}

const login = async (input: LoginRequest): Promise<BaseServiceResponse> => {
  // Business logic
  const user = await User.findOne({ email: input.email }).populate('role')
  if (!user) {
    logger.warn(`Login failed: User with email ${input.email} not found`)
    throw new ApiError(400, 'Tài khoản hoặc mật khẩu không đúng!')
  }

  const isPasswordValid = await verifyPassword(user.passwordHash, input.password)
  if (!isPasswordValid) {
    logger.warn(`Login failed: Invalid password for email ${input.email}`)
    throw new ApiError(400, 'Tài khoản hoặc mật khẩu không đúng!')
  }

  if (!user.isEmailVerified) {
    logger.warn(`Login failed: Email not verified for user with email ${input.email}`)
    throw new ApiError(403, 'Vui lòng xác thực email trước khi đăng nhập!')
  }

  if (!user.isActive) {
    logger.warn(`Login failed: User with email ${input.email} is inactive`)
    throw new ApiError(403, 'Tài khoản đã bị vô hiệu hóa!')
  }

  const role = (user.role as any).name as string
  const token = generateJwtToken({
    userId: user._id.toString(),
    email: user.email,
    role: role
  })

  const data: LoginResponse = {
    token: token,
    expiresIn: jwtConfig.expiresIn as string
  }

  // Return success response
  logger.info(`${role} logged in with email: ${user.email}`)
  return {
    success: true,
    message: 'Đăng nhập thành công!',
    data: data
  } as DataServiceResponse<LoginResponse>
}

const verifyEmail = async (token: string): Promise<string> => {
  try {
    const decoded = verifyEmailJwtToken(token)
    if (typeof decoded === 'string' || !decoded.email) {
      const failTemplate = getVerifyFailHtml()
      logger.warn('Email verification failed: Invalid token')
      return failTemplate
    }

    if (decoded.type !== 'verify-mail') {
      const failTemplate = getVerifyFailHtml()
      logger.warn(`Email verification failed: Invalid token type for email ${decoded.email}`)
      return failTemplate
    }

    const user = await User.findOne({ email: decoded.email })

    if (!user) {
      const failTemplate = getVerifyFailHtml()
      logger.warn(`Email verification failed: User with email ${decoded.email} not found`)
      return failTemplate
    }

    user.isEmailVerified = true
    await user.save()

    logger.info(`Email verified for user with email: ${decoded.email}`)
    const successTemplate = getVerifySuccessHtml(decoded.email)
    return successTemplate
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'TokenExpiredError') {
      logger.warn('Token has expired')
      throw new ApiError(401, 'Token xác thực email đã hết hạn!')
    }
    logger.error('Invalid token or token has been revoked')
    throw new ApiError(403, 'Token không hợp lệ hoặc đã bị thu hồi!')
  }
}

const sendVerificationEmail = async (email: string): Promise<BaseServiceResponse> => {
  const user = await User.findOne({ email: email })
  if (!user) {
    logger.warn(`Send verification email failed: User with email ${email} not found`)
    throw new ApiError(404, 'Người dùng không tồn tại!')
  }

  if (user.isEmailVerified) {
    logger.info(`Email already verified for user with email: ${email}`)
    return {
      success: true,
      message: 'Email đã được xác thực!'
    }
  }

  const verifyToken = generateEmailJwtToken(email)

  const mailTeamplate = getVerifyEmailTemplate(
    user.fullName || 'User',
    `${process.env.FRONTEND_URL}/api/auth/verify-email?token=${encodeURIComponent(verifyToken)}`
  )

  const mailSent = sendMail({
    to: email,
    subject: 'Verify your email for Coffee Store System',
    html: mailTeamplate
  })

  if (!mailSent) {
    logger.error(`Send verification email failed: Failed to send email to ${email}`)
    throw new ApiError(400, 'Gửi email xác thực thất bại, vui lòng thử lại sau!')
  }

  logger.info(`Verification email sent to ${email}`)
  return {
    success: true,
    message: 'Email xác thực đã được gửi thành công!'
  }
}

export { register, login, verifyEmail, sendVerificationEmail }
