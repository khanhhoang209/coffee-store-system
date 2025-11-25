import { PaginationRequest } from '../common/pagination-request.type'

export interface CategoryRequest {
  name: string
  description?: string
}

export interface CategoryResponse {
  id: string
  name: string
  description: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface CategoryGetRequest extends PaginationRequest {
  name?: string
}
