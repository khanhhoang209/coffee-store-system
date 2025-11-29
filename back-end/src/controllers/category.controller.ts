import { Request, Response } from 'express'
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory
} from '~/services/category.service'

const handleCreateCategory = async (req: Request, res: Response) => {
  const serviceResponse = await createCategory(req.body)
  return res.status(201).json(serviceResponse)
}

const handleUpdateCategory = async (req: Request, res: Response) => {
  const serviceResponse = await updateCategory(req.params.id as string, req.body)
  return res.status(200).json(serviceResponse)
}

const handleDeleteCategory = async (req: Request, res: Response) => {
  await deleteCategory(req.params.id as string)
  return res.sendStatus(204)
}

const handleGetCategoryById = async (req: Request, res: Response) => {
  const serviceResponse = await getCategoryById(req.params.id as string)
  return res.status(200).json(serviceResponse)
}

const handleGetCategories = async (req: Request, res: Response) => {
  const serviceResponse = await getCategories(res.locals.query)
  return res.status(200).json(serviceResponse)
}

export {
  handleCreateCategory,
  handleUpdateCategory,
  handleDeleteCategory,
  handleGetCategoryById,
  handleGetCategories
}
