import { Router } from 'express'
import { handleLogin, handleRegister } from '../controllers/auth.controller'
import { validateBody } from '../middlewares/validate.middleware'
import {
  loginRequestSchema,
  registerRequestSchema,
} from '../schemas/auth.schema'

const router = Router()

router.post('/register', validateBody(registerRequestSchema), handleRegister)
router.post('/login', validateBody(loginRequestSchema), handleLogin)

export default router
