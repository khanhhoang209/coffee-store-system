import { Router } from 'express'
import categoryRoute from '~/routes/category.route'
import productRoute from '~/routes/product.route'
import authRoute from '~/routes/auth.route'

const router = Router()

router.use('/categories', categoryRoute)
router.use('/products', productRoute)
router.use('/auth', authRoute)

export default router
