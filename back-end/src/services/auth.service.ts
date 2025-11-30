import { BaseServiceResponse, DataServiceResponse } from '~/common/service-response.type'
import { LoginRequest, LoginResponse, RegisterRequest, TokenRequest } from '~/types/auth.dto'
import { createLogger } from '~/configs/logger/logger.config'
import { hashPassword, verifyPassword } from '~/utils/password.util'
import { jwtConfig } from '~/configs/jwt/jwt.config'
import { generateToken } from '~/utils/jwt.util'
import User from '~/models/user.model'
import Role from '~/models/role.model'
import ApiError from '~/utils/api-error.util'

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

  await user.save()

  // Return success response
  logger.info(`User registered with email: ${user.email}`)
  return {
    success: true,
    message: 'Đăng ký tài khoản thành công!',
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

  if (!user.isActive) {
    logger.warn(`Login failed: User with email ${input.email} is inactive`)
    throw new ApiError(403, 'Tài khoản đã bị vô hiệu hóa!')
  }

  const role = (user.role as any).name as string
  const tokenRequest: TokenRequest = {
    userId: user._id.toString(),
    email: user.email,
    role: role
  }
  const token = generateToken(tokenRequest)

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

export { register, login }
