import { Router } from 'express'
import categoryRoute from './categoryRoute'

const router = Router()

router.use('/categories', categoryRoute)

export default router
