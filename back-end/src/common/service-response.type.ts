export interface BaseServiceResponse {
  success: boolean
  message: string
}

export interface DataServiceResponse<T> extends BaseServiceResponse {
  data: T | null
}

export interface PaginationServiceResponse<T> extends BaseServiceResponse {
  pageAt: number
  pageSize: number
  totalPage: number
  totalCount: number
  totalCurrentCount: number
  hasPreviousPage: boolean
  hasNextPage: boolean
  data: T[]
}
