import Joi from 'joi'

export const productRequestSchema = Joi.object({
  name: Joi.string().trim().min(1).required().messages({
    'string.empty': 'Vui lòng nhập tên!',
    'any.required': 'Vui lòng nhập tên!',
  }),
  description: Joi.string().trim().allow('', null),
  price: Joi.number().min(1).required().messages({
    'number.base': 'Vui lòng nhập giá hợp lệ!',
    'number.min': 'Vui lòng nhập giá hợp lệ!',
    'any.required': 'Vui lòng nhập giá!',
  }),
  category: Joi.string().length(24).hex().trim().required().messages({
    'string.base': 'Vui lòng nhập Id danh mục hợp lệ!',
    'string.hex': 'Vui lòng nhập Id danh mục hợp lệ!',
    'string.length': 'Vui lòng nhập Id danh mục hợp lệ!',
    'string.empty': 'Vui lòng nhập danh mục!',
    'any.required': 'Vui lòng nhập danh mục!',
  }),
})

export const productGetRequestSchema = Joi.object({
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
  categoryName: Joi.string().trim().allow('', null),
  minPrice: Joi.number().min(1).default(1).allow(null).messages({
    'number.base': 'Vui lòng nhập giá hợp lệ!',
    'number.min': 'Vui lòng nhập giá hợp lệ!',
  }),
  maxPrice: Joi.number().min(1).default(1000000).allow(null).messages({
    'number.base': 'Vui lòng nhập giá hợp lệ!',
    'number.min': 'Vui lòng nhập giá hợp lệ!',
  }),
})
  .custom((value, helpers) => {
    if (
      value.minPrice !== undefined &&
      value.maxPrice !== undefined &&
      value.minPrice !== null &&
      value.maxPrice !== null &&
      value.minPrice > value.maxPrice
    ) {
      return helpers.error('any.invalid', {
        message: 'Giá tối thiểu không được lớn hơn giá tối đa!',
      })
    }
    return value
  })
  .messages({
    'any.invalid': 'Giá tối thiểu không được lớn hơn giá tối đa!',
  })
