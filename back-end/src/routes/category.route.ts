import { Router } from 'express'
import {
  handleCreateCategory,
  handleDeleteCategory,
  handleGetCategories,
  handleGetCategoryById,
  handleUpdateCategory,
} from '../controllers/category.controller'
import {
  validateBody,
  validateParams,
  validateQuery,
} from '../middlewares/validate.middleware'
import {
  categoryGetRequestSchema,
  categoryRequestSchema,
} from '../schemas/category.schema'
import { objectIdSchema } from '../schemas/common.schema'
import { authenticate, authorize } from '../middlewares/auth.middleware'
import ROLE_NAME from '../constants/roles.constant'

const router = Router()

// Public routes
router.get('/:id', validateParams(objectIdSchema), handleGetCategoryById)
router.get('/', validateQuery(categoryGetRequestSchema), handleGetCategories)

// Protected routes
router.post(
  '/',
  authenticate,
  authorize([ROLE_NAME.ADMIN]),
  validateBody(categoryRequestSchema),
  handleCreateCategory
)
router.put(
  '/:id',
  authenticate,
  authorize([ROLE_NAME.ADMIN]),
  validateParams(objectIdSchema),
  validateBody(categoryRequestSchema),
  handleUpdateCategory
)
router.delete(
  '/:id',
  authenticate,
  authorize([ROLE_NAME.ADMIN]),
  validateParams(objectIdSchema),
  handleDeleteCategory
)

export default router
