import { TokenRequest } from './auth.dto'

declare module 'express-serve-static-core' {
  namespace Express {
    interface Request {
      user?: TokenRequest
    }
  }
}
