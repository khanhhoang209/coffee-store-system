import Joi from 'joi'

export const objectIdSchema = Joi.object({
  id: Joi.string().length(24).hex().messages({
    'string.base': 'Vui lòng nhập Id hợp lệ!',
    'string.length': 'Vui lòng nhập Id hợp lệ!',
    'string.hex': 'Vui lòng nhập Id hợp lệ!',
  }),
})
