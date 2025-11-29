import dotenv from 'dotenv'
import { Algorithm, SignOptions } from 'jsonwebtoken'

dotenv.config({ quiet: true })

const jwtConfig = {
  secret: process.env.JWT_SECRET as string,
  expiresIn: process.env.JWT_EXPIRES_IN as SignOptions['expiresIn'],
  issuer: process.env.JWT_ISSUER as string,
  audience: process.env.JWT_AUDIENCE as string,
  algorithm: process.env.JWT_ALGORITHM as Algorithm
}

export { jwtConfig }
