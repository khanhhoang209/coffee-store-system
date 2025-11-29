import jwt, { SignOptions, VerifyOptions, JwtPayload } from 'jsonwebtoken'
import { jwtConfig } from '~/configs/jwt/jwt.config'
import { TokenRequest } from '~/types/auth.dto'

export const generateToken = (input: TokenRequest): string => {
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

export const verifyToken = (token: string): JwtPayload | string => {
  const verifyOptions: VerifyOptions = {
    issuer: jwtConfig.issuer,
    audience: jwtConfig.audience,
    algorithms: [jwtConfig.algorithm]
  }

  return jwt.verify(token, jwtConfig.secret, verifyOptions) as JwtPayload | string
}

export default { generateToken, verifyToken }
