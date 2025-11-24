import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from '../services/categoryService'

const handleCreateCategory = async (req: any, res: any) => {
  const serviceResponse = await createCategory(req.body)
  return res.status(201).json(serviceResponse)
}

const handleUpdateCategory = async (req: any, res: any) => {
  const serviceResponse = await updateCategory(req.params.id, req.body)
  return res.status(200).json(serviceResponse)
}

const handleDeleteCategory = async (req: any, res: any) => {
  await deleteCategory(req.params.id)
  return res.sendStatus(204)
}

const handleGetCategoryById = async (req: any, res: any) => {
  const serviceResponse = await getCategoryById(req.params.id)
  return res.status(200).json(serviceResponse)
}

const handleGetCategories = async (req: any, res: any) => {
  const serviceResponse = await getCategories(req.query)
  return res.status(200).json(serviceResponse)
}

export {
  handleCreateCategory,
  handleUpdateCategory,
  handleDeleteCategory,
  handleGetCategoryById,
  handleGetCategories,
}
