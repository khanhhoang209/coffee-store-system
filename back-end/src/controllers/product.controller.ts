import { Request, Response } from 'express'
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from '../services/product.service'

const handleCreateProduct = async (req: Request, res: Response) => {
  const serviceResponse = await createProduct(req.body)
  return res.status(201).json(serviceResponse)
}

const handleUpdateProduct = async (req: Request, res: Response) => {
  const serviceResponse = await updateProduct(req.params.id as string, req.body)
  return res.status(200).json(serviceResponse)
}

const handleDeleteProduct = async (req: Request, res: Response) => {
  await deleteProduct(req.params.id as string)
  return res.sendStatus(204)
}

const handleGetProductById = async (req: Request, res: Response) => {
  const serviceResponse = await getProductById(req.params.id as string)
  return res.status(200).json(serviceResponse)
}

const handleGetProducts = async (req: Request, res: Response) => {
  const serviceResponse = await getProducts(res.locals.query)
  return res.status(200).json(serviceResponse)
}

export {
  handleCreateProduct,
  handleUpdateProduct,
  handleDeleteProduct,
  handleGetProductById,
  handleGetProducts,
}
