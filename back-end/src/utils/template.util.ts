import fs from 'fs'
import path from 'path'
import { createLogger } from '~/configs/logger/logger.config'

const logger = createLogger(__filename)
type TemplateData = Record<string, string>

const getPath = (folder: 'views' | 'templates', fileName: string): string => {
  return path.join(__dirname, '../', folder, fileName)
}

const render = (folder: 'views' | 'templates', fileName: string, data?: TemplateData): string => {
  const filePath = getPath(folder, fileName)

  try {
    let content = fs.readFileSync(filePath, 'utf-8')

    if (data) {
      Object.keys(data).forEach((key) => {
        const regex = new RegExp(`{{${key}}}`, 'g')
        content = content.replace(regex, data[key] || '')
      })
    }

    return content
  } catch (error) {
    logger.error(`Error loading template ${fileName}: ${(error as Error).message}`)
    return `<h1>Error loading template: ${fileName}</h1>`
  }
}

const getVerifyEmailTemplate = (name: string, verifyLink: string): string => {
  return render('templates', 'verify-email.html', {
    name,
    link: verifyLink
  })
}

const getVerifySuccessHtml = (email: string): string => {
  return render('views', 'verify-success.html', { email })
}

const getVerifyFailHtml = (): string => {
  return render('views', 'verify-fail.html')
}

export { getVerifyEmailTemplate, getVerifySuccessHtml, getVerifyFailHtml }
