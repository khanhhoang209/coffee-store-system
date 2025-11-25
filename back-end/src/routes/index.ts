import { Router } from 'express'
import categoryRoute from './category.route'
import productRoute from './product.route'

const router = Router()

router.use('/categories', categoryRoute)
router.use('/products', productRoute)

export default router
