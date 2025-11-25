import { Router } from 'express'
import {
  handleCreateProduct,
  handleDeleteProduct,
  handleGetProductById,
  handleGetProducts,
  handleUpdateProduct,
} from '../controllers/productController'
import {
  validateBody,
  validateParams,
  validateQuery,
} from '../middlewares/validateMiddleware'
import {
  productGetRequestSchema,
  productRequestSchema,
} from '../validations/product.schema'
import { objectIdSchema } from '../validations/common.schema'

const router = Router()

router.post('/', validateBody(productRequestSchema), handleCreateProduct)
router.put(
  '/:id',
  validateParams(objectIdSchema),
  validateBody(productRequestSchema),
  handleUpdateProduct
)
router.delete('/:id', validateParams(objectIdSchema), handleDeleteProduct)
router.get('/:id', validateParams(objectIdSchema), handleGetProductById)
router.get('/', validateQuery(productGetRequestSchema), handleGetProducts)

export default router
