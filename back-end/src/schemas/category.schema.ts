import Joi from 'joi'

export const categoryRequestSchema = Joi.object({
  name: Joi.string().trim().min(1).required().messages({
    'string.empty': 'Vui lòng nhập tên!',
    'any.required': 'Vui lòng nhập tên!',
  }),
  description: Joi.string().trim().allow('', null),
})

export const categoryGetRequestSchema = Joi.object({
  pageAt: Joi.number().integer().min(1).default(1).messages({
    'number.base': 'Vui lòng nhập số trang lớn hơn 0!',
    'number.min': 'Vui lòng nhập số trang lớn hơn 0!',
    'number.integer': 'Vui lòng nhập số trang lớn hơn 0!',
  }),
  pageSize: Joi.number().integer().min(1).default(8).messages({
    'number.base': 'Vui lòng nhập kích thước trang lớn hơn 0!',
    'number.min': 'Vui lòng nhập kích thước trang lớn hơn 0!',
    'number.integer': 'Vui lòng nhập kích thước trang lớn hơn 0!',
  }),
  isActive: Joi.boolean().optional().messages({
    'boolean.base': 'Vui lòng nhập trạng thái hợp lệ!',
  }),
  name: Joi.string().trim().allow('', null),
})
