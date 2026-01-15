import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config({ quiet: true })

const emailConfig = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.GOOGLE_MAIL_USER,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_CLIENT_REFRESH_TOKEN
  }
})

export { emailConfig }
