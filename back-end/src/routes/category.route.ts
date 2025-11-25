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
