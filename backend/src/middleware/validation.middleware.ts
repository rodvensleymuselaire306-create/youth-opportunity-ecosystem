import { Request, Response, NextFunction } from 'express'
import { ZodSchema } from 'zod'

export const validateRequest = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = schema.parse(req.body)
      req.body = validated
      next()
    } catch (error: any) {
      res.status(400).json({
        status: 'error',
        message: 'Validation error',
        errors: error.errors,
      })
    }
  }
}
