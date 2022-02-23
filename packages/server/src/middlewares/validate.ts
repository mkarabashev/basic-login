import { ObjectSchema } from 'joi'
import { RequestHandler } from 'express'
import { ValidationError } from './errorHandler'

const validate = (type: 'body' | 'query') => (schema: ObjectSchema): RequestHandler => (req, res, next) => {
    try {
        const objectToValidate = req[type]

        const { error } = schema
            .prefs({ errors: { label: "key" } })
            .validate(objectToValidate)
        
        if (error) {
            throw new ValidationError(error.message)
        }

        next()
    } catch (e) {
        next(e)
    }
   
}

export const validateReqBody = validate('body')