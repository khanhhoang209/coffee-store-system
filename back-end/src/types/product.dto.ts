import { PaginationRequest } from '../common/pagination-request.type'
import { CategoryResponse } from './category.dto'

export interface ProductRequest {
  name: string
  description?: string
  price: number
  category: string
}

export interface ProductResponse {
  id: string
  name: string
  description: string
  price: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  category?: CategoryResponse | null
}

export interface ProductGetRequest extends PaginationRequest {
  name?: string
  minPrice?: number
  maxPrice?: number
  categoryName?: string
}
