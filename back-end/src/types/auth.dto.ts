export interface RegisterRequest {
  email: string
  password: string
  fullName?: string
  phoneNumber?: string
}

export interface TokenRequest {
  userId: string
  email: string
  role: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  expiresIn: string
}
