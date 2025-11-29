import { BaseServiceResponse, DataServiceResponse } from '~/common/service-response.type'
import { ProductGetRequest, ProductRequest, ProductResponse } from '~/types/product.dto'
import { createLogger } from '~/configs/logs/logger.config'
import Product from '~/models/product.model'
import Category from '~/models/category.model'
import ApiError from '~/utils/api-error.util'
import PAGINATION from '~/constants/paginations.constant'

const logger = createLogger(__filename)

const createProduct = async (input: ProductRequest): Promise<BaseServiceResponse> => {
  // Business Logic
  const category = await Category.findById(input.category)
  if (!category) {
    logger.warn(`Create product failed: Category not found with ID: ${input.category}`)
    throw new ApiError(404, 'Danh mục không tồn tại!')
  }

  const product = new Product({
    name: input.name,
    description: input.description || '',
    price: input.price,
    category: input.category
  })
  await product.save()

  // Return success response
  logger.info(`Product created with ID: ${product._id}`)
  return {
    success: true,
    message: 'Tạo sản phẩm thành công!',
    data: product._id.toString()
  } as DataServiceResponse<string>
}

const updateProduct = async (id: string, input: ProductRequest): Promise<BaseServiceResponse> => {
  // Check if category exists
  const category = await Category.findById(input.category)
  if (!category) {
    logger.warn(`Update product failed: Category not found with ID: ${input.category}`)
    throw new ApiError(404, 'Danh mục không tồn tại!')
  }

  // Business Logic
  const product = await Product.findByIdAndUpdate(
    id,
    {
      name: input.name,
      description: input.description || '',
      price: input.price,
      category: input.category
    },
    { new: true }
  )

  // Check if product exists
  if (!product) {
    logger.warn(`Update product failed: Product not found with ID: ${id}`)
    throw new ApiError(404, 'Sản phẩm không tồn tại!')
  }

  // Return success response
  logger.info(`Product updated with ID: ${product._id}`)
  return {
    success: true,
    message: 'Cập nhật sản phẩm thành công!',
    data: product._id.toString()
  } as DataServiceResponse<string>
}

const deleteProduct = async (id: string): Promise<BaseServiceResponse> => {
  // Business Logic
  const product = await Product.findByIdAndUpdate(
    id,
    {
      isActive: false
    },
    { new: true }
  )

  // Check if product exists
  if (!product) {
    logger.warn(`Delete product failed: Product not found with ID: ${id}`)
    throw new ApiError(404, 'Sản phẩm không tồn tại!')
  }

  // Return success response
  logger.info(`Product deleted with ID: ${product._id}`)
  return {
    success: true,
    message: 'Xóa sản phẩm thành công!'
  }
}

const getProductById = async (id: string): Promise<BaseServiceResponse> => {
  // Business Logic
  const product = await Product.findById(id).populate('category').lean().exec()

  // Check if product exists
  if (!product) {
    logger.warn(`Get product by ID failed: Product not found with ID: ${id}`)
    throw new ApiError(404, 'Sản phẩm không tồn tại!')
  }

  // Tranform data
  const data: ProductResponse = {
    id: product._id.toString(),
    name: product.name,
    description: product.description,
    price: product.price,
    isActive: product.isActive,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
    category: product.category
      ? {
          id: (product.category as any)._id.toString(),
          name: (product.category as any).name,
          description: (product.category as any).description,
          isActive: (product.category as any).isActive,
          createdAt: (product.category as any).createdAt,
          updatedAt: (product.category as any).updatedAt
        }
      : null
  }

  // Return success response`
  logger.info(`Product retrieved with ID: ${product._id}`)
  return {
    success: true,
    message: 'Lấy thông tin sản phẩm thành công!',
    data: data
  } as DataServiceResponse<ProductResponse>
}

const getProducts = async (input: ProductGetRequest): Promise<BaseServiceResponse> => {
  const filter: any = {}
  //Validation filters
  const pageAt = input.pageAt ?? PAGINATION.DEFAULT_PAGE_AT
  const pageSize = input.pageSize ?? PAGINATION.DEFAULT_PAGE_SIZE

  const skip = (pageAt - 1) * pageSize

  if (input.name !== undefined && input.name !== '') {
    filter.name = { $regex: input.name, $options: 'i' }
  }

  if (input.categoryName !== undefined && input.categoryName !== '') {
    const category = await Category.findOne({
      name: { $regex: input.categoryName, $options: 'i' }
    })
    if (category) {
      filter.category = category._id
    }
  }

  if (input.isActive !== undefined) {
    filter.isActive = input.isActive
  }

  if (input.minPrice !== undefined) {
    filter.price = { ...filter.price, $gte: input.minPrice }
  }

  if (input.maxPrice !== undefined) {
    filter.price = { ...filter.price, $lte: input.maxPrice }
  }

  // Business Logic
  const [totalCount, products] = await Promise.all([
    Product.countDocuments(filter),
    Product.find(filter).skip(skip).limit(pageSize).sort({ createdAt: -1 }).lean().exec()
  ])

  const totalPage = Math.ceil(totalCount / pageSize)
  const totalCurrentCount = products.length
  const hasPreviousPage = pageAt > 1
  const hasNextPage = pageAt < totalPage

  //Transform data
  const data: ProductResponse[] = products.map((product) => ({
    id: product._id.toString(),
    name: product.name,
    description: product.description,
    price: product.price,
    isActive: product.isActive,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt
  }))

  // Return success response
  logger.info(`Products retrieved with total count: : ${products.length}`)
  return {
    success: true,
    message: 'Lấy danh sách sản phẩm thành công!',
    pageAt,
    pageSize,
    totalPage,
    totalCount,
    totalCurrentCount,
    hasPreviousPage,
    hasNextPage,
    data
  } as DataServiceResponse<ProductResponse[]>
}

export { createProduct, updateProduct, deleteProduct, getProductById, getProducts }
