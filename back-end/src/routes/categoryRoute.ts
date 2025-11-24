import { Router } from 'express'
import {
  handleCreateCategory,
  handleDeleteCategory,
  handleGetCategories,
  handleGetCategoryById,
  handleUpdateCategory,
} from '../controllers/categoryController'
import {
  validateBody,
  validateParams,
  validateQuery,
} from '../middlewares/validateMiddleware'
import {
  categoryGetRequestSchema,
  categoryRequestSchema,
} from '../validations/category.schema'
import { objectIdSchema } from '../validations/common.schema'

const router = Router()

router.post('/', validateBody(categoryRequestSchema), handleCreateCategory)
router.put(
  '/:id',
  validateParams(objectIdSchema),
  validateBody(categoryRequestSchema),
  handleUpdateCategory
)
router.delete('/:id', validateParams(objectIdSchema), handleDeleteCategory)
router.get('/:id', validateParams(objectIdSchema), handleGetCategoryById)
router.get('/', validateQuery(categoryGetRequestSchema), handleGetCategories)

export default router
