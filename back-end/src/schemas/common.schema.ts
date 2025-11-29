import Joi from 'joi'

export const objectIdSchema = Joi.object({
  id: Joi.string().trim().length(24).hex().required().messages({
    'any.required': 'Vui lòng nhập Id!',
    'string.empty': 'Vui lòng nhập Id!',
    'string.base': 'Vui lòng nhập Id hợp lệ!',
    'string.length': 'Vui lòng nhập Id hợp lệ!',
    'string.hex': 'Vui lòng nhập Id hợp lệ!'
  })
})
