import { Router } from 'express'
import {
  handleCreateProduct,
  handleDeleteProduct,
  handleGetProductById,
  handleGetProducts,
  handleUpdateProduct,
} from '../controllers/product.controller'
import {
  validateBody,
  validateParams,
  validateQuery,
} from '../middlewares/validate.middleware'
import {
  productGetRequestSchema,
  productRequestSchema,
} from '../schemas/product.schema'
import { objectIdSchema } from '../schemas/common.schema'

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
