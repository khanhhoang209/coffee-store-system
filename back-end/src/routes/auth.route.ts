import { Router } from 'express'
import {
  handleLogin,
  handleRegister,
  handleVerifyEmail,
  handleSendVerificationEmail
} from '~/controllers/auth.controller'
import { validateBody } from '~/middlewares/validate.middleware'
import { loginRequestSchema, registerRequestSchema } from '~/schemas/auth.schema'

const router = Router()

router.post('/register', validateBody(registerRequestSchema), handleRegister)
router.post('/login', validateBody(loginRequestSchema), handleLogin)
router.get('/verify-email', handleVerifyEmail)
router.post('/send-verification-email', handleSendVerificationEmail)

export default router
