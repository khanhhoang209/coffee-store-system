import dotenv from 'dotenv'
import { SignOptions } from 'jsonwebtoken'

dotenv.config({ quiet: true })

const jwtEmailConfig = {
  secret: process.env.JWT_VERIFY_EMAIL_SECRET as string,
  expiresIn: process.env.JWT_VERIFY_EMAIL_EXPIRES_IN as SignOptions['expiresIn']
}

export { jwtEmailConfig }
