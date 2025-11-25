import { Router } from 'express'
import categoryRoute from './categoryRoute'
import productRoute from './productRoute'

const router = Router()

router.use('/categories', categoryRoute)
router.use('/products', productRoute)

export default router
