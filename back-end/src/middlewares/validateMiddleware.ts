import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'
import ApiError from '../utils/ApiError'

export const validateBody =
  (schema: Joi.Schema) => (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    })

    if (error) {
      const message = (error.details[0] as Joi.ValidationErrorItem).message
      return next(new ApiError(400, message))
    }

    req.body = value
    next()
  }

export const validateQuery =
  (schema: Joi.Schema) => (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.query, {
      abortEarly: false,
      stripUnknown: true,
    })

    if (error) {
      const message = (error.details[0] as Joi.ValidationErrorItem).message
      return next(new ApiError(400, message))
    }

    res.locals.query = value
    next()
  }

export const validateParams =
  (schema: Joi.Schema) => (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.params, {
      abortEarly: false,
      stripUnknown: true,
    })

    if (error) {
      const message = (error.details[0] as Joi.ValidationErrorItem).message
      return next(new ApiError(400, message))
    }

    req.params = value
    next()
  }
