export interface EmailPayload {
  to: string
  subject: string
  cc?: string
  bcc?: string
  text?: string
  html?: string
}

export interface VerifyEmailPayload {
  email: string
  type: 'verifyEmail'
}
