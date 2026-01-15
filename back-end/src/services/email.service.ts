import dotenv from 'dotenv'
import { SendMailOptions } from 'nodemailer'
import { EmailPayload } from '~/types/email.dto'
import { emailConfig } from '~/configs/email/email.config'
import { createLogger } from '~/configs/logger/logger.config'

dotenv.config({ quiet: true })
const logger = createLogger(__filename)

const sendMail = async (payload: EmailPayload): Promise<boolean> => {
  const mailOptions: SendMailOptions = {
    from: process.env.GOOGLE_MAIL_USER,
    to: payload.to,
    subject: payload.subject,
    cc: payload.cc,
    bcc: payload.bcc,
    text: payload.text,
    html: payload.html
  }

  const info = await emailConfig.sendMail(mailOptions)
  if (info.messageId) {
    logger.info(`Email sent successfully to ${payload.to} with Message ID: ${info.messageId}`)
    return true
  }

  logger.error(`Failed to send email to ${payload.to}`)
  return false
}

export { sendMail }
