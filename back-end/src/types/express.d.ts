import { TokenRequest } from '~/types/auth.dto'

declare module 'express-serve-static-core' {
  namespace Express {
    interface Request {
      user?: TokenRequest
    }
  }
}
