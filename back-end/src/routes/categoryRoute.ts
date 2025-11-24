import { Router } from 'express'
import {
  handleCreateCategory,
  handleDeleteCategory,
  handleGetCategories,
  handleGetCategoryById,
  handleUpdateCategory,
} from '../controllers/categoriesController'

const router = Router()

router.post('/', handleCreateCategory)
router.put('/:id', handleUpdateCategory)
router.delete('/:id', handleDeleteCategory)
router.get('/:id', handleGetCategoryById)
router.get('/', handleGetCategories)

export default router
