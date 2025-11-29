import { Router } from 'express'
import categoryRoute from './category.route'
import productRoute from './product.route'
import authRoute from './auth.route'

const router = Router()

router.use('/categories', categoryRoute)
router.use('/products', productRoute)
router.use('/auth', authRoute)

export default router
