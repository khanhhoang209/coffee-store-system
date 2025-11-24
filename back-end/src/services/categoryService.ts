import {
  BaseServiceResponse,
  DataServiceResponse,
  PaginationServiceResponse,
} from '../common/serviceResponse'
import {
  CategoryGetRequest,
  CategoryRequest,
  CategoryResponse,
} from '../types/category.dto'
import { createLogger } from '../config/logger/logger'
import Category from '../models/category'
import ApiError from '../utils/ApiError'
import PAGINATION from '../constants/paginations'

const createCategory = async (
  input: CategoryRequest
): Promise<BaseServiceResponse> => {
  const logger = createLogger(__filename)
  // Validation
  if (!input.name) {
    logger.warn('Validation failed: Name is required')
    throw new ApiError(400, 'Vui lòng nhập tên!')
  }

  // Business Logic
  const category = new Category({
    name: input.name,
    description: input.description || '',
  })
  await category.save()

  // Return success response
  logger.info(`Category created with ID: ${category._id}`)
  return {
    success: true,
    message: 'Tạo danh mục thành công!',
    data: category._id,
  } as DataServiceResponse<any>
}

const updateCategory = async (
  id: string,
  input: CategoryRequest
): Promise<BaseServiceResponse> => {
  const logger = createLogger(__filename)
  // Validation
  if (!input.name) {
    logger.warn('Validation failed: Name is required')
    throw new ApiError(400, 'Vui lòng nhập tên!')
  }

  // Business Logic
  const category = await Category.findByIdAndUpdate(
    id,
    {
      name: input.name,
      description: input.description || '',
    },
    { new: true }
  )

  // Check if category exists
  if (!category) {
    logger.warn(`Failed to retrieve category with ID: ${id}`)
    throw new ApiError(404, 'Danh mục không tồn tại!')
  }

  // Return success response
  logger.info(`Category updated with ID: ${category._id}`)
  return {
    success: true,
    message: 'Cập nhật danh mục thành công!',
    data: category._id,
  } as DataServiceResponse<any>
}

const deleteCategory = async (id: string): Promise<BaseServiceResponse> => {
  const logger = createLogger(__filename)
  // Business Logic
  const category = await Category.findByIdAndUpdate(
    id,
    {
      isActive: false,
    },
    { new: true }
  )

  // Check if category exists
  if (!category) {
    logger.warn(`Failed to retrieve category with ID: ${id}`)
    throw new ApiError(404, 'Danh mục không tồn tại!')
  }

  // Return success response
  logger.info(`Category deleted with ID: ${category._id}`)
  return {
    success: true,
    message: 'Xóa danh mục thành công!',
  }
}

const getCategoryById = async (id: string): Promise<BaseServiceResponse> => {
  const logger = createLogger(__filename)
  // Business Logic
  const category = await Category.findById(id)

  // Check if category exists
  if (!category) {
    logger.warn(`Failed to retrieve category with ID: ${id}`)
    throw new ApiError(404, 'Danh mục không tồn tại!')
  }

  //Transform data
  const data: CategoryResponse = {
    id: category._id.toString(),
    name: category.name,
    description: category.description,
    isActive: category.isActive,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt,
  }

  // Return success response
  logger.info(`Category retrieved with ID: ${category._id}`)
  return {
    success: true,
    message: 'Lấy danh mục thành công!',
    data,
  } as DataServiceResponse<CategoryResponse>
}

const getCategories = async (
  input: CategoryGetRequest
): Promise<BaseServiceResponse> => {
  const logger = createLogger(__filename)
  const filter: any = {}
  //Validation filters
  let pageAt = Number(input.pageAt) || PAGINATION.DEFAULT_PAGE_AT

  let pageSize = Number(input.pageSize) || PAGINATION.DEFAULT_PAGE_SIZE

  const skip = (pageAt - 1) * pageSize

  if (input.name !== undefined) {
    filter.name = { $regex: input.name.trim(), $options: 'i' }
  }

  if (input.isActive !== undefined) {
    filter.isActive = input.isActive
  }

  // Business Logic
  const [totalCount, categories] = await Promise.all([
    Category.countDocuments(filter),
    Category.find(filter).skip(skip).limit(pageSize).sort({ createdAt: -1 }),
  ])

  const totalPage = Math.ceil(totalCount / pageSize)
  const totalCurrentCount = categories.length
  const hasPreviousPage = pageAt > 1
  const hasNextPage = pageAt < totalPage

  //Transform data
  const data: CategoryResponse[] = categories.map((category) => ({
    id: category._id.toString(),
    name: category.name,
    description: category.description,
    isActive: category.isActive,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt,
  }))

  // Return success response
  logger.info('Categories retrieved with total count: ' + totalCount)
  return {
    success: true,
    message: 'Lấy danh sách danh mục thành công!',
    pageAt,
    pageSize,
    totalPage,
    totalCount,
    totalCurrentCount,
    hasPreviousPage,
    hasNextPage,
    data,
  } as PaginationServiceResponse<CategoryResponse>
}

export {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryById,
  getCategories,
}
