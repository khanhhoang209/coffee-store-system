import Joi from 'joi'

export const categoryRequestSchema = Joi.object({
  name: Joi.string().trim().min(3).required().messages({
    'any.required': 'Vui lòng nhập tên!',
    'string.empty': 'Vui lòng nhập tên!',
    'string.base': 'Vui lòng nhập tên hợp lệ!',
    'string.min': 'Tên phải có ít nhất 3 ký tự!'
  }),
  description: Joi.string().trim().optional().messages({
    'string.base': 'Vui lòng nhập mô tả hợp lệ!',
    'string.empty': 'Mô tả không được để trống!'
  })
})

export const categoryGetRequestSchema = Joi.object({
  pageAt: Joi.number().integer().min(1).default(1).messages({
    'number.base': 'Vui lòng nhập số trang lớn hơn 0!',
    'number.min': 'Vui lòng nhập số trang lớn hơn 0!',
    'number.integer': 'Vui lòng nhập số trang lớn hơn 0!'
  }),
  pageSize: Joi.number().integer().min(1).default(8).messages({
    'number.base': 'Vui lòng nhập kích thước trang lớn hơn 0!',
    'number.min': 'Vui lòng nhập kích thước trang lớn hơn 0!',
    'number.integer': 'Vui lòng nhập kích thước trang lớn hơn 0!'
  }),
  isActive: Joi.boolean().optional().messages({
    'boolean.base': 'Vui lòng nhập trạng thái hợp lệ!'
  }),
  name: Joi.string().trim().allow('', null)
})
