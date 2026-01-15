import jwt, { SignOptions, VerifyOptions, JwtPayload } from 'jsonwebtoken'
import { jwtEmailConfig } from '~/configs/jwt/jwt-email.config'
import { jwtConfig } from '~/configs/jwt/jwt.config'
import { TokenRequest } from '~/types/auth.dto'

export const generateJwtToken = (input: TokenRequest): string => {
  const payload = {
    sub: input.userId,
    email: input.email,
    role: input.role
  }

  const signOptions: SignOptions = {
    expiresIn: jwtConfig.expiresIn,
    issuer: jwtConfig.issuer,
    audience: jwtConfig.audience,
    algorithm: jwtConfig.algorithm
  }

  return jwt.sign(payload, jwtConfig.secret, signOptions)
}

export const verifyJwtToken = (token: string): JwtPayload | string => {
  const verifyOptions: VerifyOptions = {
    issuer: jwtConfig.issuer,
    audience: jwtConfig.audience,
    algorithms: [jwtConfig.algorithm]
  }

  return jwt.verify(token, jwtConfig.secret, verifyOptions) as JwtPayload | string
}

export const generateEmailJwtToken = (email: string) => {
  const payload = {
    email,
    type: 'verify-mail'
  }

  return jwt.sign(payload, jwtEmailConfig.secret, {
    expiresIn: jwtEmailConfig.expiresIn
  })
}

export const verifyEmailJwtToken = (token: string): JwtPayload | string => {
  return jwt.verify(token, jwtEmailConfig.secret) as JwtPayload | string
}

export default { generateJwtToken, verifyJwtToken }
