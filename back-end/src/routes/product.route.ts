import { Router } from 'express'
import {
  handleCreateProduct,
  handleDeleteProduct,
  handleGetProductById,
  handleGetProducts,
  handleUpdateProduct
} from '~/controllers/product.controller'
import { validateBody, validateParams, validateQuery } from '~/middlewares/validate.middleware'
import { productGetRequestSchema, productRequestSchema } from '~/schemas/product.schema'
import { objectIdSchema } from '~/schemas/common.schema'
import { authenticate, authorize } from '~/middlewares/auth.middleware'
import ROLE_NAME from '~/constants/roles.constant'

const router = Router()

// Public routes
router.get('/:id', validateParams(objectIdSchema), handleGetProductById)
router.get('/', validateQuery(productGetRequestSchema), handleGetProducts)

// Protected routes
router.post(
  '/',
  authenticate,
  authorize([ROLE_NAME.ADMIN]),
  validateBody(productRequestSchema),
  handleCreateProduct
)
router.put(
  '/:id',
  authenticate,
  authorize([ROLE_NAME.ADMIN]),
  validateParams(objectIdSchema),
  validateBody(productRequestSchema),
  handleUpdateProduct
)
router.delete(
  '/:id',
  authenticate,
  authorize([ROLE_NAME.ADMIN]),
  validateParams(objectIdSchema),
  handleDeleteProduct
)

export default router
