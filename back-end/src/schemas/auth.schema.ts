/* eslint-disable no-useless-escape */
import Joi from 'joi'

export const registerRequestSchema = Joi.object({
  email: Joi.string().email().trim().lowercase().required().messages({
    'any.required': 'Vui lòng nhập email!',
    'string.email': 'Vui lòng nhập email hợp lệ!'
  }),
  password: Joi.string()
    .min(8)
    .max(128)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/)
    .trim()
    .required()
    .messages({
      'any.required': 'Vui lòng nhập mật khẩu!',
      'string.min': 'Mật khẩu phải có ít nhất 8 ký tự!',
      'string.max': 'Mật khẩu không được vượt quá 128 ký tự!',
      'string.empty': 'Mật khẩu không được để trống!',
      'string.base': 'Vui lòng nhập mật khẩu hợp lệ!',
      'string.pattern.base':
        'Mật khẩu phải bao gồm ít nhất 1 chữ thường, 1 chữ in hoa và 1 ký tự đặc biệt!'
    }),
  fullName: Joi.string().trim().optional().messages({
    'string.base': 'Vui lòng nhập họ và tên hợp lệ!',
    'string.empty': 'Họ và tên không được để trống!'
  }),
  phoneNumber: Joi.string()
    .trim()
    .pattern(/^(03|05|07|08|09)+([0-9]{8})$/)
    .optional()
    .messages({
      'string.empty': 'Số điện thoại không được để trống!',
      'string.base': 'Vui lòng nhập số điện thoại hợp lệ!',
      'string.pattern.base': 'Vui lòng nhập số điện thoại hợp lệ!'
    })
})

export const loginRequestSchema = Joi.object({
  email: Joi.string().email().trim().lowercase().required().messages({
    'any.required': 'Vui lòng nhập email!',
    'string.empty': 'Email không được để trống!',
    'string.email': 'Vui lòng nhập email hợp lệ!',
    'string.base': 'Vui lòng nhập email hợp lệ!'
  }),
  password: Joi.string().trim().required().messages({
    'any.required': 'Vui lòng nhập mật khẩu!',
    'string.empty': 'Mật khẩu không được để trống!',
    'string.base': 'Vui lòng nhập mật khẩu hợp lệ!'
  })
})
